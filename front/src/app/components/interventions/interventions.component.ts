import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../service/intervention.service';
import { Intervention } from '../../models/Interevention';
import { FormBuilder, Validators } from '@angular/forms';
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
    dateStart: ['', [Validators.required]],
    dateEnd: ['', [Validators.required]]
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
   

    const dateE = new Date(this.range.get('dateEnd').value);
    this.dateEnd = moment(dateE).format('YYYY-MM-DD');
  }

  onSearch() {
    if (this.range.invalid) {
      this.toastr.warning("Date mustn't be empty", "", {
        timeOut: 1500
      })
    } else {

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
  }
  onReset() {
    this.interventionService.getInterventions().subscribe(data => {
      this.interventions = data;
      this.range.reset();
      this.range.markAsUntouched();
    })
  }

}
