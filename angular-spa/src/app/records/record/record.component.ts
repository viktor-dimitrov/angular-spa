import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from 'src/app/shared/types/record';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, OnDestroy{


  record: Record | undefined;
  timestamp: number | undefined;
  error: string | undefined;
  private recordSubscription: Subscription | undefined;


  constructor(private recordService: RecordService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.fetchRecord();
  }


  fetchRecord(): void {
    const recordId = this.activatedRoute.snapshot.params['recordId'];
    this.recordSubscription = this.recordService.getOneRecord(recordId).subscribe((response) => {
      this.record = response;
      this.timestamp = this.record?._createdOn;
      console.log(response)
    });
  }

  deleteRecord(recordId: string): void {
    const confirmed = window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS RECORD');
    if (confirmed) {
      this.recordService.deleteRecord(recordId).subscribe({
        next:(response) => console.log(response),
        error:({ error }) => this.error = error.error,
        complete: () => this.router.navigate(['/catalog'])
      })

    }
      



  }


  getFormattedDate(): string | null {
    if (this.timestamp) {
      const date = new Date(this.timestamp);
      return this.datePipe.transform(date.toISOString(), 'dd-MM-yyyy HH:mm:ss');
     
    }
    return null;
  }
  


  ngOnDestroy(): void {
  
    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }

}
