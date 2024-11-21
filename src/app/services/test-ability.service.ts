import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class TestAbilityService {
  apiBaseUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = API_URL.URL_API_CORE;
  }

  getTestAbility(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/test?IsShowInAbilityTest=1&classId&courseId&filter=&isFromCMS=0&offSet=0&pageSize=10&subjectId&testCategoryId=kiem-tra`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            accountsSpecial: item.accountsSpecial,
            avgRating: item.avgRating,
            commentConfiguration: item.commentConfiguration,
            courseId: item.courseId,
            courseScheduleId: item.courseScheduleId,
            createdBy: item.createdBy,
            createdDate: item.createdDate,
            deadlineDate: item.deadlineDate,
            description: item.description,
            id: item.id,
            isAutoSendMail: item.isAutoSendMail,
            isAutoSort: item.isAutoSort,
            isFree: item.isFree,
            isHaveTestUser: item.isHaveTestUser,
            isNotification: item.isNotification,
            isShowInAbilityTest: item.isShowInAbilityTest,
            isSpecial: item.isSpecial,
            isTestAttacked: item.isTestAttacked,
            isTestPass: item.isTestPass,
            isTestViewed: item.isTestViewed,
            lessonLink: item.lessonLink,
            livestreamAvatar: item.livestreamAvatar,
            livestreamCode: item.livestreamCode,
            livestreamDate: item.livestreamDate,
            livestreamGroup: item.livestreamGroup,
            livestreamLink: item.livestreamLink,
            livestreamTeacher: item.livestreamTeacher,
            modifiedBy: item.modifiedBy,
            modifiedDate: item.modifiedDate,
            name: item.name,
            numberOfTest: item.numberOfTest,
            numberQuestionPass: item.numberQuestionPass,
            order: item.order,
            pointShowLessonLink: item.pointShowLessonLink,
            quizzs: item.quizzs,
            relationTests: item.relationTests,
            remainMinute: item.remainMinute,
            status: item.status,
            time: item.time,
          }));
        })
      );
  }

  getClassrooms(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/ClassRoom?filter=&offSet=0&pageSize=1000`)
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            avatar: item.avatar,
            code: item.code,
            courseId: item.courseId,
            id: item.id,
            name: item.name,
            order: item.order,
            status: item.status,
            subjectId: item.subjectId,
            totalFiltered: item.totalFiltered,
          }));
        })
      );
  }

  getSubjects(): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/Subject?classId=-1&filter=&offSet=0&pageSize=1000`
      )
      .pipe(
        map((response) => {
          return response.data.data.map((item: any) => ({
            avatar: item.avatar,
            code: item.code,
            courseId: item.courseId,
            id: item.id,
            name: item.name,
            order: item.order,
            status: item.status,
            subjectId: item.subjectId,
            totalFiltered: item.totalFiltered,
          }));
        })
      );
  }
}
