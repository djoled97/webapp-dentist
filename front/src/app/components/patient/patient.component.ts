import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FullPatient } from 'src/app/models/FullPatient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: any[];

  searchForm=this.fb.group({
    keywords:['']
  })


  panelOpenState = false;
  constructor(private patientService: PatientService, private fb: FormBuilder, public dialog: MatDialog,
    private toastr:ToastrService,private router:Router) {
      
     }

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

 
  }
  onSearch(){
  this.patientService.searchPatients(this.searchForm.value).subscribe( data =>{
    console.log(data);
    this.patients=[];
    this.patients=data
    if(this.searchForm.value===''){
      
      this.patientService.getPatients().subscribe(data => {
        console.log(data);
        this.patients = data;
  
      })
    }else if(data.statusCode===-3001){
        this.patients=[];
        this.toastr.error('User not found','',{
         closeButton:true,
          positionClass:'toast-bottom-center'
        })
    }
  })
  }
  addUserNavigation(){
    this.router.navigate(['patient/add'])
  }
}