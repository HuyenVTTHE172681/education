import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { Subject } from '../../../models/subject.model';
import { IResponeList } from '../../../models/common.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrl: './khoa-hoc.component.css',
})
export class KhoaHocComponent implements OnInit {
  course: Course[] = [];
  items: any[] = [];
  breadcrum: any[] = [];
  home: any = [];
  accountId: string = '';
  callFromAdmin: number = 1;
  classId: string = '';
  filter: string = '';
  isPayment: number = -1;
  page: number = 1;
  size: number = 10;
  status: number = -1;
  subjectId: string = '';
  teacherId: string = '';
  totalItems: number = 0;

  selectedCourse: any = null;
  dialogDelete: boolean = false;

  constructor(private courseSrv: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllKhoaHoc();

    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Khóa học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.editCourse(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deletedCourse(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  editCourse() {
    this.router.navigate(['/quan-tri/chi-tiet-khoa-hoc', this.selectedCourse?.id]);
  }

  deletedCourse() {
    if (this.selectedCourse) {
      this.dialogDelete = true;
      console.log("Delete course: ", this.selectedCourse?.id);
    }
  }

  getAllKhoaHoc(): void {
    this.courseSrv.getKhoaHoc(this.accountId, this.callFromAdmin, this.classId, this.filter, this.isPayment, this.page, this.size, this.status, this.subjectId, this.teacherId).subscribe({
      next: (data: IResponeList<Course>) => {
        this.course = data.data.data;
        this.totalItems = data.data.recordsTotal;
        console.log("Course: ", this.course)
      }
    })
  }

  setSelectedCourse(course: any) {
    this.selectedCourse = course;
    console.log("Course: ", this.selectedCourse);
  }

  onMenuShow(menu: any) {
    if (this.selectedCourse) {
      console.log('Selected File ID:', this.selectedCourse.id);
    }
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllKhoaHoc();
    console.log("Page: ", this.page);
  }

  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'primary';

      case 0:
        return 'danger';

      default:
        return 'warning';
    }
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'Hiển thị' : 'Ẩn';
  }

  handleDeleteCourse() {
    if (this.selectedCourse) {
      const courseID = this.selectedCourse.id;

      this.courseSrv.deletedCourseList(courseID).subscribe({
        next: () => {
          this.dialogDelete = false;
          this.getAllKhoaHoc(); // Làm mới dữ liệu
          alert('Xóa chương trình học thành công!');
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          alert('Có lỗi xảy ra khi xóa. Vui lòng thử lại!');
        },
      })

    }
  }
}
