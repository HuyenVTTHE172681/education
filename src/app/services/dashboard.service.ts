import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { Dashboard } from '../models/dashboard.model';
import { User } from '../models/user.model';
import { Guide } from '../models/guide.model';

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

    getDashboardGuide(
        filter: string = '',
        page: number,
        size: number,
        screen: string = 'admin',
    ): Observable<IResponeList<Guide>> {

        // https://hhq.runasp.net/api/Guide?filter=&offSet=0&pageSize=1000&screen=admin
        const query = `/Guide?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<Guide>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getDashboardAccount(
        filter: string = '',
        page: number,
        size: number,
        roleId: string = '',
        roleTypeDataId: string = '',
    ): Observable<IResponeList<User>> {

        //https://hhq.runasp.net/api/Account?filter=&offSet=0&pageSize=100000&roleId&roleTypeDataId
        const query = `/Account?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&roleId=${roleId}&roleTypeDataId=${roleTypeDataId}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<User>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getRole(
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponeList<any>> {

        //https://hhq.runasp.net/api/Role?filter=&offSet=0&pageSize=1000
        const query = `/Role?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

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

    getRoleDataType(
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponeList<any>> {

        //https://hhq.runasp.net/api/RoleDataType?filter=&offSet=0&pageSize=1000
        const query = `/RoleDataType?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

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

    getAccountDetail(
        id: string
    ): Observable<IResponeListData<User>> {

        // https://hhq.runasp.net/api/Account/021CBE66-81A3-4F43-A7F3-00D31823D08C
        const query = `/Account/${id}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeListData<User>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    updateAccount(account: any): Observable<IResponeListData<User>> {
        // https://hhq.runasp.net/api/account/SetAccountUser
        const query = `/account/SetAccountUser`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();
        return this.http
            .post<IResponeListData<User>>(apiURL, account, { headers })
            .pipe(catchError(this.handleError));
    }

    getAccountsNotTeacher(
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponeList<User>> {

        // https://hhq.runasp.net/api/Account/GetAccountsNotTeacher?filter=&offSet=0&pageSize=100000
        const query = `/Account/GetAccountsNotTeacher?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<User>>(apiURL, { headers })
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
