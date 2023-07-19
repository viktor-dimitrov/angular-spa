import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record/record.component';
import { PostRecordComponent } from './post-record/post-record.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecordComponent,
    PostRecordComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule

  ],
  exports: [
    RecordComponent,
    PostRecordComponent

  ]
})
export class RecordModule { }
