import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DashboardService } from '../../../../services/dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-chi-tiet-tai-khoan',
  templateUrl: './chi-tiet-tai-khoan.component.html',
  styleUrl: './chi-tiet-tai-khoan.component.css'
})
export class ChiTietTaiKhoanComponent implements OnInit {
  id: string | null = null;
  breadcrum: any[] = [];
  home: MenuItem | undefined;
  roleData: any[] = [];
  role: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 10;
  accountForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardSrv: DashboardService,
    private formBuilder: FormBuilder
  ) {
    this.accountForm = this.formBuilder.group({
      id: [''],
      avatar: [''],
      userName: [''],
      password: [''],
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      className: [''],
      birthday: [''],
      roleId: [''],
      roleTypeDataName: [''],
      status: [false] // Mặc định là `false`
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);

    if (this.id) {
      this.getAccountDetail(this.id);
    }

    this.getRole();
    this.getRoleDataType();

    this.breadcrum = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Tài khoản', routerLink: '/quan-tri/tai-khoan' },
      { label: 'Chi tiết tài khoản' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  // Lấy danh sách vai trò
  getRole() {
    this.dashboardSrv.getRole(this.filter, this.page, this.size).subscribe((data) => {
      this.role = data.data.data.map((item: any) => ({
        label: item.name, // Hiển thị tên role
        value: item.id
      }));
      console.log("Role list: ", this.role);
    });
  }

  // Lấy danh sách kiểu vai trò
  getRoleDataType() {
    this.dashboardSrv.getRoleDataType(this.filter, this.page, this.size).subscribe((data) => {
      this.roleData = data.data.data.map((item: any) => ({
        label: item.name, // Hiển thị tên roleData
        value: item.id
      }));
      console.log("Role Data list: ", this.roleData);
    });
  }

  // Lấy chi tiết tài khoản
  getAccountDetail(id: string) {
    this.dashboardSrv.getAccountDetail(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const accountDetail = data.data;
        this.patchAccountForm(accountDetail);
        console.log("Form value: ", this.accountForm.value);
      }
    });
  }

  // Tách logic patch form
  patchAccountForm(account: any) {
    this.accountForm.patchValue({
      id: account.id,
      avatar: account.avatar,
      userName: account.userName,
      password: account.password,
      name: account.name,
      email: account.email,
      phone: account.phone,
      address: account.address,
      className: account.className,
      birthday: account.birthday ? new Date(account.birthday) : null, // Chuyển đổi ngày
      roleId: account.roleId,
      roleTypeDataName: account.roleTypeDataName,
      status: account.status === 1 // Bật switch nếu status = 1
    });
  }
}
