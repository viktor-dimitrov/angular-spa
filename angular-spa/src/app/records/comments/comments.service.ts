import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from 'src/app/shared/types/comment';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private comments$$ = new BehaviorSubject<Comment[] | undefined>(undefined);
  public comments$ = this.comments$$.asObservable();

  constructor( private http: HttpClient) { }



  postComment(data: Comment): Observable<Comment> {
    const { dataUrl } = environment;
    return this.http.post<Comment>(`${dataUrl}/comments`, data);
  }

}
