import { Component, OnInit,  } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { RecordService } from '../record.service';
import { Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from 'src/app/shared/types/record';
import { UserService } from 'src/app/user/user.service';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/types/user';



@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit{

  private recordSubscription: Subscription | undefined;
  record: Record | undefined;
  error: string | undefined;
  userId: string | undefined;
  isLoading: boolean = false;
  selectedYear: number | undefined = 2023;
  years: number[] = [];

  constructor(
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
  ) { 

    this.record = history.state.record;
    this.userId = this.userService.user?._id;
    const ownerId = history.state.ownerId;
  
    if( this.userId !== ownerId ) {
        this.router.navigate(['/pageNotFound']);
    }
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1947; year--) {
      this.years.push(year);
    }
    this.selectedYear = this.record?.year;
  
  }

  editRecord(form: NgForm, recordId: string) {
    let data = { ...form.value };

    if (data.artist == '' || data.title == '' || data.year == '' || data.style == '' || data.imageUrl == '') {
      this.error = 'All fields are required';
      return
    } else {
      this.error = undefined;
    }
    
    if (form.valid) {
      this.isLoading = true;
      this.recordSubscription = this.recordService.editRecord(data, recordId).pipe(
        tap(() => {
          this.userService.me().subscribe({
            complete: () => {
              this.isLoading = false;
              this.location.back();
            }
          })
        }))
        .subscribe({
          error: ({ error }) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.userService.logout();
              this.router.navigate(['/login']);
              }
              this.error = error.error;
          } 
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
