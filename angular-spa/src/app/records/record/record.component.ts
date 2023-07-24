import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from 'src/app/shared/types/record';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{


  record: Record | undefined;
  timestamp: number | undefined


  constructor(private recordService: RecordService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.fetchRecord();
  
  }


  fetchRecord(): void {
    const id = this.activatedRoute.snapshot.params['recordId'];
    this.recordService.getOneRecord(id).subscribe((response) => {
      this.record = response;
      this.timestamp = this.record?._createdOn;
      console.log(response)

    });
  }


  getFormattedDate(): string | null {
    if (this.timestamp) {
      const date = new Date(this.timestamp);
      return this.datePipe.transform(date.toISOString(), 'dd-MM-yyyy HH:mm:ss');
     
    }
    return null;
  }
  

}
