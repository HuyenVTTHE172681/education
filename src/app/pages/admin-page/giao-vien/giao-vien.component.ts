import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DashboardService } from '../../../services/dashboard.service';
import { Router } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher.model';

@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrl: './giao-vien.component.css'
})
export class GiaoVienComponent implements OnInit {
  breadcrum: any[] = [];
  home: any = [];
  items: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 10;
  totalItems: number = 0;
  roleId: string = '';
  roleTypeDataId: string = '';
  teacher: Teacher[] = [];
  selectedAccount: any;
  roleList = [
    { name: 'Tất cả', value: '' },
    { name: 'Người dùng', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
    { name: 'Giáo viên', value: 'teacher' },
  ];
  selectedRole: any = this.roleList[0];
  dialogDelete: boolean = false;

  private searchSubject: Subject<string> = new Subject();
  constructor(private teacherSrv: TeacherService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacher();

    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Tài khoản' },
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
      this.getTeacher();
    });
  }

  editAccount() {
    this.router.navigate(['/quan-tri/tai-khoan/', this.selectedAccount?.id]);
  }
  deletedAccount() {
    if (this.selectedAccount) {
      this.dialogDelete = true;
      console.log("Delete payement: ", this.selectedAccount?.id);
    }
  }
  getTeacher() {
    this.teacherSrv.getTeachers(this.page, this.size, this.filter).subscribe((data) => {
      this.teacher = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Teacher: ", this.teacher);
    })
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getTeacher();
    console.log("Page: ", this.page);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.page = 1;
    this.getTeacher();
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.filter = '';
    this.page = 1;
    this.getTeacher();
  }

  setSelectedAccount(account: any) {
    this.selectedAccount = account;
    console.log("Course: ", this.selectedAccount);
  }

  onMenuShow(menu: any) {
    if (this.selectedAccount) {
      console.log('Selected File ID:', this.selectedAccount.id);
    }
  }

  onStatusChange(event: any) {
    this.page = 1;
    console.log('Trạng thái đã được chọn: ', this.selectedRole);
    this.getTeacher();
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

  handleDeleteAccount() {
    if (this.selectedAccount) {
      const accID = this.selectedAccount?.id;
      alert("Delete account but i don't have API delete" + accID);
      this.dialogDelete = false;
    }
  }

}
