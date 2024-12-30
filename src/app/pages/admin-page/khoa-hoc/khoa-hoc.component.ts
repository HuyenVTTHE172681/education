import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { Subject as SubjectModel } from '../../../core/models/subject.model';
import { IResponeList } from '../../../core/models/common.model';
import { Router } from '@angular/router';
import { ClassRoom } from '../../../core/models/classRoom.model';
import { Teacher } from '../../../core/models/teacher.model';
import { TeacherService } from '../../../core/services/teacher.service';
import { ClassRoomService } from '../../../core/services/classRoom.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SubjectService } from '../../../core/services/subject.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, STATUS } from '../../../environments/constants';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrl: './khoa-hoc.component.css',
})
export class KhoaHocComponent implements OnInit {
  course: Course[] = [];
  items: MenuItem[] = [];
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  query = {
    accountId: '',
    callFromAdmin: 1,
    classId: '',
    filter: '',
    isPayment: -1,
    page: 1,
    size: 10,
    status: -1,
    subjectId: '',
    teacherId: '',
    searchText: '',
  };
  totalItems: number = 0;
  selectedCourse: any = null;
  classRoom: ClassRoom[] = [];
  teacher: Teacher[] = [];
  subject: SubjectModel[] = [];

  selectedClassroom: string | undefined;
  selectedTeacher: string | undefined;
  selectedSubject: string | undefined;

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private courseSrv: CourseService, private router: Router, private classRoomSrv: ClassRoomService,
    private teacherSrv: TeacherService, private subjectSrv: SubjectService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initParams();
    this.getAllKhoaHoc();
    this.getClassRoom();
    this.getTeachers();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getAllKhoaHoc();
    });
  }

  initParams() {
    this.breadcrumb = [
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

  getSubjectsByClassRoomId(classRoomId: string): void {
    this.subjectSrv
      .getSubjectByCourse(classRoomId, this.query.searchText, this.query.page, this.query.size)
      .subscribe({
        next: (response) => {
          this.subject = response.data.data;
        },
        error: () => {
          console.error('Error fetching subjects.');
        },
      });
  }

  getTeachers() {
    this.teacherSrv
      .getTeachers(this.query.page, this.query.size, this.query.searchText)
      .subscribe({
        next: (data: IResponeList<Teacher>) => {
          this.teacher = data.data.data;

        },
        error: (err) => {
          console.log('Error loading teachers: ', err);
        },
      });
  }

  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.query.page, this.query.size, this.query.searchText)
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
    const documentId = this.selectedCourse?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_COURSE,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.courseSrv.deletedCourseList(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br', life: 3000
          });
          this.getClassRoom();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br', life: 3000
        });
      },
    })
  }

  getAllKhoaHoc(): void {
    this.courseSrv.getKhoaHoc(
      this.query.accountId,
      this.query.callFromAdmin,
      this.selectedClassroom || '',
      this.query.filter,
      this.query.isPayment,
      this.query.page,
      this.query.size,
      this.query.status,
      this.selectedSubject || '',
      this.selectedTeacher || ''
    ).subscribe({
      next: (data: IResponeList<Course>) => {
        this.course = data.data.data;
        this.totalItems = data.data.recordsTotal;
      }
    })
  }

  // Trigger search with debounce
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchCourse() {
    this.query.page = 1;
    this.getAllKhoaHoc();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedTeacher = undefined;
    this.selectedSubject = undefined;
    this.query.filter = '';
    this.query.page = 1; // Reset về trang đầu tiên
    this.getAllKhoaHoc(); // Gọi API để lấy lại dữ liệu ban đầu
  }

  setSelectedCourse(course: any) {
    this.selectedCourse = course;
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getAllKhoaHoc();
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
    return status === 1 ? STATUS.HIEN_THI : STATUS.AN;
  }


}
