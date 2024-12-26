import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { User } from '../models/user.model';
import { Payment } from '../models/payment.model';

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
    ): Observable<IResponeList<Payment>> {

        // https://hhq.runasp.net/api/Payment?filter=&isPayment=-1&offSet=0&pageSize=10
        const query = `/Payment?filter=${filter}&isPayment=${isPayment}&offSet=${(page - 1) * size}&pageSize=${size}`;

        const apiURL = `${this.apiBaseUrl}${query}`;
        console.log('Generated dashboard API URL:', apiURL);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .get<IResponeList<Payment>>(apiURL, { headers })
            .pipe(catchError(this.handleError));
    }

    deletedPaymentList(id: string) {
        const apiUrl = `${this.apiBaseUrl}/Payment/${id}`;

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http.delete<any>(apiUrl, { headers }).pipe(
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
        // https://hhq.runasp.net/api/Payment/ChangePaymentStatus
        const apiUrl = `${this.apiBaseUrl}/Payment/ChangePaymentStatus`;
        console.log('Set Status API URL:', apiUrl);

        const token = localStorage.getItem('token');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();

        return this.http
            .put<{ statusCode: number; data: { valid: boolean; messages: string } }>(
                apiUrl,
                payload,
                { headers }
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
