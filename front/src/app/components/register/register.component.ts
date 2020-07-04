import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import { confirmedValidator } from '../../helpers/confirmed.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  registerForm=this.fb.group({
      ime:['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Z]/),]],
      prezime:['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Z]/),]],
      email:['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      username:['', [Validators.required, Validators.pattern(/^[A-z0-9]{5,}$/)]],
      passwordHash:['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]],
      confirmPassword:['', [Validators.required]]
  },{
      validators: confirmedValidator('passwordHash', 'confirmPassword')
  })

  constructor(private fb:FormBuilder,private registerService:RegisterService) { }

  ngOnInit(): void {
  }
  async onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid) {
      return;
    }
    await this.registerService.registerUser(this.registerForm.value).subscribe(data =>{
      if (data.statusCode === -7000) {
        const email = this.registerForm.get('email');
        email.setErrors({'notUnique': true});
      }
      if (data.statusCode === -7001) {
        const username = this.registerForm.get('username');
        username.setErrors({'notUnique': true});
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
