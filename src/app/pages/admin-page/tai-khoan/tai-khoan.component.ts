import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { User } from '../../../models/user.model';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tai-khoan',
  templateUrl: './tai-khoan.component.html',
  styleUrl: './tai-khoan.component.css'
})
export class TaiKhoanComponent implements OnInit {
  breadcrum: MenuItem[] | undefined;
  home: MenuItem | undefined;
  items: any[] = [];

  filter: string = '';
  page: number = 1;
  size: number = 10;
  
  totalItems: number = 0;
  roleId: string = '';
  roleTypeDataId: string = '';
  account: User[] = [];
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
  constructor(private dashboardSrv: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.getDashboardAccount();

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
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => this.editAccount(), // Open sidebar on click
          },
          {
            label: 'Xóa tài khoản',
            icon: 'pi pi-trash',
            command: () => this.deletedAccount(), // Delete functionality (if needed)
          },
        ],
      },
    ];
    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1;
      this.getDashboardAccount();
    });
  }

  editAccount() {
    this.router.navigate(['/quan-tri/tai-khoan/', this.selectedAccount?.id]);
  }
  deletedAccount() {
    if (this.selectedAccount) {
      this.dialogDelete = true;
      // console.log("Delete payement: ", this.selectedAccount?.id);
    }
  }
  getDashboardAccount() {
    this.dashboardSrv.getDashboardAccount(this.filter, this.page, this.size, this.selectedRole.value || '', this.selectedRole.value || '').subscribe((data) => {
      this.account = data.data.data;
      this.totalItems = data.data.recordsTotal;
      // console.log("Payment: ", this.account);
    })
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getDashboardAccount();
    // console.log("Page: ", this.page);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.page = 1;
    this.getDashboardAccount();
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.filter = '';
    this.page = 1;
    this.getDashboardAccount();
  }

  setSelectedAccount(account: any) {
    this.selectedAccount = account;
    // console.log("Course: ", this.selectedAccount);
  }

  onStatusChange(event: any) {
    this.page = 1;
    // console.log('Trạng thái đã được chọn: ', this.selectedRole);
    this.getDashboardAccount();
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
    return status === 1 ? 'Đang hoạt động' : 'Dừng hoạt động';
  }

  handleDeleteAccount() {
    if (this.selectedAccount) {
      const accID = this.selectedAccount?.id;
      alert("Delete account but i don't have API delete" + accID);
      this.dialogDelete = false;
    }
  }

}
