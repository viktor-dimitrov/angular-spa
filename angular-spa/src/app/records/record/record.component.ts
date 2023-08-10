import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from 'src/app/shared/types/record';
import { DatePipe, Location } from '@angular/common';
import { Subscription, tap } from 'rxjs';
import { DateService } from 'src/app/shared/date.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, OnDestroy{

  private recordSubscription: Subscription | undefined;

  record: Record | undefined;
  createdOn: string | null = null;
  updatedOn: string | null = null;
  error: string | undefined;
  isLoading: boolean = true;


 get isOwner(): boolean {  
  const user = this.userService.user;
  return !!(this.record?._ownerId?._id === user?._id)
 } 

 get isLoggedIn(): boolean {
  return this.userService.isLogged
}


  constructor(
    private userService: UserService,
    private recordService: RecordService,
    private dateService: DateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit(): void {

    const recordId = this.activatedRoute.snapshot.params['recordId'];
    this.recordSubscription = this.recordService.getOneRecord(recordId).subscribe({
      next: (response) => {
        this.createdOn = this.dateService.getFormattedDate(response?._createdOn);
        this.updatedOn = this.dateService.getFormattedDate(response?._updatedOn);
        this.record = response;
        this.isLoading = false;
      },
      error: ({error}) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.userService.logout();
          this.router.navigate(['/login']);
          }
        this.error = error.error; 
        this.router.navigate(['/pageNotFound']);
      
      },
      complete: () => { console.log(this.record)}
    })


    
  }

  editRecord(recordId: string): void {
    this.router.navigate([`/catalog/${recordId}/edit`], { state: { record: this.record, ownerId: this.record?._ownerId._id } });
  }

  deleteRecord(recordId: string, ownerId: string): void {
    const confirmed = window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS RECORD');
    if (confirmed) {
      this.recordSubscription = this.recordService.deleteRecord(recordId, ownerId).pipe(
        tap(() => {
          this.userService.me().subscribe({
            complete: () => {
              this.location.back();
            } 
          })
        }))
        .subscribe({
          error: ({ error }) =>{
             this.error = error.error;
             if (error.status === 401) {
              this.userService.logout();
              this.router.navigate(['/login']);
              }
            }
        })
    }
  }

  ngOnDestroy(): void {
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }

}
