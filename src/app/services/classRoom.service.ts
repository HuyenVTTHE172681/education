import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../environments/constants';
import { IResponeList } from '../models/common.model';
import { ClassRoom } from '../models/classRoom.model';

@Injectable({
  providedIn: 'root',
})
export class ClassRoomService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getClassRooms(
    page: number,
    size: number,
    filter: string = ''
  ): Observable<IResponeList<ClassRoom>> {
    const searchValue = filter ? `&filter=${filter}` : '';

    const query = `/ClassRoom?filter=${searchValue}&offSet=${
      (page - 1) * size
    }&pageSize=${size}`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated API URL:', apiURL);

    return this.http
      .get<IResponeList<ClassRoom>>(apiURL)
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
