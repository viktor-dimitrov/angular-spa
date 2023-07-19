import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const user = this.userService.getUser();

   
    if (user && user.accessToken) {
      request = request.clone({
        setHeaders: {
          'x-authorization': user.accessToken,
        }
      })
    }

    return next.handle(request);
  }
}
