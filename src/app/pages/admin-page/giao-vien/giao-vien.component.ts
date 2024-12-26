import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Router } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models/teacher.model';
import { MenuItem } from 'primeng/api';
import { STATUS } from '../../../environments/constants';

@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrl: './giao-vien.component.css'
})
export class GiaoVienComponent implements OnInit {
  breadcrum: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  query = {
    filter: '',
    page: 1,
    size: 10
  }
  totalItems: number = 0;
  teacher: Teacher[] = [];
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
  constructor(private teacherSrv: TeacherService, private router: Router) { }

  ngOnInit(): void {
    this.initParams();
    this.getTeacher();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getTeacher();
    });
  }

  initParams() {
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
  }

  addNewTeacher() {
    this.router.navigate(['/quan-tri/giao-vien/them-moi']);
  }

  editAccount() {
    this.router.navigate(['/quan-tri/giao-vien/', this.selectedTeacher?.id]);
  }
  deletedAccount() {
    if (this.selectedTeacher) {
      this.dialogDelete = true;
      // console.log("Delete payement: ", this.selectedTeacher?.id);
    }
  }
  getTeacher() {
    this.teacherSrv.getTeachers(this.query.page, this.query.size, this.query.filter).subscribe((data) => {
      this.teacher = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Teacher: ", this.teacher);
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getTeacher();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.query.page = 1;
    this.getTeacher();
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.query.filter = '';
    this.query.page = 1;
    this.getTeacher();
  }

  setSelectedAccount(account: any) {
    this.selectedTeacher = account;
  }

  onStatusChange(event: any) {
    this.query.page = 1;
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
    return status === 1 ? STATUS.HIEN_THI : STATUS.AN;
  }

  handleDeleteTeacher() {
    if (this.selectedTeacher) {
      const accID = this.selectedTeacher?.id;
      this.teacherSrv.deleteTeacher(accID).subscribe({
        next: () => {
          this.dialogDelete = false;
          alert("Xóa giáo viên thành công");
          this.getTeacher();
        },
        error: (err) => {
          alert("Lỗi xảy ra khi xóa. Vui lòng thử lại!")
        }
      })
    }
  }

}
