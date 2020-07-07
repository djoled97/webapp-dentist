import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {  HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms'
import { LoginService } from './service/login.service';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core'
import { AuthGuardService } from './service/auth.guard.service';
import { JwtModule } from "@auth0/angular-jwt";
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { RegisterComponent } from './components/register/register.component';

import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { PatientComponent } from './components/patient/patient.component';
import { EditPatientDialogComponent } from './components/edit-patient-dialog/edit-patient-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { InterventionsComponent } from './components/interventions/interventions.component';
import { DatePipe } from '@angular/common';
import { ServiceComponent } from "./components/service-component/service/service.component"
import { EditServiceDialogComponent } from './components/edit-service-dialog/edit-service-dialog.component';
import { AddServiceComponent } from './components/add-service/add-service.component';

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
   
    EditPatientDialogComponent,
   
    InterventionsComponent,
   
EditServiceDialogComponent,

    ServiceComponent,

    AddServiceComponent
   
  
    
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
    MatTableModule,
    MatButtonModule,
    
   
    ToastrModule.forRoot({
      timeOut: 10000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
    }),
    
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
  providers: [LoginService,AuthGuardService,DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
