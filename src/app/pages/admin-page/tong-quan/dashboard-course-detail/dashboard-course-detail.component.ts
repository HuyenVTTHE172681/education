import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { CourseService } from '../../../../services/course.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { TeacherService } from '../../../../services/teacher.service';
import { IResponeList } from '../../../../models/common.model';
import { Subject as SubjectModel } from '../../../../models/subject.model';
import { ClassRoom } from '../../../../models/classRoom.model';
import { Course, CourseYear } from '../../../../models/course.model';
import { Teacher } from '../../../../models/teacher.model';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../services/subject.service';

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
  searchText: string = '';
  page: number = 1;
  size: number = 1000;
  status: number = -1;
  callFromAdmin: number = 1;
  isPayment: number = -1;
  accountId: string = '';
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
      next: (data: IResponeList<any>) => {
        this.dashboardAdminCourseDetail = data.data.data;
        console.log("Admin course: ", this.dashboardAdminCourseDetail)
      }
    })
  }

  // Get subject
  getSubjectsByClassRoomId(classRoomId: string): void {
    this.subjectSrv
      .getSubjectByCourse(classRoomId, this.searchText, this.page, this.size)
      .subscribe({

        next: (response) => {
          this.subject = response.data.data;
        },
        error: () => {
          console.error('Error fetching subjects.');
        },
      });
  }

  // Get classrom
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<ClassRoom>) => {
          this.classRoom = data.data.data;
        },
      });
  }

  // Get khóa học
  getAllKhoaHoc(): void {
    this.courseSrv.getKhoaHoc(
      this.accountId,
      this.callFromAdmin,
      this.selectedClassroom || '',
      this.searchText,
      this.isPayment,
      this.page,
      this.size,
      this.status,
      this.selectedSubject || '',
      this.selectedTeacher || ''
    ).subscribe({
      next: (data: IResponeList<Course>) => {
        this.course = data.data.data;
        console.log("Course: ", this.course)
      }
    })
  }

  // Get course year
  getCourseYears() {
    this.courseSrv.getCourseYear(this.searchText, this.page, this.size, this.status).subscribe({
      next: (data) => {
        this.courseYears = data;
        console.log('Course Years:', this.courseYears);
      },
      error: (err) => {
        console.error('Error loading course years:', err);
      },
    });
  }

  // Get teacher
  getTeachers() {
    this.teacherSrv
      .getTeachers(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<Teacher>) => {
          this.teacher = data.data.data;
          console.log('Teacher: ', this.teacher);

        },
        error: (err) => {
          console.log('Error loading teachers: ', err);
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
