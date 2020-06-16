import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
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
  // animations: [
  //   trigger('move', [
  //     state('0', style({
  //       transform: 'translateX(0)'
  //     })),
  //     state('1', style({
  //       transform: 'translateX(-10px)'
  //     })),
  //     state('2', style({
  //       transform: 'translateX(10px)'
  //     })),
  //     state('3', style({
  //       transform: 'translateX(8px)'
  //     })), state('4', style({
  //       transform: 'translateX(-8px)'
  //     })),
  //     transition('0=>1=>2=>3=>4',animate('shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both')),
  //   ]),
  // ]
})
export class LoginComponent implements OnInit {

  
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]



  })


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

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
