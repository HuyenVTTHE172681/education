import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getFooter(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/footer?filter=&offSet=0&pageSize=1000`)
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            content: item.content,
            title: item.title,
            position: item.position,
            id: item.id,
          }));
        })
      );
  }
}
