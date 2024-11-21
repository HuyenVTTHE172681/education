import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getCourse(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Course/GetCoursesUser?classId&filter=&offSet=0&pageSize=10&status=1&subjectId`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            id: item.id,
            classRoomId: item.classRoomId,
            courseAvatar: item.courseAvatar,
            courseBanner: item.courseBanner,
            name: item.name,
            price: item.price,
            priceDiscount: item.priceDiscount,
            shortSummary: item.shortSummary,
            averageRating: item.averageRating,
            teacherName: item.teacherName,
          }));
        })
      );
  }

  getKhoaHoc(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Course?accountId&callFromAdmin=1&classId=&filter=&isPayment=-1&offSet=0&pageSize=10&status=-1&subjectId=&teacherId=`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            id: item.id,
            classRoomName: item.classRoomName,
            courseAvatar: item.courseAvatar,
            courseBanner: item.courseBanner,
            isShowHome: item.isShowHome,
            name: item.name,
            price: item.price,
            priceDiscount: item.priceDiscount,
            status: item.status,
            subjectName: item.subjectName,
            totalStudent: item.totalStudent,
            userRating: item.userRating,
            code: item.code,
            teacherName: item.teacherName,
          }));
        })
      );
  }
}
