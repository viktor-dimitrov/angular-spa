import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthActivate } from '../core/guards/auth.activate';
import { PostRecordComponent } from './post-record/post-record.component';



const routes: Routes = [
  {
    path: 'post',
    component: PostRecordComponent,
    canActivate: [AuthActivate]
  
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordRoutingModule { }