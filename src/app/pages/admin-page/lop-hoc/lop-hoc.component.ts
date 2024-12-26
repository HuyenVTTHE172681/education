import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ClassRoom } from '../../../core/models/classRoom.model';
import { Router } from '@angular/router';
import { ClassRoomService } from '../../../core/services/classRoom.service';
import { MenuItem } from 'primeng/api';
import { STATUS } from '../../../environments/constants';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrl: './lop-hoc.component.css'
})
export class LopHocComponent implements OnInit {
  breadcrum: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];

  query = {
    filter: '',
    page: 1,
    size: 10,
  }

  totalItems: number = 0;
  classRoom: ClassRoom[] = [];
  selectedTeacher: any;

  roleList = [
    { name: 'Tất cả', value: '' },
    { name: 'Người dùng', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
    { name: 'Giáo viên', value: 'teacher' },
  ];
  selectedRole: any = this.roleList[0];
  dialogDelete: boolean = false;

  private searchSubject: Subject<string> = new Subject();
  constructor(private classRoomSrv: ClassRoomService, private router: Router) { }

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
            command: () => this.editClassRoom(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deletedClassRoom(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  addNewClassRoom() {
    this.router.navigate(['/quan-tri/lop-hoc/them-moi']);
  }
  editClassRoom() {
    this.router.navigate(['/quan-tri/lop-hoc/', this.selectedTeacher?.id]);
  }
  deletedClassRoom() {
    if (this.selectedTeacher) {
      this.dialogDelete = true;
    }
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
    this.selectedTeacher = classRoom;
    console.log("Course: ", this.selectedTeacher);
  }

  onMenuShow(menu: any) {
    if (this.selectedTeacher) {
      console.log('Selected File ID:', this.selectedTeacher.id);
    }
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

  handleDeleteClassroom() {
    if (this.selectedTeacher) {
      const accID = this.selectedTeacher?.id;
      console.log("Teacher id: ", accID)
      this.classRoomSrv.deleteClassRoom(accID).subscribe({
        next: () => {
          this.dialogDelete = false;
          alert("Xóa lớpb" + this.selectedTeacher?.name + " thanh cong");
          this.getClassRoom();
        },
        error: (err) => {
          alert("Lỗi xảy ra khi xóa. Vui lòng thử lại!")
        }
      })
    }
  }
}
