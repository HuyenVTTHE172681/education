import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Subject as SubjectModel } from '../../../../core/models/subject.model';
import { SubjectService } from '../../../../core/services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, STATUS } from '../../../../environments/constants';

@Component({
  selector: 'app-information-subject',
  templateUrl: './information-subject.component.html',
  styleUrl: './information-subject.component.css'
})
export class InformationSubjectComponent implements OnInit {
  breadcrum: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  query = {
    filter: '',
    page: 1,
    size: 10,
    courseId: ''
  }
  totalItems: number = 0;
  subject: SubjectModel[] = [];
  totalSubejct: number = 0;

  roleList = [
    { name: 'Tất cả', value: '' },
    { name: 'Người dùng', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
    { name: 'Giáo viên', value: 'teacher' },
  ];
  selectedRole: any = this.roleList[0];
  dialogDelete: boolean = false;
  selectedSubject: any = null;

  private searchSubject: Subject<string> = new Subject();
  constructor(
    private subjectSrv: SubjectService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.initParams();

    this.route.params.subscribe((params) => {
      this.query.courseId = params['id'];
      if (this.query.courseId) {
        this.getSubject(this.query.courseId);
      }
    });

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
    });
  }

  initParams() {
    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Lớp học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-check',
            command: () => this.edit(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  edit() {
    if (this.selectedSubject) {
      this.router.navigate(['/quan-tri/mon-hoc/', this.selectedSubject?.id]);
    }
  }
  deleted() {
    const documentId = this.selectedSubject?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_SUBJECT,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.subjectSrv.deleteSubject(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br', life: 3000
          });
          this.getSubject(this.query.courseId);
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

  getSubject(courseID: string) {
    this.subjectSrv.getSubjectByCourse(courseID, this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.subject = data.data.data;
      this.totalItems = data.data.recordsTotal;
      // console.log("Teacher: ", this.subject);
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    // console.log("Page: ", this.page);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.query.page = 1;
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.query.filter = '';
    this.query.page = 1;
  }

  setSelectedSubject(subject: any) {
    this.selectedSubject = subject;
    // console.log("Selected Subject: ", this.selectedSubject);
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    // console.log('Trạng thái đã được chọn: ', this.selectedRole);
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
