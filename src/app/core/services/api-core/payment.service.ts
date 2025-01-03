import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { Payment } from '../../models/payment.model';
import { IResponseList } from '../../models/common.model';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getDashboardPayment(
        filter: string = '',
        isPayment: number = -1,
        page: number,
        size: number,
    ): Observable<IResponseList<Payment>> {

        const query = `/Payment?filter=${filter}&isPayment=${isPayment}&offSet=${(page - 1) * size}&pageSize=${size}`;
        const apiURL = `${this.apiBaseUrl}${query}`;

        return this.http
            .get<IResponseList<Payment>>(apiURL)
            .pipe(catchError(this.handleError));
    }

    deletedPaymentList(id: string) {
        const apiUrl = `${this.apiBaseUrl}/Payment/${id}`;

        return this.http.delete<any>(apiUrl).pipe(
            catchError((err: HttpErrorResponse) => {
                console.error('API EditCourse Error: ', err);
                return throwError(() => new Error(err.message || 'API call failed'));
            })
        );
    }

    updatePayment(payload: {
        id: string;
        isPayment: number;
        comment: string;
    }): Observable<{
        statusCode: number;
        data: { valid: boolean; messages: string };
    }> {
        const apiUrl = `${this.apiBaseUrl}/Payment/ChangePaymentStatus`;

        return this.http
            .put<{ statusCode: number; data: { valid: boolean; messages: string } }>(
                apiUrl,
                payload,
            )
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
