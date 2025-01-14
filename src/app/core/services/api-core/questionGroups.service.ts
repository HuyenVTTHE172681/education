import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, filter } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { QuestionGroups } from '../../models/question.model';
import { IResponseList, IResponseListData } from '../../models/common.model';

@Injectable({
    providedIn: 'root',
})
export class QuestionGroupsService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getQuestionGroups(
        filter: string,
        page: number,
        size: number,
        status: number
    ): Observable<IResponseList<QuestionGroups>> {

        const query = `/TestQuestionGroup?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}`;
        const apiURL = `${this.apiBaseUrl}${query}`;
        return this.http
            .get<IResponseList<QuestionGroups>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    getQuestionGroupsById(id: number): Observable<IResponseListData<QuestionGroups>> {

        const query = `/TestQuestionGroup/${id}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseListData<QuestionGroups>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    updateQuestionGroup(questionGroup: any): Observable<IResponseListData<QuestionGroups>> {

        const query = `/TestQuestionGroup`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .post<IResponseListData<QuestionGroups>>(apiURL, questionGroup)
            .pipe(catchError(this.handleError));
    }

    deletedQuestionGroup(id: number) {

        const apiUrl = `${this.apiBaseUrl}/TestQuestionGroup/${id}`;

        return this.http.delete<any>(apiUrl).pipe(
            catchError((err: HttpErrorResponse) => {
                return throwError(() => new Error(err.message || 'API call failed'));
            })
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
