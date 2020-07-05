import { Component, OnInit } from '@angular/core';
import { InterventionService } from 'src/app/service/intervention.service';
import { Intervention } from 'src/app/models/Interevention';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})
export class InterventionsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'service', 'Patient name', 'Dentist name'];
  interventions:Intervention[];
  dataSource = this.interventions;
  constructor(private interventionService:InterventionService) { }

  ngOnInit(): void {
    this.interventionService.getInterventions().subscribe( data=>{
      this.interventions=data;
      
    })
  }

}
