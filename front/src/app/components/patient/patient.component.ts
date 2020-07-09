import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FullPatient } from '../../models/FullPatient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: any[];

  searchForm = this.fb.group({
    keywords: ['', [Validators.required]]
  })


  panelOpenState = false;
  constructor(private patientService: PatientService, private fb: FormBuilder, public dialog: MatDialog,
    private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUsers();
 
  }

  openDialog(patient: any) {
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: patient.kartonPacijentId,
      name: patient.ime,
      lastname: patient.prezime,
      dentistId:patient.korisnik.korisnikId
    }

    this.dialog.open(EditPatientDialogComponent, dialogConfig)


  }
  onSearch() {
    if (this.searchForm.invalid) {

      this.toastr.warning("Search field mustn't be empty", "", {
        timeOut: 1500
      })
    }
    else {

      this.patientService.searchPatients(this.searchForm.value).subscribe(data => {
       
        this.patients = [];
        this.patients = data
        if (data.statusCode === -3001) {
          this.patients = [];
          this.toastr.error('User not found', '', {
            closeButton: true,
            positionClass: 'toast-bottom-center'
          })
        }
      })
    }
  }
  addUserNavigation() {
    this.router.navigate(['patient/add'])
  }
  getUsers(){
    this.searchForm.reset();
    this.searchForm.get('keywords').setErrors(null);
    
    this.patientService.getPatients().subscribe(data => {
     
      this.patients = data;
      
    });
    
  }


}