import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL } from '../environments/constants';
import { Test, TestCategory } from '../models/test.model';
import { IResponeList, IResponeListData } from '../models/common.model';

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
  ): Observable<IResponeList<Test>> {
    console.log('Page:', page);
    console.log('Size:', size);
    console.log('isShowInAbilityTest:', isShowInAbilityTest);
    console.log('classId:', classId);
    console.log('courseId:', courseId);
    console.log('subjectId:', subjectId);
    console.log('testCategoryId:', testCategoryId);

    // https://hhq.runasp.net/api/test?IsShowInAbilityTest=-1&classId=&courseId&filter=&isFromCMS=1&offSet=0&pageSize=10&subjectId=&testCategoryId=
    let query = `?IsShowInAbilityTest=${isShowInAbilityTest}&classId=${classId}&courseId=${courseId}&filter=&isFromCMS=${isFromCMS}&offSet=${(page - 1) * size
      }&pageSize=${size}&subjectId=${subjectId}&testCategoryId=${testCategoryId}`;

    const apiUrl = `${this.apiBaseUrl}/test${query}`;
    console.log('Generated API URL:', apiUrl);

    return this.http.get<IResponeList<Test>>(apiUrl).pipe(
      // map((response) => response.data?.data || []), // Đảm bảo trả về danh sách dữ liệu
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
  ): Observable<IResponeList<Test>> {

    // https://hhq.runasp.net/api/test?IsShowInAbilityTest=-1&classId=&courseId&filter=&isFromCMS=1&offSet=0&pageSize=10&subjectId=&testCategoryId=
    let query = `?IsShowInAbilityTest=${isShowInAbilityTest}&classId=${classId}&courseId=${courseId}&filter=${filter}&isFromCMS=${isFromCMS}&offSet=${(page - 1) * size
      }&pageSize=${size}&subjectId=${subjectId}&testCategoryId=${testCategoryId}`;

    const apiUrl = `${this.apiBaseUrl}/test${query}`;
    console.log('Generated API URL:', apiUrl);

    return this.http.get<IResponeList<Test>>(apiUrl).pipe(
      // map((response) => response.data?.data || []), // Đảm bảo trả về danh sách dữ liệu
      catchError(this.handleError)
    );
  }

  getTestNewById(id: string): Observable<IResponeListData<Test>> {
    // https://hhq.runasp.net/api/Test/GetTestNewById?id=7869BDEE-081F-4F0A-B7EB-4029D9C1E7A2
    const apiURL = `${this.apiBaseUrl}/Test/GetTestNewById?id=${id}`;

    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    return this.http
      .get<IResponeListData<Test>>(apiURL, { headers })
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

  getTestType(
    filter: string,
    page: number,
    size: number,
    status: number = 1
  ): Observable<IResponeList<TestCategory>> {

    // https://hhq.runasp.net/api/TestCategory?filter=&offSet=0&pageSize=1000&status=1
    const query = `/TestCategory?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}`;

    const apiURL = `${this.apiBaseUrl}${query}`;
    console.log('Generated API URL:', apiURL);

    return this.http
      .get<IResponeList<TestCategory>>(apiURL)
      .pipe(catchError(this.handleError));
  }


  addUser(test: Test): Observable<Test> {
    return this.http
      .post<Test>(`${this.apiBaseUrl}/Test/SetTestNew`, test)
      .pipe(
        tap((test: Test) => console.log(`added user witth id=${test.id}`)),
        catchError(this.handleError)
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
