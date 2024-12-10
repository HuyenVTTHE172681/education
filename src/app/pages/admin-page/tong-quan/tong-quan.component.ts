import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../../services/classRoom.service';
import { IResponeList } from '../../../models/common.model';
import { ClassRoom } from '../../../models/classRoom.model';
import { CourseService } from '../../../services/course.service';
import { Subject as SubjectModel } from '../../../models/subject.model';
import { DashboardService } from '../../../services/dashboard.service';
import { Dashboard } from '../../../models/dashboard.model';
import { map } from 'rxjs/operators';
import { Teacher } from '../../../models/teacher.model';
import { TeacherService } from '../../../services/teacher.service';
import { Course, CourseYear } from '../../../models/course.model';

@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrl: './tong-quan.component.css'
})
export class TongQuanComponent implements OnInit {
  products: any;
  dateFilter: any | undefined;
  selectedDateFilter: any | undefined;
  page: number = 1;
  size: number = 1000;
  status: number = -1;
  searchText: string = '';
  classRoom: ClassRoom[] = [];
  adminCourse: any[] = [];
  selectedClassroom: string | undefined;
  subject: SubjectModel[] = [];
  selectedSubject: string | undefined;
  dashboard: Dashboard[] = [];
  dashboardFilterByDate: any = {};
  dashboardAdminCourseDetail: any = {};
  adviceRequest: any = {};
  filter: string = '';
  accountId: string = '';
  fromDate: string = '2024-12-01%2000:00:00';
  toDate: string = '2024-12-07%2023:59:59';
  dataChart: any;
  options: any;
  classRoomId: string = '';
  subjectIds: string = '';
  selectedCourse: string | undefined;
  selectedCourseYear: string | undefined;
  selectedTeacher: string | undefined;
  teacher: Teacher[] = [];
  courseYears: CourseYear[] = [];
  course: Course[] = [];
  callFromAdmin: number = 1;
  isPayment: number = -1;
  constructor(private classRoomSrv: ClassRoomService, private courseSrv: CourseService, private dashboardSrv: DashboardService, private teacherSrv: TeacherService) {

  }

  ngOnInit(): void {
    this.getClassRoom();
    this.getTeachers();
    this.getCourseYears();
    this.getAllKhoaHoc();

    this.getDashboard();
    this.getDashboardFilterByDate();
    this.getDashboardAdminCourse();
    this.getDashboardAdminCourseDetail();

    this.dateFilter = [
      { name: 'Hôm nay', code: 'day' },
      { name: 'Tuần nay', code: 'week' },
      { name: 'Tháng nay', code: 'month' },
      { name: 'Năm nay', code: 'year' },
    ];

    // Tổng quan giáo viên
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '2000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '3000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '4000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '300',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '40',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
    ];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataChart = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

  }

  getDashboardAdminCourseDetail() {
    this.dashboardSrv.getDashboardAdminCourseDetail(this.classRoomId, this.selectedCourse, this.selectedCourseYear, this.selectedSubject, this.selectedTeacher).subscribe({
      next: (data: IResponeList<any>) => {
        this.dashboardAdminCourseDetail = data.data.data;
        console.log("Admin course: ", this.dashboardAdminCourseDetail)
      }
    })
  }

  getDashboardAdminCourse() {
    this.dashboardSrv.getDashboardAdminCourse(this.page, this.size, this.filter, this.selectedClassroom, this.selectedSubject, this.accountId).subscribe({
      next: (data: IResponeList<any>) => {
        this.adminCourse = data.data.data;
        console.log("Admin course: ", this.adminCourse)
      }
    })
  }

  getDashboard() {
    this.dashboardSrv.getDashboardAdminOverview(this.page, this.size, this.filter, this.selectedClassroom, this.selectedSubject, this.accountId).subscribe({
      next: (data: IResponeList<Dashboard>) => {
        this.dashboard = data.data.data;
        console.log("Dashboad: ", this.dashboard);
      },
    });
  }

  getDashboardFilterByDate() {
    this.dashboardSrv.getDashboardFilterByDate(this.fromDate, this.toDate).subscribe({
      next: (data: any) => {
        this.dashboardFilterByDate = data.data.dashboardOverview;
        this.adviceRequest = data.data.adviceRequest;
        console.log("Dashboad: ", this.dashboardFilterByDate);
        console.log("Dashboad: ", this.adviceRequest);
      },
    })
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

  // Get subject
  getSubjectsByClassRoomId(classRoomId: string): void {
    this.courseSrv
      .getSubject(classRoomId, this.searchText, this.page, this.size)
      .subscribe({

        next: (response) => {
          this.subject = response;
        },
        error: () => {
          console.error('Error fetching subjects.');
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
}
