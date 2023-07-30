import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from 'src/app/shared/types/record';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { DateService } from 'src/app/shared/date.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, OnDestroy{

  private recordSubscription: Subscription | undefined;

  record: Record | undefined;
  time: string | null = null;
  error: string | undefined;



  constructor(private recordService: RecordService, private dateServise: DateService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe){}

  ngOnInit(): void {
    const recordId = this.activatedRoute.snapshot.params['recordId'];
    this.recordSubscription = this.recordService.getOneRecord(recordId).subscribe({
      next: (response) => {
        this.time = this.dateServise.getFormattedDate(response?._createdOn);
        this.record = response
      
      },
      error: ({error}) => {
        console.log(error.error)
        this.error = error.error; 
      },
      complete: () => {}
    })
      
  }

  editRecord(recordId: string): void {
    this.router.navigate([`/catalog/${recordId}/edit`], { state: { record: this.record } });
  }


  deleteRecord(recordId: string, ownerId: string): void {
    const confirmed = window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS RECORD');
    if (confirmed) {
      this.recordSubscription = this.recordService.deleteRecord(recordId, ownerId).subscribe({
        next:(response) => console.log(response),
        error:({ error }) => {
          console.log(error.error)
          this.error = error.error; 
          this.router.navigate(['/']);
        },
        complete: () => this.router.navigate(['/catalog'])
      })
    }
  }



  


  ngOnDestroy(): void {
  
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }

}
