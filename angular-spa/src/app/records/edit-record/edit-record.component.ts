import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { RecordService } from '../record.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from 'src/app/shared/types/record';
import { UserService } from 'src/app/user/user.service';



@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit{

  private recordSubscription: Subscription | undefined;
  record: Record | undefined;
  error: string | undefined;

  constructor(private recordService: RecordService, private route: ActivatedRoute, private router: Router, private userService: UserService){}

  ngOnInit(): void {

    this.record = history.state.record;
    console.log(this.record)
  }


  editRecord(form: NgForm , recordId: string, ownerId: string) {
    let data = {...form.value };

    if (form.valid ) {

      this.recordService.editRecord(data, recordId, ownerId).subscribe({
        next: (response) => console.log(response),
        error: ({ error }) => this.error = error.error,
        complete: () => this.router.navigate([`/catalog/${recordId}`])
      })
    } else {
      console.log('invalid')
      return
    }
  }


  ngOnDestroy(): void {
  
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }




}
