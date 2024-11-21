import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://hhq.runasp.net/api/Authentication/authenticate';
  private userSubject = new BehaviorSubject<any>(null); // Trạng thái user
  public user$ = this.userSubject.asObservable(); // Quan sát trạng thái user

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      map((response) => {
        if (response?.status === 'success') {
          const userData = response.data;
          localStorage.setItem('token', userData.token); // Lưu token
          localStorage.setItem('user', JSON.stringify(userData)); // Lưu user
          this.userSubject.next(userData); // Cập nhật trạng thái user
          return userData;
        }
        throw new Error('Login failed');
      })
    );
  }


  getUser(): any {
    return this.userSubject.getValue();
  }

  logout(): void {
    localStorage.clear();
    this.userSubject.next(null); // Cập nhật trạng thái user về null
  }
}
