import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm=this.fb.group({
      ime:[''],
      prezime:[''],
      email:[''],
      username:[''],
      passwordHash:['']
  })
  constructor(private fb:FormBuilder,private registerService:RegisterService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.registerService.registerUser(this.registerForm.value).subscribe();
  }
}
