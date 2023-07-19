import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Record } from '../shared/types/record';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

postRecord(data: Record): Observable<Record> {
  const { dataUrl } = environment;
  return   this.http.post<Record>(`${dataUrl}/post`, data)
}

// register(userData: User): Observable<User> {
//     const { authUrl } = environment;
//     return this.http.post<User>(`${authUrl}/register`, userData);
//   }

}
