import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
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
    const { dataUrl } = environment;
    return this.http.get<Record[]>(`${dataUrl}/records`).pipe(tap((record) => this.records$$.next(record)))
  }

  getOneRecord(recordId: string): Observable<Record> {
    const { dataUrl } = environment;
    return this.http.get<Record>(`${dataUrl}/records/${recordId}`);
  }

  postRecord(data: Record): Observable<Record> {
    const { dataUrl } = environment;
    return this.http.post<Record>(`${dataUrl}/post`, data);
  }

  deleteRecord(recordId: string, ownerId: string): Observable<Record> {
    const { dataUrl } = environment;
    return this.http.delete<Record>(`${dataUrl}/records/${recordId}/delete/${ownerId}`);
  }

  editRecord(data: Record, recordId: string): Observable<Record> {
    const { dataUrl } = environment;
    return this.http.post<Record>(`${dataUrl}/records/${recordId}/edit/${this.userService.user?._id}`, data);
  }



}
