import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {  HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms'
import { UserService } from './service/user.service';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuardService } from './service/auth.guard.service';
import { JwtModule } from "@auth0/angular-jwt";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=>{
          return localStorage.getItem("reftoken");
        },
        whitelistedDomains: ["localhost:3001"],
        blacklistedRoutes: [],
      },
    })
  ],
  providers: [UserService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
