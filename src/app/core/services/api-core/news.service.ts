import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';
import { IResponseList, IResponseListData } from '../../models/common.model';
import { News, NewsCategory } from '../../models/news.model';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getNewsCategory(
    filter: string,
    page: number,
    size: number,
    status: number,
  ): Observable<IResponseList<NewsCategory>> {

    const query = `/NewsCategory?filter=${filter}&offSet=${page}&pageSize=${size}&status=${status}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<NewsCategory>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getNewsCategoryById(id: string): Observable<IResponseListData<NewsCategory>> {

    const query = `/NewsCategory/${id}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseListData<NewsCategory>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  updateNewsCategory(newsCategory: any): Observable<IResponseListData<NewsCategory>> {
    const query = `/NewsCategory`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .post<IResponseListData<NewsCategory>>(apiURL, newsCategory)
      .pipe(catchError(this.handleError));
  }

  deletedNewsCategory(id: number) {

    const apiUrl = `${this.apiBaseUrl}/NewsCategory/${id}`;

    return this.http.delete<any>(apiUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message || 'API call failed'));
      })
    );
  }

  getNews(
    categoryId: string,
    filter: string,
    page: number,
    size: number,
    status: number,
  ): Observable<IResponseList<News>> {

    const query = `/News?categoryId=${categoryId}&filter=${filter}&offSet=${page}&pageSize=${size}&status=${status}`;
    const apiURL = `${this.apiBaseUrl}${query}`;

    return this.http
      .get<IResponseList<News>>(apiURL)
      .pipe(catchError(this.handleError));
  }

  getNewsById(id: string): Observable<IResponseListData<News>> {
  
    const query = `/News/${id}`;
      const apiURL = `${this.apiBaseUrl}${query}`;
  
      return this.http
        .get<IResponseListData<News>>(apiURL)
        .pipe(catchError(this.handleError));
    }
  

  // private apiUrl2 = 'https://hhq.runasp.net/api/News/GetNewsOther';
  getNewsOther(): Observable<any[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/News/GetNewsOther`).pipe(
      map((response) => {
        return response.data.newsByDate.map((item: any) => ({
          id: item.id,
          avatar: item.avatar,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          content: item.content,
          order: item.order,
          shortContent: item.shortContent,
          tags: item.tags,
          title: item.title,
          view: item.view,
          createDate: item.createDate,
          rate: item.rate,
        }));
      })
    );
  }


  getNewsByDate(): Observable<any[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/News/GetNewsOther`).pipe(
      map((response) => {
        return response.data.newsByDate.map((item: any) => ({
          id: item.id,
          avatar: item.avatar,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          content: item.content,
          order: item.order,
          shortContent: item.shortContent,
          tags: item.tags,
          title: item.title,
          view: item.view,
          createDate: item.createDate,
          rate: item.rate,
        }));
      })
    );
  }

  getNewsByView(): Observable<any[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/News/GetNewsOther`).pipe(
      map((response) => {
        return response.data.newsByView.map((item: any) => ({
          id: item.id,
          avatar: item.avatar,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          content: item.content,
          order: item.order,
          shortContent: item.shortContent,
          tags: item.tags,
          title: item.title,
          view: item.view,
          createDate: item.createDate,
          rate: item.rate,
        }));
      })
    );
  }

  // private apiUrl3 =
  //   'https://hhq.runasp.net/api/NewsCategory?filter=&offSet=0&pageSize=1000&status=1';

  // getCategory(): Observable<any[]> {
  //   return this.http.get<any>(this.apiUrl3).pipe(
  //     map((response) => {
  //       return response.data.data.map((item: any) => ({
  //         id: item.id,
  //         name: item.name,
  //         order: item.order,
  //         status: item.status,
  //         totalFiltered: item.totalFiltered,
  //       }));
  //     })
  //   );
  // }

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
