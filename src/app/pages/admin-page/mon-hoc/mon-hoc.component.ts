import { Component, OnInit } from '@angular/core';
import { Subject as SubjectModel } from '../../../core/models/subject.model';
import { Router } from '@angular/router';
import { ClassRoom } from '../../../core/models/classRoom.model';
import { debounceTime, Subject } from 'rxjs';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, STATUS } from '../../../common/constants';
import { UtilsService } from '../../../utils/utils.service';
import { ClassRoomService } from '../../../core/services/api-core/classRoom.service';
import { SubjectService } from '../../../core/services/api-core/subject.service';
@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrl: './mon-hoc.component.css'
})
export class MonHocComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  query = {
    page: 0,
    size: 10,
    filter: '',
  }
  subject: SubjectModel[] = [];
  selectedSubject: any = null;
  totalItems: number = 0;

  // ClassRoom
  searchText: string = '';
  classRoom: ClassRoom[] = [];
  selectedClassroom: string | undefined;
  private searchSubject: Subject<string> = new Subject();

  constructor(
    private router: Router,
    private classRoomSrv: ClassRoomService,
    private subjectSrv: SubjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initParams();
    this.getClassRoom();
    this.getSubject();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getSubject();
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
            command: () => this.editSubject(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deletedSubject(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  editSubject() {
    this.router.navigate(['/quan-tri/mon-hoc', this.selectedSubject?.id]);
  }

  deletedSubject() {

    const documentId = this.selectedSubject?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_MON_HOC,
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
          this.getSubject();
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

  setSelectedSubject(subject: any) {
    this.selectedSubject = subject;
  }

  getSubject() {
    this.subjectSrv.getSubjectByCourse(this.selectedClassroom || '', this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.subject = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
    })
  }

  getClassRoomNames(subject: any): string {
    if (subject?.classRooms && subject.classRooms.length > 0) {
      return subject.classRooms.map((classRoom: any) => classRoom.name).join(', ');
    }
    return '---';
  }


  // Pagination
  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getSubject();
  }

  // Get ClassRoom to dropdown list filter Subject
  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.query.page, this.query.size, this.searchText).subscribe((data) => {
      this.classRoom = data?.data?.data || [];
    })
  }

  // Search
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }
  searchCourse() {
    this.query.page = 1;
    this.getSubject();
  }
  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;
    this.query.filter = '';
    this.query.page = 1;
    this.getSubject();
  }

  addSubject() {
    this.router.navigate(['/quan-tri/mon-hoc/them-moi'])
  }

}
