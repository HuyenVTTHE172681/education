import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS, HttpStatus } from '../../../../environments/constants';
import { DashboardService } from '../../../../core/services/api-core/dashboard.service';

@Component({
  selector: 'app-chi-tiet-tai-khoan',
  templateUrl: './chi-tiet-tai-khoan.component.html',
  styleUrl: './chi-tiet-tai-khoan.component.css'
})
export class ChiTietTaiKhoanComponent implements OnInit {
  id: string | null = null;
  breadcrumb: MenuItem[] = [];
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
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    // Init form
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
    if (this.id) {
      this.getAccountDetail(this.id);
    }

    this.getRole();
    this.getRoleDataType();
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Tài khoản', routerLink: '/quan-tri/tai-khoan' },
      { label: 'Chi tiết tài khoản' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  getRole() {
    this.dashboardSrv.getRole(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        this.role = data?.data?.data || [];
      }
    })
  }

  getRoleDataType() {
    this.dashboardSrv.getRoleDataType(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        this.roleData = data?.data?.data || [];
      }
    })
  }

  getAccountDetail(id: string) {
    this.dashboardSrv.getAccountDetail(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const accountDetail = data?.data || [];
        this.patchAccountForm(accountDetail);
      }
    });
  }

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
      formValue.status = formValue.status ? 1 : 0;

      // Ensure `roleId` is sent as a simple string (e.g., "admin")
      if (formValue.roleId && typeof formValue.roleId === 'object') {
        formValue.roleId = formValue.roleId.value;
      }

      //roleTypeDataName 
      if (formValue.roleTypeDataName && typeof formValue.roleTypeDataName === 'object') {
        formValue.roleTypeDataName = formValue.roleTypeDataName.value;
      }

      this.dashboardSrv.updateAccount(formValue).subscribe({
        next: (data) => {
          if (data.statusCode === HttpStatus.OK) {
            this.messageService.add({
              severity: 'success',
              summary: CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL,
              detail: CONSTANTS.MESSAGE_ALERT.UPDATE_FAIL,
              key: 'br',
              life: 3000
            });
            setTimeout(() => {
              this.router.navigate(['/quan-tri/tai-khoan']);
            }, 1000);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'info',
            summary: err.message,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_FAIL,
            key: 'br',
            life: 3000
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: CONSTANTS.SUMMARY.SUMMARY_INVALID_DATA,
        detail: CONSTANTS.MESSAGE_ALERT.INVALID_DATA,
        key: 'br',
        life: 3000
      });
    }
  }

  goBack() {
    this.router.navigate(['/quan-tri/tai-khoan']);
  }

}
