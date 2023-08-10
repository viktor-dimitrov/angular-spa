import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Comment } from 'src/app/shared/types/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private comments$$ = new BehaviorSubject<Comment[] | undefined>(undefined);
  public comments$ = this.comments$$.asObservable();

  constructor( private http: HttpClient) { }



  getComments(recordId: string) {
    return this.http.get<Comment[]>(`/api/data/comments/${recordId}`).pipe(tap((comments) =>{ this.comments$$.next(comments)}))
  }

  postComment(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(`/api/data/comments`, data);
  }

  deleteComment(commentId: string, ownerId: string): Observable<Comment> {
    return this.http.delete<Comment>(`/api/data/comments/${commentId}/delete/${ownerId}`);
  }

}
