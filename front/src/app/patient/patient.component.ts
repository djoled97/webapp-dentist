import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: any[];



  panelOpenState = false;
  constructor(private patientService: PatientService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      console.log(data);
      this.patients = data;

    })
  }

  openDialog(patient:any) {
   console.log(patient)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      id:patient.kartonPacijentId,
      name:patient.ime,
      lastname:patient.prezime

    }
    
   const dialog= this.dialog.open(EditPatientDialogComponent,dialogConfig)

   dialog.afterClosed().subscribe(()=>{
    window.location.reload();
   }
    
   )
  }
}