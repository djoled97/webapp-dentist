import { Component, OnInit } from '@angular/core';
import { InterventionService } from 'src/app/service/intervention.service';
import { Intervention } from 'src/app/models/Interevention';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})
export class InterventionsComponent implements OnInit {
  dateStart: string;
  dateEnd: string;

  displayedColumns: string[] = ['date', 'service', 'Patient name', 'Dentist name'];
  interventions: Intervention[];

  range = this.fb.group({
    dateStart: [''],
    dateEnd: ['']
  });
  constructor(private interventionService: InterventionService, private fb: FormBuilder,
    private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.interventionService.getInterventions().subscribe(data => {
      this.interventions = data;

    })
  }
  formatDate() {

    const dateS = new Date(this.range.get('dateStart').value);
    this.dateStart = moment(dateS).format('YYYY-MM-DD');
    console.log(this.dateStart);

    const dateE = new Date(this.range.get('dateEnd').value);
    this.dateEnd = moment(dateE).format('YYYY-MM-DD');
  }

  onSearch() {
    this.formatDate()
    this.interventionService.searchByDate(this.dateStart, this.dateEnd).subscribe(data => {
      if (data.length === 0) {
        this.toastr.error("No interventions found", "", {
          timeOut: 1500
        })


      }
      this.interventions = data;

    })

  }
  onReset(){
    this.interventionService.getInterventions().subscribe(data => {
      this.interventions = data;
      this.range.reset();
    })
  }

}
