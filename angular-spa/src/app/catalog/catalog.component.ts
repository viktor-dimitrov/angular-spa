import { Component, OnInit } from '@angular/core';
import { Record} from '../shared/types/record';
import { RecordService } from '../records/record.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  recordsList: Record[] = [];




constructor(private recordService: RecordService){}

ngOnInit(): void {
  this.recordService.getRecords().subscribe({
    next: (posts)=> {
     this.recordsList = posts;
    //  this.isLoading = false;
    },
    error: (err) => {
    //  this.isLoading = false;
     console.error(`Error: ${err}`);

    } 
     
   })
}


}
