import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Record} from '../shared/types/record';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  recordsList: Record[] = [];




constructor(private apiService: ApiService){}

ngOnInit(): void {
  this.apiService.getRecords().subscribe({
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
