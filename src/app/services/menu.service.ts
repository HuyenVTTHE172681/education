import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { API_URL } from '../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Menu?filter=&offSet=0&pageSize=200&screen=user&status=1`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            name: item.name,
            icon: item.icon,
            routerLink: item.path,
          }));
        })
      );
  }

  getMenuAdmin(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Menu/GetMenusTree?filter=&offSet=0&pageSize=100&screen=admin&status=1`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            name: item.name,
            icon: item.icon,
            routerLink: item.path,
            items:
              item.childs.length > 0
                ? item.childs.map((child: any) => ({
                    name: child.name,
                    icon: child.icon,
                    routerLink: child.path,
                  }))
                : null,
          }));
        })
      );
  }
}
