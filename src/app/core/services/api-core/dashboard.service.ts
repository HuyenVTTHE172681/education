import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../../../environments/constants';
import { Dashboard, DashboardAdminCourse, DashboardAdminScore } from '../../models/dashboard.model';
import { IResponseList, IResponseListData } from '../../models/common.model';
import { Guide } from '../../models/guide.model';
import { User } from '../../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getDashboardAdminOverview(
        page: number,
        size: number,
        filter: string = '',
        classRoomId: string = '',
        subjectIds: string = '',
        accountId: string = ''
    ): Observable<IResponseList<Dashboard>> {

        const query = `/Dashboard/GetDashboardAdminOverview?ClassRoomId=${classRoomId}&SubjectIds=${subjectIds}&accountId=${accountId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<Dashboard>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardFilterByDate(fromDate: string, toDate: string): Observable<any> {

        const query = `/Dashboard?fromDate=${fromDate}&toDate=${toDate}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http.get<any>(apiURL, { headers }).pipe(catchError(this.handleError));
    }

    getDashboardAdminCourse(
        page: number,
        size: number,
        filter: string = '',
        classRoomId: string = '',
        subjectIds: string = '',
        accountId: string = ''
    ): Observable<IResponseList<DashboardAdminCourse>> {

        const query = `/Dashboard/GetDashboardAdminCourse?ClassRoomId=${classRoomId}&SubjectIds=${subjectIds}&accountId=${accountId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');

        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<DashboardAdminCourse>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardAdminCourseDetail(
        classRoomId: string = '',
        courseId: string = '',
        courseYearId: string = '',
        subjectId: string = '',
        teacherId: string = '',
    ): Observable<IResponseList<any>> {

        const query = `/Dashboard/GetDashboardAdminCourseDetail?classRoomId=${classRoomId}&courseId=${courseId}&courseYearId=${courseYearId}&subjectId=${subjectId}&teacherId=${teacherId}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<any>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardAdminScore(
        classRoomId: string = '',
        subjectIds: string = '',
        accountId: string = '',
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponseList<DashboardAdminScore>> {

        const query = `/Dashboard/GetDashboardAdminScore?ClassRoomId=${classRoomId}&SubjectIds=${subjectIds}&accountId=${accountId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<DashboardAdminScore>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardGuide(
        filter: string = '',
        page: number,
        size: number,
        screen: string = 'admin',
    ): Observable<IResponseList<Guide>> {

        const query = `/Guide?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<Guide>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardAccount(
        filter: string = '',
        page: number,
        size: number,
        roleId: string = '',
        roleTypeDataId: string = '',
    ): Observable<IResponseList<User>> {

        const query = `/Account?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&roleId=${roleId}&roleTypeDataId=${roleTypeDataId}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<User>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getRole(
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponseList<any>> {

        const query = `/Role?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<any>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getRoleDataType(
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponseList<any>> {

        const query = `/RoleDataType?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<any>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getAccountDetail(
        id: string
    ): Observable<IResponseListData<User>> {

        const query = `/Account/${id}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseListData<User>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    updateAccount(account: any): Observable<IResponseListData<User>> {

        const query = `/account/SetAccountUser`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();
            
        return this.http
            .post<IResponseListData<User>>(apiURL, account, { headers })
            .pipe(catchError(this.handleError));
    }

    getAccountsNotTeacher(
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponseList<User>> {

        const query = `/Account/GetAccountsNotTeacher?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponseList<User>>(apiURL, { headers })
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
