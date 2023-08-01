import { Component, OnInit,  } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { RecordService } from '../record.service';
import { Subscription, tap } from 'rxjs';
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

  
  constructor(
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.record = history.state.record;

  }

  editRecord(form: NgForm, recordId: string) {
    let data = { ...form.value };
    if (form.valid) {
      this.recordSubscription = this.recordService.editRecord(data, recordId).pipe(
        tap(() => {
          this.userService.me().subscribe({
            complete: () => this.location.back()
          })
        }))
        .subscribe({
          error: ({ error }) => this.error = error.error,
        })
    } else {

      return
    }
  }


  ngOnDestroy(): void {
  
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }




}
