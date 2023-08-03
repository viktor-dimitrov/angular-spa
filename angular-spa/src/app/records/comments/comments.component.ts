import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Subscription, tap } from 'rxjs';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnDestroy {

  private commentsSubscription: Subscription | undefined;

  @Input() recordId: string | undefined = undefined;
  @ViewChild('form', { static: false }) form!: NgForm;


  constructor( private commentsService: CommentsService ){}


  postComment(form: NgForm){
    const data = { ...form.value, recordId: this.recordId };

    this.commentsSubscription = this.commentsService.postComment(data).subscribe({
      next: (response)=>{ console.log(response)},
      error: ({error})=> console.log(error),
      complete: ()=> form.resetForm()
    }
    )
 
    
  }



  ngOnDestroy(): void {
    if(this.commentsSubscription) {
      this.commentsSubscription?.unsubscribe()
    }
  }

}
