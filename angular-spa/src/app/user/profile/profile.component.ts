import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/types/user';
import { Record } from 'src/app/shared/types/record';
import { RecordService } from 'src/app/records/record.service';
import { RecordComponent } from 'src/app/records/record/record.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   user: User | undefined = undefined;
  

  constructor(private userService: UserService, private recordComponent: RecordComponent){}

ngOnInit(): void {
  const user = this.userService.getUser();
  this.user = user;
  
}

onDeleteRecord(recordId: string, ownerId: string): void {
  this.recordComponent.deleteRecord(recordId, ownerId)

}



}
