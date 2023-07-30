import { Component, OnDestroy, OnInit } from '@angular/core';
import { Record} from '../../shared/types/record';
import { RecordService } from '../record.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy{

  private recordSubscription: Subscription | undefined;

  recordsList: Record[] = [];




constructor(private recordService: RecordService, private router: Router){}

ngOnInit(): void {
  this.recordSubscription = this.recordService.getRecords().subscribe({
    next: (posts)=> {
     this.recordsList = posts;
    //  this.isLoading = false;
    },
    error: (error) => {
    //  this.isLoading = false;
     console.error(`Error: ${error.error}`);

    } 
     
   })
}


ngOnDestroy(): void {
  
  if (this.recordSubscription) {
    this.recordSubscription.unsubscribe();
  }
}

 




}
