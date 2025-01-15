import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { IResponseList } from '../../models/common.model';
import { Action, Menu, Role } from '../../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getMenus(
    page: number,
    size: number,
    filter: string = '',
    screen: string = '',
    status: number = 1
  ): Observable<IResponseList<Menu>> {

    const query = `/Menu/GetMenusTree?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}&status=${status}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<Menu>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getActions(
    filter: string,
    page: number,
    size: number
  ): Observable<IResponseList<Action>> {

    const query = `/Role/GetActions?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<Action>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getRole(
    filter: string,
    page: number,
    size: number
  ): Observable<IResponseList<Role>> {

    const query = `/Role?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<Role>>(apiURL)
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
