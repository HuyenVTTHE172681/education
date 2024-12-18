import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { ClassRoom } from '../models/classRoom.model';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subject.model';

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
    ): Observable<IResponeList<Subject>> {

        // https://hhq.runasp.net/api/Subject?classId=09EC54D6-A668-4D86-BF42-C2AAD3C00343&filter=&offSet=0&pageSize=5
        const query = `/Subject?classId=${classId}&filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated API URL Subject:', apiURL);

        return this.http
            .get<IResponeList<Subject>>(apiURL)
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
