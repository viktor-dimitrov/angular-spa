import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthActivate } from '../core/guards/auth.activate';
import { PostRecordComponent } from './post-record/post-record.component';
import { RecordComponent } from './record/record.component';
import { CatalogComponent } from './catalog/catalog.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { NotFoundComponent } from '../core/not-found/not-found.component';



const routes: Routes = [

  {
    path: 'catalog',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CatalogComponent,
      },
      {
        path: ':recordId',
        component: RecordComponent
      },
      {
        path: ':recordId/edit',
        component: EditRecordComponent,
        canActivate: [AuthActivate]
      },

    ]
  },

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