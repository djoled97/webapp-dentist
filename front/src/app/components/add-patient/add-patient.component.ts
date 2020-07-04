import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { PatientService } from '../../service/patient.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  today=new Date()
  korisnik:{
    id: number,
    ime: string,
    prezime: string
  }[]


  patientForm = this.fb.group({
    ime: ['', [Validators.required,Validators.minLength(2)]],
    prezime: ['', [Validators.required,Validators.minLength(2)]],
    datumRodjenja: [this.today],
    korisnikId:['']
  })
  constructor(private fb: FormBuilder,private loginService:LoginService,private userService:UserService,private patientSerivce:PatientService
   ,private toastr:ToastrService
    ) {
    this.userService.getKorisnikName().subscribe(data=>{
      
      
      this.korisnik=data;
    })
   }
 
  ngOnInit(): void {
   
  
  }
  onSubmit() {
  return  this.patientSerivce.addPatient(this.patientForm.value).subscribe( () =>{
    this.toastr.success('User added','',{
      closeButton:true
    });
    this.patientForm.reset();
    
  });
  
  }
}
