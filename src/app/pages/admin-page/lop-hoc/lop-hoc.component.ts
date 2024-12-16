import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ClassRoom } from '../../../models/classRoom.model';
import { Router } from '@angular/router';
import { ClassRoomService } from '../../../services/classRoom.service';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrl: './lop-hoc.component.css'
})
export class LopHocComponent implements OnInit {
  breadcrum: any[] = [];
  home: any = [];
  items: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 10;
  totalItems: number = 0;
  roleId: string = '';
  roleTypeDataId: string = '';
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
    this.getClassRoom();

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
            command: () => this.editAccount(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deletedAccount(), // Delete functionality (if needed)
          },
        ],
      },
    ];
    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1; // Reset to the first page for new search
      this.getClassRoom();
    });
  }

  addNewTeacher() {
    this.router.navigate(['/']);
  }
  editAccount() {
    this.router.navigate(['/quan-tri/giao-vien/', this.selectedTeacher?.id]);
  }
  deletedAccount() {
    if (this.selectedTeacher) {
      this.dialogDelete = true;
      console.log("Delete payement: ", this.selectedTeacher?.id);
    }
  }
  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.page, this.size, this.filter).subscribe((data) => {
      this.classRoom = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Teacher: ", this.classRoom);
    })
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getClassRoom();
    console.log("Page: ", this.page);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.page = 1;
    this.getClassRoom();
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.filter = '';
    this.page = 1;
    this.getClassRoom();
  }

  setSelectedAccount(account: any) {
    this.selectedTeacher = account;
    console.log("Course: ", this.selectedTeacher);
  }

  onMenuShow(menu: any) {
    if (this.selectedTeacher) {
      console.log('Selected File ID:', this.selectedTeacher.id);
    }
  }

  onStatusChange(event: any) {
    this.page = 1;
    console.log('Trạng thái đã được chọn: ', this.selectedRole);
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
    return status === 1 ? 'Hiển thị' : 'Ẩn';
  }

  handleDeleteTeacher() {
    // if (this.selectedTeacher) {
    //   const accID = this.selectedTeacher?.id;
    //   console.log("Teacher id: ", accID)
    //   this.teacherSrv.deleteTeacher(accID).subscribe({
    //     next: () => {
    //       this.dialogDelete = false;
    //       alert("Xóa giáo viên thành công");
    //       this.getTeacher();
    //     },
    //     error: (err) => {
    //       alert("Lỗi xảy ra khi xóa. Vui lòng thử lại!")
    //     }
    //   })
    // }
  }
}
