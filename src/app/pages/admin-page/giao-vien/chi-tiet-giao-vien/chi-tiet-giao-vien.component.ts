import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, HttpStatus } from '../../../../environments/constants';
import { TeacherService } from '../../../../core/services/api-core/teacher.service';
import { DashboardService } from '../../../../core/services/api-core/dashboard.service';

@Component({
  selector: 'app-chi-tiet-giao-vien',
  templateUrl: './chi-tiet-giao-vien.component.html',
  styleUrl: './chi-tiet-giao-vien.component.css'
})
export class ChiTietGiaoVienComponent implements OnInit {
  id: string | null = null;
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  query = {
    filter: '',
    page: 1,
    size: 1000
  }
  teacherForm: FormGroup;
  accountsNotTeacher: any[] = [];
  selectedAccountsNotTeacher: any = null;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private dashboardSrv: DashboardService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.teacherForm = this.formBuilder.group({
      accountId: [''],
      address: [''],
      avatar: [''],
      averageRate: [0],
      birthday: [''],
      createdBy: [''],
      createdDate: [''],
      description: [''],
      descriptionShort: [''],
      email: ['', [Validators.required, Validators.email]],
      id: [''],
      identityNo: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      order: [''],
      phone: ['', [Validators.required]],
      status: [0],
      totalFiltered: [''],
      totalStudent: [0],
      userName: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.initParams();
    this.getAccountsNotTeacher();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEditMode = true;
        this.getTeacherDetail(this.id);
      } else {
        this.isEditMode = false;
        this.teacherForm.reset();
      }
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Giáo viên', routerLink: '/quan-tri/giao-vien' },
      { label: 'Chi tiết Giáo viên' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  // Lấy chi tiết tài khoản
  getTeacherDetail(id: string) {
    this.teacherSrv.getTeacherWithId(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const teacherDetail = data?.data || [];

        this.patchAccountForm(teacherDetail);
      }
    });
  }

  // Tách logic patch form
  patchAccountForm(teacher: any) {
    this.teacherForm.patchValue({
      accountId: teacher.accountId || '',
      address: teacher.address || '',
      avatar: teacher.avatar || '',
      averageRate: teacher.averageRate != null ? teacher.averageRate : 0, // Nếu null thì gán 0
      birthday: teacher.birthday ? new Date(teacher.birthday) : null,
      createdBy: teacher.createdBy,
      createdDate: teacher.createdDate ? new Date(teacher.createdDate) : null,
      description: teacher.description || '',
      descriptionShort: teacher.descriptionShort || '',
      email: teacher.email || '',
      id: teacher.id || '',
      identityNo: teacher.identityNo || '',
      modifiedBy: teacher.modifiedBy || '',
      modifiedDate: teacher.modifiedDate ? new Date(teacher.modifiedDate) : null,
      name: teacher.name,
      order: teacher.order,
      phone: teacher.phone || '',
      status: teacher.status === 1,
      totalFiltered: teacher.totalFiltered,
      totalStudent: teacher.totalStudent != null ? teacher.totalStudent : 0, // Nếu null thì gán 0
      userName: teacher.userName
    });
  }


  getAccountsNotTeacher() {
    this.dashboardSrv.getAccountsNotTeacher(this.query.filter, this.query.page, this.query.size).subscribe(
      (data) => {
        this.accountsNotTeacher = data?.data?.data || [];
      }
    )
  }

  updateAccount() {
    if (this.teacherForm.valid) {
      const formValue = { ...this.teacherForm.value };
      formValue.status = formValue.status ? 1 : 0;
      formValue.averageRate = formValue.averageRate ?? 0;
      formValue.totalStudent = formValue.totalStudent ?? 0;

      this.teacherSrv.updateTeacher(formValue).subscribe({
        next: (data) => {
          if (data.statusCode === HttpStatus.OK) {
            let detail = this.isEditMode ? CONSTANTS.MESSAGE_ALERT.UPDATE_FAIL : CONSTANTS.MESSAGE_ALERT.ADD_SUCCESSFUL
            let summary = this.isEditMode ? CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL : CONSTANTS.SUMMARY.SUMMARY_ADD_SUCCESSFUL

            this.messageService.add({
              severity: 'success',
              summary: summary,
              detail: detail,
              key: 'br',
              life: 3000
            });
            setTimeout(() => {
              this.router.navigate(['/quan-tri/giao-vien']);
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
    this.router.navigate(['/quan-tri/giao-vien']);
  }


}
