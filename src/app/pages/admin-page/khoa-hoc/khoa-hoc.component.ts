import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { Subject as SubjectModel } from '../../../models/subject.model';
import { IResponeList } from '../../../models/common.model';
import { Router } from '@angular/router';
import { ClassRoom } from '../../../models/classRoom.model';
import { Teacher } from '../../../models/teacher.model';
import { TeacherService } from '../../../services/teacher.service';
import { ClassRoomService } from '../../../services/classRoom.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrl: './khoa-hoc.component.css',
})
export class KhoaHocComponent implements OnInit {
  course: Course[] = [];
  items: any[] = [];
  breadcrum: any[] = [];
  members: any[] = [];
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
  searchText: string = '';


  selectedCourse: any = null;
  dialogDelete: boolean = false;
  classRoom: ClassRoom[] = [];
  teacher: Teacher[] = [];
  subject: SubjectModel[] = [];

  selectedClassroom: string | undefined;
  selectedTeacher: string | undefined;
  selectedSubject: string | undefined;

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private courseSrv: CourseService, private router: Router, private classRoomSrv: ClassRoomService,
    private teacherSrv: TeacherService,) { }

  ngOnInit(): void {
    this.getAllKhoaHoc();
    this.getClassRoom();
    this.getTeachers();

    this.members = [
      { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];


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

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1; // Reset to the first page for new search
      this.getAllKhoaHoc();
    });
  }

  getSubjectsByClassRoomId(classRoomId: string): void {
    this.courseSrv
      .getSubject(classRoomId, this.searchText, this.page, this.size)
      .subscribe({
        next: (response) => {
          // console.log('API Response of Subject:', response);
          this.subject = response;
        },
        error: () => {
          console.error('Error fetching subjects.');
        },
      });
  }

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

  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<ClassRoom>) => {
          this.classRoom = data.data.data;
        },
      });
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
    this.courseSrv.getKhoaHoc(
      this.accountId,
      this.callFromAdmin,
      this.selectedClassroom || '',
      this.filter,
      this.isPayment,
      this.page,
      this.size,
      this.status,
      this.selectedSubject || '',
      this.selectedTeacher || ''
    ).subscribe({
      next: (data: IResponeList<Course>) => {
        this.course = data.data.data;
        this.totalItems = data.data.recordsTotal;
        console.log("Course: ", this.course)
      }
    })
  }

  // Trigger search with debounce
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchCourse() {
    this.page = 1;
    this.getAllKhoaHoc();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedTeacher = undefined;
    this.selectedSubject = undefined;
    this.filter = '';
    this.page = 1; // Reset về trang đầu tiên
    this.getAllKhoaHoc(); // Gọi API để lấy lại dữ liệu ban đầu
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
