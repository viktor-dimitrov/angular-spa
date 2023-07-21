import { Injectable } from '@angular/core';
import { User } from '../shared/types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();


  user: User | undefined;
  USER_KEY = 'user';

  get isLogged(): boolean {
    return !!this.user;
  }


  
  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  setLsUser(user: User): void {
    this.user = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
  }

  getUser() : User |undefined {
    const user = this.user ? this.user : undefined
    return user
  }


  register(userData: User): Observable<User> {
    const { authUrl } = environment;
    return this.http.post<User>(`${authUrl}/register`, userData).pipe(tap((user)=>this.user$$.next(user)));
  }

  login(userData: User): Observable<User> {
    const { authUrl } = environment;
    return this.http.post<User>(`${authUrl}/login`, userData).pipe(tap((user)=>this.user$$.next(user)));
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }


}