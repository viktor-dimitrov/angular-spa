import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  @Input() recordId: string | undefined = undefined;
  @ViewChild('form', { static: false }) form!: NgForm;


  postComment(form: NgForm){
    const data = form.value;
    console.log(data)
    console.log(this.recordId);


    form.resetForm();
  }


}
