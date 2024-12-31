import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../../../core/services/classRoom.service';
import { CourseService } from '../../../../core/services/course.service';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { TeacherService } from '../../../../core/services/teacher.service';
import { IResponseList } from '../../../../core/models/common.model';
import { Subject as SubjectModel } from '../../../../core/models/subject.model';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { Course, CourseYear } from '../../../../core/models/course.model';
import { Teacher } from '../../../../core/models/teacher.model';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../core/services/subject.service';

@Component({
  selector: 'app-dashboard-course-detail',
  templateUrl: './dashboard-course-detail.component.html',
  styleUrl: './dashboard-course-detail.component.css'
})
export class DashboardCourseDetailComponent implements OnInit {
  dashboardAdminCourseDetail: any = {};
  subject: SubjectModel[] = [];
  classRoom: ClassRoom[] = [];
  course: Course[] = [];
  courseYears: CourseYear[] = [];
  teacher: Teacher[] = [];
  query = {
    searchText: '',
    page: 1,
    size: 1000,
    status: -1,
    callFromAdmin: 1,
    isPayment: -1,
    accountId: '',
  }
  selectedClassroom: string | undefined;
  selectedCourse: string | undefined;
  selectedCourseYear: string | undefined;
  selectedTeacher: string | undefined;
  selectedSubject: string | undefined;

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private classRoomSrv: ClassRoomService, private courseSrv: CourseService, private dashboardSrv: DashboardService, private teacherSrv: TeacherService, private subjectSrv: SubjectService) {

  }

  ngOnInit(): void {
    this.getClassRoom();
    this.getAllKhoaHoc();
    this.getCourseYears();
    this.getTeachers();
    this.getDashboardAdminCourseDetail();
  }

  getDashboardAdminCourseDetail() {
    this.dashboardSrv.getDashboardAdminCourseDetail(this.selectedClassroom || '', this.selectedCourse || '', this.selectedCourseYear || '', this.selectedSubject || '', this.selectedTeacher || '').subscribe({
      next: (data: IResponseList<any>) => {
        this.dashboardAdminCourseDetail = data?.data?.data || [];
        // console.log("Admin course: ", this.dashboardAdminCourseDetail)
      }
    })
  }

  // Get subject
  getSubjectsByClassRoomId(classRoomId: string): void {
    this.subjectSrv
      .getSubjectByCourse(classRoomId, this.query.searchText, this.query.page, this.query.size)
      .subscribe({

        next: (response) => {
          this.subject = response.data.data;
        },
        error: () => {
          // console.error('Error fetching subjects.');
          alert('Error fetching subjects.');
        },
      });
  }

  // Get classrom
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.query.page, this.query.size, this.query.searchText)
      .subscribe({
        next: (data: IResponseList<ClassRoom>) => {
          this.classRoom = data?.data?.data || [];
        },
      });
  }

  // Get khóa học
  getAllKhoaHoc(): void {
    this.courseSrv.getKhoaHoc(
      this.query.accountId,
      this.query.callFromAdmin,
      this.selectedClassroom || '',
      this.query.searchText,
      this.query.isPayment,
      this.query.page,
      this.query.size,
      this.query.status,
      this.selectedSubject || '',
      this.selectedTeacher || ''
    ).subscribe({
      next: (data: IResponseList<Course>) => {
        this.course = data?.data?.data || [];
        // console.log("Course: ", this.course)
      }
    })
  }

  // Get course year
  getCourseYears() {
    this.courseSrv.getCourseYear(this.query.searchText, this.query.page, this.query.size, this.query.status).subscribe({
      next: (data) => {
        this.courseYears = data?.data?.data || [];
        // console.log('Course Years:', this.courseYears);
      },
      error: (err) => {
        alert('Error loading course years.');
      },
    });
  }

  // Get teacher
  getTeachers() {
    this.teacherSrv
      .getTeachers(this.query.page, this.query.size, this.query.searchText)
      .subscribe({
        next: (data: IResponseList<Teacher>) => {
          this.teacher = data?.data?.data || [];
        },
        error: (err) => {
          alert('Error loading teachers.');
        },
      });
  }


  searchCourse(): void {
    this.getDashboardAdminCourseDetail(); // Gọi lại API tìm kiếm
  }


  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedCourse = undefined;
    this.selectedCourseYear = undefined;
    this.selectedSubject = undefined;
    this.selectedTeacher = undefined;


    this.getDashboardAdminCourseDetail();
  }

}
