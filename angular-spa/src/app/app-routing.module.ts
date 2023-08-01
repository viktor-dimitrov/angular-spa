import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './records/catalog/catalog.component';
import { PostRecordComponent } from './records/post-record/post-record.component';
import { AuthActivate } from './core/guards/auth.activate';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [

  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
