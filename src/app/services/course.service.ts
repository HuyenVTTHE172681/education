import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { Course } from '../models/course.model';

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
  ): Observable<IResponeList<Course>> {
    const offset = (page - 1) * size;
    const query = `?accountId=${accountId}&callFromAdmin=${callFromAdmin}&classId=${classId}&filter=${filter}&isPayment=${isPayment}&offSet=${offset}&pageSize=${size}&status=${status}&subjectId=${subjectId}&teacherId=${teacherId}`;

    const apiUrl = `${this.apiBaseUrl}/Course${query}`;
    console.log("Api to all course:", apiUrl);

    return this.http.get<IResponeList<Course>>(apiUrl).pipe(
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
        console.error('API EditCourse Error: ', err);
        return throwError(() => new Error(err.message || 'API call failed'));
      })
    );
  }


  getCourseById(
    id: string,
    accountId: string
  ): Observable<IResponeListData<Course>> {
    const apiURL = `${this.apiBaseUrl}/Course/GetCourseByIdCMS?id=${id}&accountId=${accountId}`;
    console.log('Course ById API URL:', apiURL);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .get<IResponeListData<Course>>(apiURL, { headers })
      .pipe(catchError(this.handleError));
  }

  getCourseYear(
    filter: string,
    offSet: number,
    pageSize: number,
    status: number
  ): Observable<any[]> {
    const apiUrl = `${this.apiBaseUrl}/CourseYear?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}&status=${status}`;

    https: console.log('Course Year API URL:', apiUrl);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http.get<any>(apiUrl, { headers }).pipe(
      map((response) => response?.data?.data || []) // Trích xuất mảng `data.data` từ phản hồi
    );
  }

  getSubject(
    classId: string,
    filter: string = '',
    offSet: number = 0,
    pageSize: number = 10000
  ): Observable<any[]> {
    const apiUrl = `${this.apiBaseUrl}/Subject?classId=${classId}&filter=${filter}&offSet=${offSet}&pageSize=${pageSize}`;

    console.log('Subject with ClassId API url : ', apiUrl);
    return this.http.get<any>(apiUrl).pipe(
      map((response) => response?.data?.data || []) // Trích xuất mảng `data.data` từ phản hồi
    );
  }

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
    console.log("Api add course: ", apiUrl)

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
