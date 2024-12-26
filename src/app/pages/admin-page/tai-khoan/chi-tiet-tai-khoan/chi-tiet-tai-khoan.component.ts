import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chi-tiet-tai-khoan',
  templateUrl: './chi-tiet-tai-khoan.component.html',
  styleUrl: './chi-tiet-tai-khoan.component.css'
})
export class ChiTietTaiKhoanComponent implements OnInit {
  id: string | null = null;
  breadcrum: MenuItem[] = [];
  home: MenuItem | undefined;
  roleData: any[] = [];
  role: any[] = [];
  query = {
    filter: '',
    page: 1,
    size: 10
  }
  accountForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardSrv: DashboardService,
    private formBuilder: FormBuilder
  ) {
    this.accountForm = this.formBuilder.group({
      address: [''],
      avatar: [''],
      birthday: [''],
      className: [''],
      createBy: [''],
      createDate: [''],
      email: ['', [Validators.required, Validators.email]],
      id: [''],
      identityNo: [''],
      isActive: [false],
      memberIds: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      oldPassword: [''],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      roleDescription: [''],
      roleId: [''],
      roleName: [''],
      roleTypeDataId: [''],
      roleTypeDataName: [''],
      status: [0],
      userId: [''],
      userName: ['', [Validators.required]],
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
    this.dashboardSrv.getRole(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      if (data.statusCode === 200) {
        this.role = data.data.data;
      }
    })
  }

  // Lấy danh sách kiểu vai trò
  getRoleDataType() {
    this.dashboardSrv.getRoleDataType(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      if (data.statusCode === 200) {
        this.roleData = data.data.data;
      }
    })
  }


  // Lấy chi tiết tài khoản
  getAccountDetail(id: string) {
    this.dashboardSrv.getAccountDetail(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const accountDetail = data.data;

        console.log("Account detail 1: ", accountDetail);
        console.log("Account detail test mapping: ", this.role.find((role: any) => role.id === accountDetail.roleId)?.name);
        this.patchAccountForm(accountDetail);
      }
    });
  }

  // Tách logic patch form
  patchAccountForm(account: any) {
    this.accountForm.patchValue({
      address: account.address || '',
      avatar: account.avatar || '',
      birthday: account.birthday ? new Date(account.birthday) : null,
      className: account.className || '',
      createBy: account.createBy || '',
      createDate: account.createDate || '',
      email: account.email || '',
      id: account.id || '',
      identityNo: account.identityNo || '',
      isActive: account.isActive || false,
      memberIds: account.memberIds || '',
      modifiedBy: account.modifiedBy || '',
      modifiedDate: account.modifiedDate ? new Date(account.modifiedDate) : null,
      name: account.name || '',
      oldPassword: account.oldPassword || '',
      password: account.password || '',
      phone: account.phone || '',
      roleDescription: account.roleDescription || '',
      roleId: account.roleId || '',
      roleName: account.roleName || '',
      roleTypeDataId: account.roleTypeDataId || '',
      roleTypeDataName: account.roleTypeDataName || '',
      status: account.status === 1,
      userId: account.userId || '',
      userName: account.userName || '',
    });
  }

  updateAccount() {
    if (this.accountForm.valid) {
      const formValue = { ...this.accountForm.value };

      // Ensure `roleId` is sent as a simple string (e.g., "admin")
      if (formValue.roleId && typeof formValue.roleId === 'object') {
        formValue.roleId = formValue.roleId.value;
      }

      //roleTypeDataName 
      if (formValue.roleTypeDataName && typeof formValue.roleTypeDataName === 'object') {
        formValue.roleTypeDataName = formValue.roleTypeDataName.value;
      }

      // Convert `status` to number
      formValue.status = formValue.status ? 1 : 0;

      this.dashboardSrv.updateAccount(formValue).subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            alert('Cập nhật tài khoản thành công!');
            this.router.navigate(['/quan-tri/tai-khoan']);
          } else if (data.statusCode === 500) {
            alert(data.message);
          }
        },
        error: (err) => {
          console.error('Error updating account:', err);
          alert('Có lỗi xảy ra. Vui lòng thử lại!');
        },
      });
    } else {
      alert('Vui lòng kiểm tra thông tin đầu vào!');
    }
  }

  goBack() {
    this.router.navigate(['/quan-tri/tai-khoan']);
  }

}
