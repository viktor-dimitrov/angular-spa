import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { RecordService } from '../record.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from 'src/app/shared/types/record';
import { UserService } from 'src/app/user/user.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit{

  private recordSubscription: Subscription | undefined;
  record: Record | undefined;
  error: string | undefined;
  backUrl: string | undefined = undefined;
  
  constructor(
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.record = history.state.record;
    const path = this.location.path();
    console.log(path)
  }

  editRecord(form: NgForm , recordId: string) {
    let data = {...form.value };

    if (form.valid ) {
    this.recordSubscription = this.recordService.editRecord(data, recordId).subscribe({
        next: () => this.userService.me(),
        error: ({ error }) => this.error = error.error,
        complete: () => { }
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
