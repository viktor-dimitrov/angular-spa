import { Component } from '@angular/core';
import { User } from 'src/app/shared/types/user';

import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';



@Component({
  selector: 'app-post-record',
  templateUrl: './post-record.component.html',
  styleUrls: ['./post-record.component.css'],
  providers: [RecordService]
})
export class PostRecordComponent {

  error: string | undefined


  constructor(private recordService: RecordService, private router: Router, private userService: UserService){}


  postRecord(form: NgForm){

     let data = {...form.value };

    if (form.valid ) {
      this.recordService.postRecord(data).subscribe({
        next: () => this.userService.me(),
        error: ({ error }) => this.error = error.error,
        complete: () => {this.router.navigate(['/catalog'])}
      }) 
    } else {
      this.error = "Invalid"
      return
    }

  }

}
