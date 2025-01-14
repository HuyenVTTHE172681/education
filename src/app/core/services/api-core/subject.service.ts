import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { IResponseList, IResponseListData } from '../../models/common.model';
import { Observable, throwError } from 'rxjs';
import { Subject } from '../../models/subject.model';

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getSubjectByCourse(
        classId: string,
        filter: string = '',
        page: number,
        size: number,
    ): Observable<IResponseList<Subject>> {

        const query = `/Subject?classId=${classId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<Subject>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    getSubjectById(
        id: string
    ): Observable<IResponseListData<Subject>> {

        const query = `/Subject/${id}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseListData<Subject>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    addSubject(subject: any): Observable<IResponseListData<Subject>> {

        const query = `/Subject`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .post<IResponseListData<Subject>>(apiURL, subject)
            .pipe(catchError(this.handleError));
    }

    deleteSubject(id: string) {

        const apiUrl = `${this.apiBaseUrl}/Subject/${id}`;

        return this.http.delete<any>(apiUrl).pipe(
            catchError((err: HttpErrorResponse) => {
                console.error('API EditCourse Error: ', err);
                return throwError(() => new Error(err.message || 'API call failed'));
            })
        );
    }

    updateSubject(subject: any): Observable<IResponseListData<Subject>> {

        const query = `/Subject`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .post<IResponseListData<Subject>>(apiURL, subject)
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
