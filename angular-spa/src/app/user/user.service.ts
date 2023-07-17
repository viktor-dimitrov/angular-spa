import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  //  httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin':'Content-Type, X-Authorization'
  //   })
  // };

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

  

  register(userData: any) : void {
    const {authUrl} = environment;
    const regUser: Observable<any> = this.http.post<any>(`${authUrl}/register`, userData);
    
    regUser.subscribe({
      next: response => {
       this.user = response;
       localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
      },
      error: (err) => {
         console.log(`Error: ${err}`);
      } 
    })
  }


  login(userData: any): void {

    const {authUrl} = environment;
    const logUser: Observable<any> = this.http.post<any>(`${authUrl}/login`, userData);

    logUser.subscribe({
      next: response => {
        console.log(response)
       this.user = response;
       localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
      },
      error: ({error}) => {
         console.error (error.error);
      } 
    })

  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }


}