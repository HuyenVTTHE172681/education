import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl: string = '';
  private apiUrl = 'https://hhq.runasp.net/api/Authentication/authenticate';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // https://hhq.runasp.net/api/Account/GetAccountByUserName?username=admin
  getUserInfo(username: string): Observable<any> {

    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Account/GetAccountByUserName?username=${username}`)
      .pipe();
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
