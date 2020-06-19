import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './service/auth.guard.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { RegisterComponent } from './register/register.component';




const routes: Routes = [{
   path:'login',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  { path: '',pathMatch:'full', redirectTo: 'login'},
  {path:'patient', children:[
    {
      path:'add',
      component:AddPatientComponent
    }


  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
