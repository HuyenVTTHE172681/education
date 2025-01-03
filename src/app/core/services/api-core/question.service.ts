import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, filter } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { IResponseList, IResponseListData } from '../../models/common.model';
import { Question, TestQuestionChangePublicStatus, TestQuestionGroup, TestQuestionNewById, TestQuestionType } from '../../models/question.model';

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
    ): Observable<IResponseList<Question>> {

        const query = `/testQuestion?filter=${filter}&isHaveConfig=${isHaveConfig}&level=${level}&offSet=${(page - 1) * size}&pageSize=${size}&publicStatus=${publicStatus}&testQuestionGroupId=${testQuestionGroupId}&testQuestionTypeCode=${testQuestionTypeCode}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<Question>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    getTestQuestionGroup(
        filter: string,
        page: number,
        size: number,
        status: number = 1): Observable<IResponseList<TestQuestionGroup>> {

        const query = `/TestQuestionGroup?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&status=${status}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<TestQuestionGroup>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    getTestQuestionType(filter: string, page: number, size: number): Observable<IResponseList<TestQuestionType>> {

        const query = `/TestQuestionType?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<TestQuestionType>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    getTestQuestionNewById(
        id: string
    ): Observable<IResponseListData<TestQuestionNewById>> {

        const query = `/TestQuestion/GetTestQuestionNewById?id=${id}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseListData<TestQuestionNewById>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    updateTestQuestionChangePublicStatus(id: string, publicStatus: number): Observable<IResponseListData<TestQuestionChangePublicStatus>> {

        const query = `/TestQuestion/UpdateTestQuestionChangePublicStatus?id=${id}&publicStatus=${publicStatus}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseListData<TestQuestionChangePublicStatus>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    deletedTestQuestion(documentId: string, isMultiple: number) {

        const query = `/testQuestion`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        const payload = {
            id: documentId,
            isMultiple: isMultiple,
        };

        return this.http
            .delete<any>(apiURL, { body: payload })
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
