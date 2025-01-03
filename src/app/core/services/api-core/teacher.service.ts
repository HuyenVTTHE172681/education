import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { IResponseList, IResponseListData } from '../../models/common.model';
import { Teacher } from '../../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getTeachers(
    page: number,
    size: number,
    filter: string = ''
  ): Observable<IResponseList<Teacher>> {

    const query = `/Teacher?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<Teacher>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getTeacherWithId(
    id: string
  ): Observable<IResponseListData<Teacher>> {

    const query = `/Teacher/${id}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseListData<Teacher>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: any): Observable<IResponseListData<Teacher>> {

    const query = `/Teacher`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<IResponseListData<Teacher>>(apiURL, teacher, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(id: string) {
    const apiUrl = `${this.apiBaseUrl}/Teacher/${id}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http.delete<any>(apiUrl, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('API EditCourse Error: ', err);
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
