import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Subscription, tap } from 'rxjs';
import { CommentsService } from './comments.service';
import { Comment } from 'src/app/shared/types/comment';
import { DateService } from 'src/app/shared/date.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {

  private commentsSubscription: Subscription | undefined;

  @Input() recordId: string  = '';
  @ViewChild('form', { static: false }) form!: NgForm;


  comments: Comment[] | [] = [];

  
   get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  get hasComments():boolean {
    return !!this.comments.length;
  }


  formattedDate(timestamp: number): string | null {
    return this.dateService.getFormattedDate(timestamp)
  }


  constructor( private commentsService: CommentsService, private userService: UserService , private dateService: DateService){}

  ngOnInit(): void {
    this.commentsSubscription = this.commentsService.getComments(this.recordId).subscribe({
      next: (response: Comment[]) => {  this.comments = response},
      error: ({error}) => {console.log(error)},
      complete: ()=> {}
    })
  }

  isAuthor(commentOwnerId: string): boolean {
    const user = this.userService.user;
    return !!(commentOwnerId === user?._id)
  }

  postComment(form: NgForm){
    const data = { ...form.value, recordId: this.recordId };
    this.commentsSubscription = this.commentsService.postComment(data).subscribe({
      next: (response: Comment)=>{ this.comments = [ ...this.comments, response] },
      error: ({error})=> console.log(error),
      complete: ()=> {
        console.log(this.comments)
        form.resetForm();
      }
    }
    )
  }


  deleteComment(commentId: string, ownerId: string): void {
    const confirmed = window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS COMMENT');
    if (confirmed) {
      this.commentsSubscription = this.commentsService.deleteComment(commentId, ownerId)
        .subscribe({
          next: (response) => {
            this.comments = this.comments.filter(comment => comment._id !== response._id)
        
          },
          error: ({ error }) => console.log(error.error) ,
        })
    }
  }



  ngOnDestroy(): void {
    if(this.commentsSubscription) {
      this.commentsSubscription?.unsubscribe()
    }
  }

}
