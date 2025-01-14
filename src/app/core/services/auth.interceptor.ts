import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    const clonedRequest = token
      ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error); // Gọi hàm xử lý lỗi
      })
    );
  }

  // Xử lý lỗi HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi mạng: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Lỗi xác thực! Vui lòng đăng nhập lại.';
          this.router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'Bạn không có quyền truy cập vào tài nguyên này.';
          break;
        case 404:
          errorMessage = 'Không tìm thấy tài nguyên yêu cầu.';
          break;
        case 500:
          errorMessage = 'Lỗi server! Vui lòng thử lại sau.';
          break;
        default:
          errorMessage = `Lỗi không xác định: ${error.statusText}`;
          break;
      }
    }

    this.showErrorMessage(errorMessage);
    return throwError(error);
  }

  // Hiển thị thông báo lỗi
  private showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Thông báo lỗi',
      detail: message,
    });
  }
}
