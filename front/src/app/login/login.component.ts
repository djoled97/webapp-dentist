import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]



  })


  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(data => {
       
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
