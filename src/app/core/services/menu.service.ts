import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../../environments/constants';
import { IResponeList } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getMenuUser(
    page: number,
    size: number,
    filter: string = '',
    screen: string = '',
    status: number = 1
  ): Observable<IResponeList<MenuItem>> {

    // https://hhq.runasp.net/api/Menu/GetMenusTree?filter=&offSet=0&pageSize=100&screen=user&status=1
    const query = `/Menu/GetMenusTree?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}&status=${status}`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated API URL:', apiURL);

    return this.http
      .get<IResponeList<MenuItem>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getMenuAdmin(
    page: number,
    size: number,
    filter: string = '',
    screen: string = '',
    status: number = 1
  ): Observable<IResponeList<MenuItem>> {

    // https://hhq.runasp.net/api/Menu/GetMenusTree?filter=&offSet=0&pageSize=100&screen=admin&status=1
    const query = `/Menu/GetMenusTree?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}&status=${status}`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated API URL:', apiURL);

    return this.http
      .get<IResponeList<MenuItem>>(apiURL)
      .pipe(catchError(this.handleError));
  }


  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
