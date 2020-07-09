import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.css']
})
export class EditPatientDialogComponent implements OnInit {
  korisnik:{
    id: number,
    ime: string,
    prezime: string
  }[];

  id:number;
  editForm=this.fb.group({
    ime:['',[Validators.required,Validators.minLength(3)]],
    prezime:['',[Validators.required,Validators.minLength(3)]],
    korisnikId:['',[Validators.required]]
  })
  

  constructor(private fb:FormBuilder,private dialogRef: MatDialogRef<EditPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,private patientService:PatientService,private userService:UserService
    ,private toastr:ToastrService) { 
     this.id=data.id;
      this.editForm.get('ime').setValue(data.name);
     this.editForm.get('prezime').setValue(data.lastname);
     this.editForm.get('korisnikId').setValue(data.dentistId);
    }

  ngOnInit(): void {
    this.userService.getKorisnikName().subscribe(data =>{
      this.korisnik=data;
    
    })
  }
  onSubmit(){
   
   if(this.editForm.valid){
     this.dialogRef.close();
    this.patientService.editPatient(this.id,this.editForm.value).subscribe( ()=>{
      this.toastr.success('User edited successfully','',{
        closeButton:true,
        timeOut:2000

      }).onHidden.subscribe(()=>{
        window.location.reload();
      })
    })
  }
}
}
