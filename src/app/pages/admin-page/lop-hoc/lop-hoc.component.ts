import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ClassRoom } from '../../../core/models/classRoom.model';
import { Router } from '@angular/router';
import { ClassRoomService } from '../../../core/services/classRoom.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, STATUS } from '../../../environments/constants';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrl: './lop-hoc.component.css'
})
export class LopHocComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];

  query = {
    filter: '',
    page: 1,
    size: 10,
  }

  totalItems: number = 0;
  classRoom: ClassRoom[] = [];
  selectedClassroom: any;

  roleList = [
    { name: 'Tất cả', value: '' },
    { name: 'Người dùng', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
    { name: 'Giáo viên', value: 'teacher' },
  ];
  selectedRole: any = this.roleList[0];

  private searchSubject: Subject<string> = new Subject();
  constructor(
    private classRoomSrv: ClassRoomService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getClassRoom();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getClassRoom();
    });
  }

  initParams() {
    this.breadcrumb = [
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
            command: () => this.editClassRoom(), // Open sidebar on click
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

  addNewClassRoom() {
    this.router.navigate(['/quan-tri/lop-hoc/them-moi']);
  }
  editClassRoom() {
    this.router.navigate(['/quan-tri/lop-hoc/', this.selectedClassroom?.id]);
  }
  deleted() {
    const documentId = this.selectedClassroom?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_CLASSROOM,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.classRoomSrv.deleteClassRoom(documentId).subscribe((data) => {
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
  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.query.page, this.query.size, this.query.filter).subscribe((data) => {
      this.classRoom = data.data.data;
      this.totalItems = data.data.recordsTotal;
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getClassRoom();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.query.page = 1;
    this.getClassRoom();
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.query.filter = '';
    this.query.page = 1;
    this.getClassRoom();
  }

  setSelectedClassRoom(classRoom: any) {
    this.selectedClassroom = classRoom;
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getClassRoom();
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
