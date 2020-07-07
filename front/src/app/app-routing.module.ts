import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService as AuthGuard } from './service/auth.guard.service';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { RegisterComponent } from './components/register/register.component';
import { PatientComponent } from './components/patient/patient.component';
import { InterventionsComponent } from './components/interventions/interventions.component';
import { ServiceComponent } from './components/service-component/service/service.component';
import { AddServiceComponent } from './components/add-service/add-service.component'





const routes: Routes = [{
   path:'login',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  { path: '',pathMatch:'full', redirectTo: 'login'},
  {path:'patient',canActivate:[AuthGuard], children:[
    {
      path:'add',
      component:AddPatientComponent
    }, {
      path:'view',
      component:PatientComponent
    }
    


  ]},
  {path:'intervention', canActivate:[AuthGuard],children:[
    {
      path:'view',
      component:InterventionsComponent
    }

  ]},
  {path:'service',canActivate:[AuthGuard], children:[
    {
      path:'add',
      component:AddServiceComponent
    }, {
      path:'view',
      component:ServiceComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
