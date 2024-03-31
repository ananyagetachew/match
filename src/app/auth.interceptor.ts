import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
         //Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
