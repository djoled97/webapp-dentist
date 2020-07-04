import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.css']
})
export class EditPatientDialogComponent implements OnInit {
  
  id:number;
  editForm=this.fb.group({
    ime:[''],
    prezime:['']
  })
  

  constructor(private fb:FormBuilder,private dialogRef: MatDialogRef<EditPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,private patientService:PatientService) { 
     this.id=data.id;
      this.editForm.get('ime').setValue(data.name);
     this.editForm.get('prezime').setValue(data.lastname);
      
    }

  ngOnInit(): void {
  }
  onSubmit(){
    this.patientService.editPatient(this.id,this.editForm.value).subscribe()
  }
}
