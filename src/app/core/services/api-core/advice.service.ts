import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { IResponseList } from '../../models/common.model';
import { Advice, Feedback, NewsItemStep, Slide } from '../../models/slide.model';

@Injectable({
  providedIn: 'root',
})
export class AdviceService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getAdvice(
    filter: string,
    page: number,
    size: number,
  ): Observable<IResponseList<Advice>> {

      // https://hhq.runasp.net/api/AdviceRequest?filter=&offSet=0&pageSize=10
      const query = `/AdviceRequest?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
        .get<IResponseList<Advice>>(apiURL)
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
