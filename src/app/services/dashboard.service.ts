import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../environments/constants';
import { IResponeList } from '../models/common.model';
import { ClassRoom } from '../models/classRoom.model';
import { Dashboard } from '../models/dashboard.model';

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
    ): Observable<IResponeList<Dashboard>> {

        // https://hhq.runasp.net/api/Dashboard/GetDashboardAdminOverview?ClassRoomId=&SubjectIds=&accountId=&filter=&offSet=0&pageSize=10
        const searchValue = filter ? `&filter=${filter}` : '';
        const query = `/Dashboard/GetDashboardAdminOverview?ClassRoomId=${classRoomId}&SubjectIds=${subjectIds}&accountId=${accountId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<Dashboard>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardFilterByDate(fromDate: string, toDate: string): Observable<any> {
        const query = `/Dashboard?fromDate=${fromDate}&toDate=${toDate}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log("Api filter dashboard by date:", apiURL);

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
    ): Observable<IResponeList<any>> {

        // https://hhq.runasp.net/api/Dashboard/GetDashboardAdminCourse?ClassRoomId=&SubjectIds=&accountId=&filter=&offSet=0&pageSize=10
        const query = `/Dashboard/GetDashboardAdminCourse?ClassRoomId=${classRoomId}&SubjectIds=${subjectIds}&accountId=${accountId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<any>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardAdminCourseDetail(
        classRoomId: string = '',
        courseId: string = '',
        courseYearId: string = '',
        subjectId: string = '',
        teacherId: string = '',
    ): Observable<IResponeList<any>> {

        //https://hhq.runasp.net/api/Dashboard/GetDashboardAdminCourseDetail?classRoomId=&courseYearId=&subjectId=&teacherId=
        const query = `/Dashboard/GetDashboardAdminCourseDetail?classRoomId=${classRoomId}&courseId=${courseId}&courseYearId=${courseYearId}&subjectId=${subjectId}&teacherId=${teacherId}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<any>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardAdminScore(
        classRoomId: string = '',
        subjectIds: string = '',
        accountId: string = '',
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponeList<any>> {

        // https://hhq.runasp.net/api/Dashboard/GetDashboardAdminScore?ClassRoomId=&SubjectIds=&accountId=&filter=&offSet=0&pageSize=10
        const query = `/Dashboard/GetDashboardAdminScore?ClassRoomId=${classRoomId}&SubjectIds=${subjectIds}&accountId=${accountId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<Dashboard>>(apiURL, { headers })
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
