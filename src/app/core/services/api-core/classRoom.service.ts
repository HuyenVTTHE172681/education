import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { IResponseList, IResponseListData } from '../../models/common.model';
import { ClassRoom } from '../../models/classRoom.model';

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
  ): Observable<IResponseList<ClassRoom>> {

    const query = `/ClassRoom?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<ClassRoom>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getClassRoomWithId(
    id: string
  ): Observable<IResponseListData<ClassRoom>> {

    const query = `/ClassRoom/${id}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseListData<ClassRoom>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  updateClassRoom(classroom: any): Observable<IResponseListData<ClassRoom>> {

    const query = `/ClassRoom`;
    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated dashboard API URL:', apiURL);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<IResponseListData<ClassRoom>>(apiURL, classroom, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteClassRoom(id: string) {

    const apiUrl = `${this.apiBaseUrl}/ClassRoom/${id}`;
    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http.delete<any>(apiUrl, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message || 'API call failed'));
      })
    );
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
