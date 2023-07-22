import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from 'src/app/shared/types/record';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{


  record: Record | undefined


  constructor(private recordService: RecordService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.fetchRecord();
  
  }


  fetchRecord(): void {
    const id = this.activatedRoute.snapshot.params['recordId'];
    this.recordService.getOneRecord(id).subscribe((response) => {
      this.record = response;
      console.log(response)

    });
  }

}
