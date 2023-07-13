import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class UserService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'Content-Type, X-Authorization'
    })
  };

  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { 
    try{
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);

    }catch(error){
      this.user = undefined;
    }
  }

  

  register(userData: any) : Observable<any>{
console.log(userData)
    const {authUrl} = environment;
    return this.http.post<any>(`${authUrl}/register`, userData, this.httpOptions);

  }


  login(): void {

    this.user = {
      email: 'viko@abv.bg',
      userName: 'Viko',
      _id: 'qwerqer',
      imageUrl: 'qweqerqer',
      phone: '1231234',
      accessToken: "qwerqwer" || undefined,

    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }


}