import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://hhq.runasp.net/api/Home';

  constructor(private http: HttpClient) {}

  getSlider(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        return response.data.slides.map((item: any) => ({
          name: item.name,
          routerLink: item.link,
          imageUrl: item.imageUrl,
        }));
      })
    );
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        return response.data.subjects.map((item: any) => ({
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          status: item.status,
          courses: item.courses, // Đây là danh sách các khóa học của mỗi subject
        }));
      })
    );
  }

  getQuiz(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        return response.data.quizs.map((item: any) => ({
          id: item.id,
          title: item.title,
          avatar: item.avatar,
          rate: item.rate,
          content: item.content,
          view: item.view,
          category: item.categoryId,
          categoryName: item.categoryName,
        }));
      })
    );
  }

  getTeachers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        return response.data.teachers.map((item: any) => ({
          accountId: item.accountId,
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          description: item.description,
          descriptionShort: item.descriptionShort,
          averageRate: item.averageRate,
        }));
      })
    );
  }

  getClassRooms(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        return response.data.classRooms.map((item: any) => ({
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          order: item.order,
          status: item.status,
          subjectId: item.subjectId,
        }));
      })
    );
  }
}
