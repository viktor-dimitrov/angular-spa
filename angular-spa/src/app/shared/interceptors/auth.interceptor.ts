import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { environment } from 'src/environments/environment';
const { apiUrl } = environment;


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const user = this.userService.user;

    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', apiUrl),
        // withCredentials: true, 
      });
    }

    if (user && user.accessToken) {
      req = req.clone({
        setHeaders: {
          'x-authorization': user.accessToken,
        }
      })
    }



    return next.handle(req);
  }
}
