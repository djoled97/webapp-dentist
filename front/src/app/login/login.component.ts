import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,

} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  
  
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]



  })


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }
 async onSubmit() {
   await this.loginService.login(this.loginForm.value).subscribe(data => {
       

      if(data.statusCode===-10001){
        const username = this.loginForm.get('username');
        const pass = this.loginForm.get('password');
        
        username.setErrors({ 'empty': true });
        pass.setErrors({ 'empty': true });
      }

      if (data.statusCode === -3002) {
        const pass = this.loginForm.get('password');

        pass.setErrors({ 'incorrect': true });
        

      } else if (data.statusCode === -3001) {
        const username = this.loginForm.get('username');

        username.setErrors({ 'incorrect': true });
       
      }
      

    }


    );
    
  }

}
