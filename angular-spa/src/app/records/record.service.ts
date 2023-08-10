import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Record } from '../shared/types/record';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class RecordService {


  private records$$ = new BehaviorSubject<Record[] | undefined>(undefined);
  public recorsds$ = this.records$$.asObservable();

  constructor(private http: HttpClient, private userService: UserService) { }




  getRecords() {

    return this.http.get<Record[]>(`/api/data/records`).pipe(tap((record) => this.records$$.next(record)))
  }

  getOneRecord(recordId: string): Observable<Record> {
    return this.http.get<Record>(`/api/data/records/${recordId}`);
  }

  postRecord(data: Record): Observable<Record> {
    return this.http.post<Record>(`/api/data/records`, data);
  }

  deleteRecord(recordId: string, ownerId: string): Observable<Record> {
    return this.http.delete<Record>(`/api/data/records/${recordId}/delete/${ownerId}`);
  }

  editRecord(data: Record, recordId: string): Observable<Record> {
    return this.http.post<Record>(`/api/data/records/${recordId}/edit/${this.userService.user?._id}`, data);
  }



}
