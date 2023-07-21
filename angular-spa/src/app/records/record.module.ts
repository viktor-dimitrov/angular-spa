import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record/record.component';
import { PostRecordComponent } from './post-record/post-record.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule } from '@angular/router';
import { RecordRoutingModule } from './record-routing.module';


@NgModule({
  declarations: [
    RecordComponent,
    PostRecordComponent,
    CatalogComponent

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

  ]
})
export class RecordModule { }
