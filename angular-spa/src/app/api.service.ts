import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Record } from './shared/types/record';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getRecords () {
    const {dataUrl} = environment;
    return this.http.get< Record[] >(`${dataUrl}/records`);
  }




}
