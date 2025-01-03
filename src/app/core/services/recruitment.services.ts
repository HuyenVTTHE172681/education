import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, filter, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { API_URL } from '../../environments/constants';
import { IResponseList } from '../models/common.model';
import { Recruit, RecruitCandidate } from '../models/recruitment.model';

@Injectable({
    providedIn: 'root',
})
export class RecruitmentService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getSteps(): Observable<any[]> {
        return this.http
            .get<any>(
                `${this.apiBaseUrl}/step?filter=&isParent&offSet=0&pageSize=10&screen=tuyen-dung&status=1`
            )
            .pipe(
                map((response) => {
                    return response.data.data.map((item: any) => ({
                        id: item.id,
                        steps: item.steps, // Đây là danh sách các buổi đơn giản của mỗi step
                        description: item.description,
                        name: item.name,
                        title: item.title,
                        image: item.image,
                    }));
                })
            );
    }

    getRecruitment(
        filter: string,
        page: number,
        size: number,
        status: number,
    ): Observable<IResponseList<Recruit>> {

        const query = `/recruit?filter=${filter}&offSet=${page}&pageSize=${size}&status=${status}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<Recruit>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    getRecruitCandidate(
        filter: string,
        interviewPass: number,
        page: number,
        size: number,
        status: number,
    ): Observable<IResponseList<RecruitCandidate>> {

        //  https://hhq.runasp.net/api/RecruitCandidate?filter=&interviewPass=-1&offSet=0&pageSize=10&status=-1
        const query = `/RecruitCandidate?filter=${filter}&interviewPass=${interviewPass}&offSet=${page}&pageSize=${size}&status=${status}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        // const token = localStorage.getItem('token');
        // const headers = token
        //     ? new HttpHeaders({ Authorization: `Bearer ${token}` })
        //     : new HttpHeaders();

        return this.http
            .get<IResponseList<RecruitCandidate>>(apiURL)
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
