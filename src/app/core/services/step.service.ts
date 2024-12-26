import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { API_URL } from '../../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getSteps(): Observable<any[]> {
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
}
