import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../environments/constants';
import { Course, CourseYear } from '../models/course.model';
import { IResponseList, IResponseListData } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getCourse(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Course/GetCoursesUser?classId&filter=&offSet=0&pageSize=10&status=1&subjectId`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            id: item.id,
            classRoomId: item.classRoomId,
            courseAvatar: item.courseAvatar,
            courseBanner: item.courseBanner,
            name: item.name,
            price: item.price,
            priceDiscount: item.priceDiscount,
            shortSummary: item.shortSummary,
            averageRating: item.averageRating,
            teacherName: item.teacherName,
          }));
        })
      );
  }

  getKhoaHoc(
    accountId: string = '',
    callFromAdmin: number = 1,
    classId: string = '',
    filter: string = '',
    isPayment: number = -1,
    page: number = 1,
    size: number = 10,
    status: number = -1,
    subjectId: string = '',
    teacherId: string = ''
  ): Observable<IResponseList<Course>> {

    const query = `?accountId=${accountId}&callFromAdmin=${callFromAdmin}&classId=${classId}&filter=${filter}&isPayment=${isPayment}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}&subjectId=${subjectId}&teacherId=${teacherId}`;
    const apiUrl = `${this.apiBaseUrl}/Course${query}`;

    return this.http.get<IResponseList<Course>>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  deletedCourseList(id: string) {

    const apiUrl = `${this.apiBaseUrl}/Course/${id}`;

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


  getCourseById(
    id: string,
    accountId: string
  ): Observable<IResponseListData<Course>> {

    const apiURL = `${this.apiBaseUrl}/Course/GetCourseByIdCMS?id=${id}&accountId=${accountId}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .get<IResponseListData<Course>>(apiURL, { headers })
      .pipe(catchError(this.handleError));
  }

  //================== COURSE YEAR
  getCourseYear(
    filter: string,
    offSet: number,
    pageSize: number,
    status: number
  ): Observable<IResponseList<CourseYear>> {

    const apiUrl = `${this.apiBaseUrl}/CourseYear?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}&status=${status}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .get<IResponseList<CourseYear>>(apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  getCourseYEarById(id: string): Observable<IResponseListData<CourseYear>> {

    const query = `/CourseYear/${id}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .get<IResponseListData<CourseYear>>(apiURL, { headers })
      .pipe(catchError(this.handleError));
  }

  updateCourseYear(courseYears: any): Observable<IResponseListData<CourseYear>> {

    const query = `/CourseYear`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<IResponseListData<CourseYear>>(apiURL, courseYears, { headers })
      .pipe(catchError(this.handleError));
  }

  deletedCourseYear(id: string) {

    const apiUrl = `${this.apiBaseUrl}/CourseYear/${id}`;

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

  //================== COURSE YEAR ==================


  getCourseSchedule(
    courseId: string,
    filter: string,
    offSet: number = 0,
    pageSize: number = 10000
  ): Observable<any[]> {

    const apiUrl = `${this.apiBaseUrl}/CourseSchedule?courseId=${courseId}&filter=${filter}&offSet=${offSet}&pageSize=${pageSize}`;
    console.log('Course Schedule API url: ', apiUrl);

    return this.http
      .get<any>(apiUrl)
      .pipe(map((response) => response?.data?.data || []));
  }

  editCourse(data: any): Observable<any> {
    const apiUrl = `${this.apiBaseUrl}/CourseSchedule`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http.post<any>(apiUrl, data, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('API EditCourse Error: ', err);
        return throwError(() => new Error(err.message || 'API call failed'));
      })
    );
  }

  addCourse(data: any): Observable<any> {

    const apiUrl = `${this.apiBaseUrl}/CourseSchedule`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http.post<any>(apiUrl, data, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('API EditCourse Error: ', err);
        return throwError(() => new Error(err.message || 'API call failed'));
      })
    );
  }

  deletedCourse(id: string): Observable<any> {
    const apiUrl = `${this.apiBaseUrl}/CourseSchedule/${id}`;

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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(
        `Server returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      () => new Error(`Error: ${error.status} - ${error.message}`)
    );
  }
}
