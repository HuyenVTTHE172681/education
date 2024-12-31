import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, filter } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { Question, QuestionGroups, TestQuestionChangePublicStatus, TestQuestionGroup, TestQuestionNewById, TestQuestionType } from '../models/question.model';

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
    ): Observable<IResponeList<QuestionGroups>> {

        // https://hhq.runasp.net/api/TestQuestionGroup?filter=&offSet=0&pageSize=10&status=-1

        const query = `/TestQuestionGroup?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<QuestionGroups>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getQuestionGroupsById(id: number): Observable<IResponeListData<QuestionGroups>> {

        //https://hhq.runasp.net/api/TestQuestionGroup/130
        const query = `/TestQuestionGroup/${id}`;

        const apiURL = `${this.apiBaseUrl}${query}`;


        return this.http
            .get<IResponeListData<QuestionGroups>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    updateQuestionGroup(questionGroup: any): Observable<IResponeListData<QuestionGroups>> {

        // https://hhq.runasp.net/api/TestQuestionGroup
        const query = `/TestQuestionGroup`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .post<IResponeListData<QuestionGroups>>(apiURL, questionGroup, { headers })
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
