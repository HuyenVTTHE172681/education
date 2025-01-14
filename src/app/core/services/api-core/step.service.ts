import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { IResponseList } from '../../models/common.model';
import { Feedback, NewsItemStep, Slide } from '../../models/slide.model';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getStep(
    filter: string,
    isParent: string,
    page: number,
    size: number,
    screen: string,
    status: number
  ): Observable<IResponseList<NewsItemStep>> {

    const query = `/step?filter=${filter}&isParent=${isParent}
                    &offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}&status=${status}`;

    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<NewsItemStep>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getSlide(
    filter: string,
    page: number,
    size: number,
    screen: string,
    status: number
  ): Observable<IResponseList<Slide>> {

    // https://hhq.runasp.net/api/Slide?filter=&offSet=0&pageSize=10&screen=&status=-1
    const query = `/Slide?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}&screen=${screen}&status=${status}`;

    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<Slide>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getFeedBack(
    filter: string,
    page: number,
    size: number
  ): Observable<IResponseList<Feedback>> {

    // https://hhq.runasp.net/api/feedback?filter=&offSet=0&pageSize=10
    const query = `/feedback?filter=${filter}&offSet=${(page - 1) * size}&pageSize=${size}`;

    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<Feedback>>(apiURL)
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
