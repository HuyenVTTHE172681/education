import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { IResponseList } from '../../models/common.model';
import { NewsItemStep, Slide } from '../../models/slide.model';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getSteps(): Observable<any[]> {
    // https://hhq.runasp.net/api/step?filter=&isParent&offSet=0&pageSize=10&screen&status=-1
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/step?filter=&isParent&offSet=0&pageSize=10&screen=trang-chu&status=1`
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

  getStep(
    filter: string,
    isParent: number,
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
