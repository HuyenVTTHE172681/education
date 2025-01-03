
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Kiểm tra và thêm Authorization header nếu token tồn tại
    const clonedRequest = token
      ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
      : req;

    // Tiếp tục gửi request
    return next.handle(clonedRequest);
  }
}
