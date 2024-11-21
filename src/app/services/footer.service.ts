import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private apiUrl =
    'https://hhq.runasp.net/api/footer?filter=&offSet=0&pageSize=1000';

  constructor(private http: HttpClient) {}

  getFooter(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
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
