import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {  HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms'
import { LoginService } from './service/login.service';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatNativeDateModule} from '@angular/material/core'
import { AuthGuardService } from './service/auth.guard.service';
import { JwtModule } from "@auth0/angular-jwt";
import { AddPatientComponent } from './add-patient/add-patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { RegisterComponent } from './register/register.component';

import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { PatientComponent } from './patient/patient.component';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    AddPatientComponent,
    RegisterComponent,
   
    LogoutDialogComponent,
   
    PatientComponent,
   
    EditPatientDialogComponent
    
  ],
  imports: [
    
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
   
    
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=>{
          return localStorage.getItem("token");
        },
        whitelistedDomains: ["localhost:3001"],
        blacklistedRoutes: [],
      },
    }),
    BrowserAnimationsModule
  ],
  providers: [LoginService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
