import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/types/user';
import { Record } from 'src/app/shared/types/record';
import { RecordComponent } from 'src/app/records/record/record.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   user: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private recordComponent: RecordComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

ngOnInit(): void {
  const user = this.userService.getUser();
  this.user = user;
  console.log(user)
}


editRecord(recordId: string, record: Record): void {
  this.router.navigate([`/profile/${recordId}/edit`], { state: {record: record} });
}

onDeleteRecord(recordId: string, ownerId: string): void {
  this.recordComponent.deleteRecord(recordId, ownerId);
}



}
