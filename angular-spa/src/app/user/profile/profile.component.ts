import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/types/user';
import { Record } from 'src/app/shared/types/record';
import { RecordComponent } from 'src/app/records/record/record.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, tap } from 'rxjs';
import { RecordService } from 'src/app/records/record.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


private recordSubscription: Subscription | undefined;
   user: User | undefined = undefined;
   error: string | undefined = undefined;
   isEditMode: boolean = false;
  

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

goToDetails(recordId: string): void {
  this.router.navigate([`/catalog/${recordId}`]) 
}

editRecord(recordId: string, record: Record): void {
  
  this.router.navigate([`/profile/${recordId}/edit`], { state: {record: record, ownerId: record._ownerId} });
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

toggleEditMode(): void {
  this.isEditMode = !this.isEditMode;
}

saveProfilePicture(form: NgForm): void {

  const data = form.value;
  console.log(data);

  this.toggleEditMode();

}


ngOnDestroy(): void {
  if (this.recordSubscription) {
    this.recordSubscription.unsubscribe();
  }
}




}


