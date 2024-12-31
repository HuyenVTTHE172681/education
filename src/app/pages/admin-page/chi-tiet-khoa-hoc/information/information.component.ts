import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../../../../core/services/classRoom.service';
import { IResponseList } from '../../../../core/models/common.model';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { Teacher } from '../../../../core/models/teacher.model';
import { TeacherService } from '../../../../core/services/teacher.service';
import { CourseService } from '../../../../core/services/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course, CourseYear } from '../../../../core/models/course.model';
import { Subject } from '../../../../core/models/subject.model';
import { SubjectService } from '../../../../core/services/subject.service';
import { MessageService } from 'primeng/api';
import { CONSTANTS, HttpStatus } from '../../../../environments/constants';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  id: string | null = null;
  accountId: string | null = null;
  page: number = 0;
  size: number = 10000;
  searchText: string = '';
  classRoomId: string = '';

  classRoom: ClassRoom[] = [];
  teacher: Teacher[] = [];
  selectedTeachers: Teacher[] = [];
  courseYears: CourseYear[] = [];
  subject: Subject[] = [];
  status: number = -1;
  courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classRoomSrv: ClassRoomService,
    private teacherSrv: TeacherService,
    private courseSrv: CourseService,
    private subjectSrv: SubjectService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.courseForm = this.formBuilder.group({
      accountId: [],
      accountName: [],
      accounts: [],
      averageRating: [],
      classRoom: [],
      classRoomId: [],
      classRoomName: [],
      code: [],
      courseAvatar: [],
      courseBanner: [],
      courseInfo1: [],
      courseInfo2: [],
      courseRatingSummary: [],
      courseRatings: [],
      courseRelevants: [],
      courseSchedules: [],
      courseThumbnail: [],
      courseYearId: [],
      createdBy: [],
      createdDate: [],
      currentRate: [],
      id: [],
      isPassCourse: ['false'],
      isShowHome: [0],
      modifiedBy: [],
      modifiedDate: [],
      name: [],
      order: [0],
      price: [0],
      priceDiscount: [0],
      promotionTime: [],
      rating: [],
      shortSummary: [''],
      status: [0],
      studentNum: [],
      subject: [],
      subjectId: [],
      subjectName: [''],
      teacherId: [''],
      teacherName: [''],
      teachers: [[]],
      testUsers: [''],
      totalFiltered: [0],
      totalRating: [0],
      totalStudent: [0],
      userRating: [0]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.getCourseById(this.id);
    }
    this.getClassRoom();
    this.getTeachers();
    this.getCourseYears();
  }

  getSubjectsByClassRoomId(): void {
    this.subjectSrv
      .getSubjectByCourse(this.classRoomId, this.searchText, this.page, this.size)
      .subscribe({
        next: (response) => {
          this.subject = response?.data?.data || [];
        },
        error: (err) => {
          this.messageService.add({
            severity: 'danger',
            summary: err.message,
            detail: CONSTANTS.MESSAGE_ALERT.ERROR,
            key: 'br',
            life: 3000
          });
        },
      });
  }

  getCourseYears() {
    this.courseSrv.getCourseYear('', 0, 1000, -1).subscribe({
      next: (data) => {
        this.courseYears = data?.data?.data || [];
      }, error: (err) => {
        this.messageService.add({
          severity: 'danger',
          summary: err.message,
          detail: CONSTANTS.MESSAGE_ALERT.ERROR,
          key: 'br',
          life: 3000
        });
      },
    });
  }
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponseList<ClassRoom>) => {
          this.classRoom = data?.data?.data || [];
        },
      });
  }

  getTeachers() {
    this.teacherSrv
      .getTeachers(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponseList<Teacher>) => {
          this.teacher = data?.data?.data || [];

          this.courseForm.get('teacher')?.enable();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'danger',
            summary: err.message,
            detail: CONSTANTS.MESSAGE_ALERT.ERROR,
            key: 'br',
            life: 3000
          });
        },
      });
  }

  getCourseById(id: string, accountId: string = 'null') {
    this.courseSrv.getCourseById(id, accountId).subscribe({
      next: (data) => {
        if (data.statusCode === HttpStatus.OK) {
          const courseDetail = data?.data || [];
          this.patchForm(courseDetail);

          this.classRoomId = courseDetail?.classRoomId;
          this.getSubjectsByClassRoomId();
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'danger',
          summary: err.message,
          detail: CONSTANTS.MESSAGE_ALERT.ERROR,
          key: 'br',
          life: 3000
        });
      },
    });
  }

  patchForm(course: any) {
    this.courseForm.patchValue({
      accountId: course.accountId,
      accountName: course.accountName,
      accounts: course.accounts,
      averageRating: course.averageRating === 0,
      classRoom: course.classRoom,
      classRoomId: course.classRoomId,
      classRoomName: course.classRoomName,
      code: course.code,
      courseAvatar: course.courseAvatar,
      courseBanner: course.courseBanner,
      courseInfo1: course.courseInfo1,
      courseInfo2: course.courseInfo2,
      courseRatingSummary: course.courseRatingSummary,
      courseRatings: course.courseRatings,
      courseRelevants: course.courseRelevants,
      courseSchedules: course.courseSchedules,
      courseThumbnail: course.courseThumbnail,
      courseYearId: course.courseYearId,
      createdBy: course.createdBy,
      createdDate: course.createdDate,
      currentRate: course.currentRate,
      id: course.id,
      isPassCourse: course.isPassCourse,
      isShowHome: course.isShowHome === 1,
      modifiedBy: course.modifiedBy,
      modifiedDate: course.modifiedDate,
      name: course.name,
      order: course.order,
      price: course.price,
      priceDiscount: course.priceDiscount,
      promotionTime: course.promotionTime,
      rating: course.rating,
      shortSummary: course.shortSummary,
      status: course.status,
      studentNum: course.studentNum,
      subject: course.subject,
      subjectId: course.subjectId,
      subjectName: course.subjectName,
      teacherId: course.teacherId,
      teacherName: course.teacherName,
      teachers: course.teachers.map((teacher: Teacher) => teacher.id),
      testUsers: course.testUsers,
      totalFiltered: course.totalFiltered,
      totalRating: course.totalRating,
      totalStudent: course.totalStudent,
      userRating: course.userRating
    })

    this.selectedTeachers = course.teachers;
  }

  onTeacherChange(event: any): void {
    const selectedTeacherIds = this.courseForm.get('teachers')?.value || [];
    this.selectedTeachers = this.teacher.filter(teacher =>
      selectedTeacherIds.includes(teacher.id)
    );
  }

}
