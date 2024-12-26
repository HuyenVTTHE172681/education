import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, filter } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../environments/constants';
import { IResponeList } from '../models/common.model';
import { Question, TestQuestionGroup, TestQuestionType } from '../models/question.model';

@Injectable({
    providedIn: 'root',
})
export class QuestionsService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getQuestions(
        filter: string,
        isHaveConfig: number = 0,
        level: number = -1,
        page: number = 1,
        size: number = 10,
        publicStatus: number = -1,
        testQuestionGroupId: number = -1,
        testQuestionTypeCode: string,
    ): Observable<IResponeList<Question>> {

        //  https://hhq.runasp.net/api/testQuestion?filter=&isHaveConfig=0&level=-1&
        // offSet=0&pageSize=10&publicStatus=-1&testQuestionGroupId=-1&testQuestionTypeCode=

        const query = `/testQuestion?filter=${filter}&isHaveConfig=${isHaveConfig}&level=${level}&offSet=${(page - 1) * size}&pageSize=${size}&publicStatus=${publicStatus}&testQuestionGroupId=${testQuestionGroupId}&testQuestionTypeCode=${testQuestionTypeCode}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<Question>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    // https://hhq.runasp.net/api/TestQuestionGroup?filter=&offSet=0&pageSize=1000&status=1
    getTestQuestionGroup(
        filter: string,
        page: number,
        size: number,
        status: number = 1): Observable<IResponeList<TestQuestionGroup>> {

        // https://hhq.runasp.net/api/TestQuestionGroup?filter=&offSet=0&pageSize=1000&status=1

        const query = `/TestQuestionGroup?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<TestQuestionGroup>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    getTestQuestionType(filter: string, page: number, size: number): Observable<IResponeList<TestQuestionType>> {
        //https://hhq.runasp.net/api/TestQuestionType?filter=&offSet=0&pageSize=1000

        const query = `/TestQuestionType?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<TestQuestionType>>(apiURL, { headers })
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
