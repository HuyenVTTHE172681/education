import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, filter } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { Scores } from '../../models/scores.model';
import { IResponseList } from '../../models/common.model';

@Injectable({
    providedIn: 'root',
})
export class SCoresService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getScores(
        classId: string,
        courseId: string,
        filter: string,
        page: number,
        size: number,
        subjectId: string,
        testCategoryId: string,
        userId: string
    ): Observable<IResponseList<Scores>> {

        const query = `/TestUser?classId=${classId}&courseId=${courseId}&filter=${filter}&offSet=${page}&pageSize=${size}&subjectId=${subjectId}&testCategoryId=${testCategoryId}&userId=${userId}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<Scores>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    // getQuestionGroupsById(id: number): Observable<IResponseListData<QuestionGroups>> {

    //     const query = `/TestQuestionGroup/${id}`;
    //     const apiURL = `${this.apiBaseUrl}${query}`;

    //     return this.http
    //         .get<IResponseListData<QuestionGroups>>(apiURL)
    //         .pipe(catchError(this.handleError));
    // }

    // updateQuestionGroup(questionGroup: any): Observable<IResponseListData<QuestionGroups>> {

    //     const query = `/TestQuestionGroup`;
    //     const apiURL = `${this.apiBaseUrl}${query}`;

    //     const token = localStorage.getItem('token');
    //     const headers = token
    //         ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    //         : new HttpHeaders();

    //     return this.http
    //         .post<IResponseListData<QuestionGroups>>(apiURL, questionGroup, { headers })
    //         .pipe(catchError(this.handleError));
    // }

    // deletedQuestionGroup(id: number) {

    //     const apiUrl = `${this.apiBaseUrl}/TestQuestionGroup/${id}`;

    //     const token = localStorage.getItem('token');
    //     const headers = token
    //         ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    //         : new HttpHeaders();

    //     return this.http.delete<any>(apiUrl, { headers }).pipe(
    //         catchError((err: HttpErrorResponse) => {
    //             return throwError(() => new Error(err.message || 'API call failed'));
    //         })
    //     );
    // }

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
