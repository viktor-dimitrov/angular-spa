import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/types/user';
import { Record } from 'src/app/shared/types/record';
import { RecordService } from 'src/app/records/record.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   user: User | undefined = undefined;
  

  constructor(private userService: UserService, private recordService: RecordService){}

ngOnInit(): void {
  const user = this.userService.getUser();
  this.user = user;
  

}



}
