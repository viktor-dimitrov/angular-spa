import { Component, OnDestroy, OnInit } from '@angular/core';
import { Record} from '../../shared/types/record';
import { RecordService } from '../record.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy{

  private recordSubscription: Subscription | undefined;

  recordsList: Record[] = [];
  isLoading: boolean = true;
 
  




constructor(private recordService: RecordService, private userService: UserService, private router: Router){}

ngOnInit(): void {
  this.recordSubscription = this.recordService.getRecords().subscribe({
    next: (posts)=> {
     this.recordsList = posts;
     this.isLoading = false;
    },
    error: (error) => {
     this.isLoading = false;
     if (error.status === 401) {
     this.userService.logout();
     this.router.navigate(['/login']);
     }
     console.error(`Error: ${error}`);

    } 
     
   })
}


ngOnDestroy(): void {
  
  if (this.recordSubscription) {
    this.recordSubscription.unsubscribe();
  }
}

 


}
