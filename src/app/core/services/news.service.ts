import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../environments/constants';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getCategory(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/NewsCategory?filter=&offSet=0&pageSize=1000&status=1`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            order: item.order,
            status: item.status,
            totalFiltered: item.totalFiltered,
          }));
        })
      );
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

  // private apiUrl =
  //   'https://hhq.runasp.net/api/News?categoryId&filter=&offSet=0&pageSize=10&status=1';

  getNews(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/News?categoryId&filter=&offSet=0&pageSize=10&status=1`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            id: item.id,
            avatar: item.avatar,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            content: item.content,
            createdDate: item.createdDate,
            order: item.order,
            rate: item.rate,
            title: item.title,
            totalFiltered: item.totalFiltered,
            view: item.view,
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
}
