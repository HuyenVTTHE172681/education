import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../environments/constants';
import { IResponeList, IResponeListData } from '../models/common.model';
import { Course } from '../models/course.model';

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
            classRoomId: item.classRoomId,
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


  getCourseById(id: string): Observable<IResponeListData<Course>> {
    const apiURL = `${this.apiBaseUrl}/Course/GetCourseByIdCMS?id=${id}&accountId=null`;
    console.log('API URRL: ', apiURL);

    return this.http
      .get<IResponeListData<Course>>(apiURL)
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
