import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { LoaderComponent } from './loader/loader/loader.component';
import { StatsComponent } from './stats/stats.component';



@NgModule({
  declarations: [
    EmailDirective,
    LoaderComponent,
    StatsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailDirective,
    LoaderComponent,
    StatsComponent
  
  ]
})
export class SharedModule { }
