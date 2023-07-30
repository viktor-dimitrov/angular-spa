import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecordComponent } from './record/record.component';
import { PostRecordComponent } from './post-record/post-record.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule } from '@angular/router';
import { RecordRoutingModule } from './record-routing.module';
import { EditRecordComponent } from './edit-record/edit-record.component';




@NgModule({
  declarations: [
    RecordComponent,
    PostRecordComponent,
    CatalogComponent,
    EditRecordComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RecordRoutingModule

  ],
  exports: [
    RecordComponent,
    PostRecordComponent,
    CatalogComponent

  ],
  providers: [
    DatePipe, 
   
  ],
})
export class RecordModule { }
