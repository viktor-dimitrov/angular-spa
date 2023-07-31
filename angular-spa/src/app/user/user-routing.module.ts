import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { EditRecordComponent } from '../records/edit-record/edit-record.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  
  },
  {
    path: 'register',
    component: RegisterComponent,

  
  },
  {
    path: 'profile',
    canActivate: [AuthActivate],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      {
        path: ':recordId/edit',
        component: EditRecordComponent
      }

    ]
   
   
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
