import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Comment } from 'src/app/shared/types/comment';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private comments$$ = new BehaviorSubject<Comment[] | undefined>(undefined);
  public comments$ = this.comments$$.asObservable();

  constructor( private http: HttpClient) { }



  getComments(recordId: string) {
    const { dataUrl } = environment;
    return this.http.get<Comment[]>(`${dataUrl}/comments/${recordId}`).pipe(tap((comments) =>{ this.comments$$.next(comments)}))
  }

  postComment(data: Comment): Observable<Comment> {
    const { dataUrl } = environment;
    return this.http.post<Comment>(`${dataUrl}/comments`, data);
  }

}
