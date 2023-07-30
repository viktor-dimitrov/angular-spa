import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { RecordService } from '../record.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit{
  private recordSubscription: Subscription | undefined;

  error: string | undefined;

  constructor(private recordService: RecordService){}

  ngOnInit(): void {
    
  }


  editRecord(form: NgForm) {
    let data = {...form.value };
    console.log(data)
  }


  ngOnDestroy(): void {
  
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }




}
