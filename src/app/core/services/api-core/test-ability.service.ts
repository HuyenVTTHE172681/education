import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { Test, TestCategory } from '../../models/test.model';
import { IResponseList, IResponseListData } from '../../models/common.model';

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
    testCategoryId: string = ''
  ): Observable<IResponseList<Test>> {

    const query = `?IsShowInAbilityTest=${isShowInAbilityTest}&classId=${classId}&courseId=${courseId}&filter=&isFromCMS=${isFromCMS}&offSet=${(page - 1) * size
      }&pageSize=${size}&subjectId=${subjectId}&testCategoryId=${testCategoryId}`;

    const apiUrl = `${this.apiBaseUrl}/test${query}`;

    return this.http.get<IResponseList<Test>>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTest(
    isShowInAbilityTest: number,
    classId: string,
    courseId: string,
    filter: string,
    isFromCMS: number = 1,
    page: number,
    size: number,
    subjectId: string,
    testCategoryId: string
  ): Observable<IResponseList<Test>> {

    let query = `?IsShowInAbilityTest=${isShowInAbilityTest}&classId=${classId}&courseId=${courseId}&filter=${filter}&isFromCMS=${isFromCMS}&offSet=${(page - 1) * size
      }&pageSize=${size}&subjectId=${subjectId}&testCategoryId=${testCategoryId}`;

    const apiUrl = `${this.apiBaseUrl}/test${query}`;

    return this.http.get<IResponseList<Test>>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTestNewById(id: string): Observable<IResponseListData<Test>> {

    const apiURL = `${this.apiBaseUrl}/Test/GetTestNewById?id=${id}`;

    return this.http
      .get<IResponseListData<Test>>(apiURL)
      .pipe(catchError(this.handleError));
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

    return this.http
      .post<{ statusCode: number; data: { valid: boolean; messages: string } }>(
        apiUrl,
        payload
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

    return this.http
      .post<{ statusCode: number; data: { valid: boolean; messages: string } }>(
        apiUrl,
        payload
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

    return this.http
      .post<{ statusCode: number; data: { valid: boolean; messages: string } }>(
        apiUrl,
        payload
      )
      .pipe(catchError(this.handleError));
  }

  getTestType(
    filter: string,
    page: number,
    size: number,
    status: number = 1
  ): Observable<IResponseList<TestCategory>> {

    const query = `/TestCategory?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<TestCategory>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  updateTest(test: any): Observable<IResponseListData<Test>> {

    const query = `/Test/SetTestNew`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .post<IResponseListData<Test>>(apiURL, test)
      .pipe(catchError(this.handleError));
  }

  addTest(test: any): Observable<IResponseListData<Test>> {

    const query = `/Test/SetTestNew`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .post<IResponseListData<Test>>(apiURL, test)
      .pipe(catchError(this.handleError));
  }

  deleteTest(id: string) {

    const apiUrl = `${this.apiBaseUrl}/test/${id}`;

    return this.http.delete<any>(apiUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message || 'API call failed'));
      })
    );
  }

  comment(
    filter: string,
    page: number,
    size: number,
    parentId: string,
    screen: string,
  ): Observable<IResponseList<any>> {

    const query = `/Comment?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&parentId=${parentId}&screen=${screen}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<any>>(apiURL)
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
