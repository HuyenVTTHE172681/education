import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL } from '../environments/constants';
import { Test } from '../models/test.model';
import { IResponeList } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class TestAbilityService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getTestAbility(
    page: number,
    size: number,
    isShowInAbilityTest: number = 1,
    classId: string = '',
    courseId: string = '',
    isFromCMS: number = 0,
    subjectId: string = '',
    testCategoryId: string = 'kiem-tra'
  ): Observable<IResponeList<Test>> {
    console.log('Page:', page);
    console.log('Size:', size);
    console.log('isShowInAbilityTest:', isShowInAbilityTest);
    console.log('classId:', classId);
    console.log('courseId:', courseId);
    console.log('subjectId:', subjectId);
    console.log('testCategoryId:', testCategoryId);

    let query = `?IsShowInAbilityTest=${isShowInAbilityTest}&classId=${classId}&courseId=${courseId}&filter=&isFromCMS=${isFromCMS}&offSet=${
      (page - 1) * size
    }&pageSize=${size}&subjectId=${subjectId}&testCategoryId=${testCategoryId}`;

    const apiUrl = `${this.apiBaseUrl}/test${query}`;
    console.log('Generated API URL:', apiUrl);

    return this.http.get<IResponeList<Test>>(apiUrl).pipe(
      // map((response) => response.data?.data || []), // Đảm bảo trả về danh sách dữ liệu
      catchError(this.handleError)
    );
  }

  getClassrooms(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/ClassRoom?filter=&offSet=0&pageSize=1000`)
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            avatar: item.avatar,
            code: item.code,
            courseId: item.courseId,
            id: item.id,
            name: item.name,
            order: item.order,
            status: item.status,
            subjectId: item.subjectId,
            totalFiltered: item.totalFiltered,
          }));
        })
      );
  }

  getSubjects(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Subject?classId=-1&filter=&offSet=0&pageSize=1000`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            avatar: item.avatar,
            code: item.code,
            courseId: item.courseId,
            id: item.id,
            name: item.name,
            order: item.order,
            status: item.status,
            subjectId: item.subjectId,
            totalFiltered: item.totalFiltered,
          }));
        })
      );
  }

  setTestChangeStatus(payload: {
    id: string;
    isFree: number;
    status: number;
  }): Observable<{
    statusCode: number;
    data: { valid: boolean; messages: string };
  }> {
    const apiUrl = `${this.apiBaseUrl}/test/SetTestChangeStatus`;
    console.log('Set Status API URL:', apiUrl);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<{ statusCode: number; data: { valid: boolean; messages: string } }>(
        apiUrl,
        payload, 
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  setTestChangeFree(payload: {
    id: string;
    isFree: number;
    status: number;
  }): Observable<{
    statusCode: number;
    data: { valid: boolean; messages: string };
  }> {
    const apiUrl = `${this.apiBaseUrl}/test/SetTestChangeFree`;
    console.log('Set Status API URL:', apiUrl);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<{ statusCode: number; data: { valid: boolean; messages: string } }>(
        apiUrl,
        payload, 
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  setTestChangeAutoSendMail(payload: {
    id: string;
    isAutoSendMail: number;
    isFree: number;
    isShowInAbilityTest: number;
    isSpecial: number;
    status: number;
  }): Observable<{
    statusCode: number;
    data: { valid: boolean; messages: string };
  }> {
    const apiUrl = `${this.apiBaseUrl}/test/SetTestChangeStatusValue`;
    console.log('Set Status API URL:', apiUrl);

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .post<{ statusCode: number; data: { valid: boolean; messages: string } }>(
        apiUrl,
        payload, 
        { headers }
      )
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
