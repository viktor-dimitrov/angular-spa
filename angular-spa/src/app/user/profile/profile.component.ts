import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/types/user';
import { Record } from 'src/app/shared/types/record';
import { RecordComponent } from 'src/app/records/record/record.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, tap } from 'rxjs';
import { RecordService } from 'src/app/records/record.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


private recordSubscription: Subscription | undefined;
   user: User | undefined = undefined;
   error: string | undefined = undefined;

  constructor(
    private userService: UserService,
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

ngOnInit(): void {
    this.user = this.userService.user;
}

editRecord(recordId: string, record: Record): void {
  this.router.navigate([`/profile/${recordId}/edit`], { state: {record: record} });
}

deleteRecord(recordId: string, ownerId: string): void {
  const confirmed = window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS RECORD');
  if (confirmed) {
    this.recordSubscription = this.recordService.deleteRecord(recordId, ownerId).pipe(
      tap(() => {
        this.userService.me().subscribe({
          next: (response) => { this.user = response;
          } 
        })
      }))
      .subscribe({
        error: ({ error }) => this.error = error.error,
      })
  }
}


ngOnDestroy(): void {
  if (this.recordSubscription) {
    this.recordSubscription.unsubscribe();
  }
}




}


