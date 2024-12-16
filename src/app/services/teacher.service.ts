import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { ClassRoom } from '../models/classRoom.model';
import { Teacher } from '../models/teacher.model';

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
  ): Observable<IResponeList<Teacher>> {

    // https://hhq.runasp.net/api/Teacher?filter=&offSet=0&pageSize=10
    const query = `/Teacher?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated API URL:', apiURL);

    return this.http
      .get<IResponeList<Teacher>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getTeacherWithId(
    id: string
  ): Observable<IResponeListData<Teacher>> {

    // https://hhq.runasp.net/api/Teacher/96203833-60B9-49FA-AD39-749F26999ABC
    const query = `/Teacher/${id}`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated dashboard API URL:', apiURL);

    // const token = localStorage.getItem('token');
    // const headers = token
    //   ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    //   : new HttpHeaders();

    return this.http
      .get<IResponeListData<Teacher>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: any): Observable<IResponeListData<Teacher>> {
    // https://hhq.runasp.net/api/Teacher
    const query = `/Teacher`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated dashboard API URL:', apiURL);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<IResponeListData<Teacher>>(apiURL, teacher, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(id: string) {
    // https://hhq.runasp.net/api/Teacher/16BA72F7-2737-48C5-872D-CCAE38E084B1
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
