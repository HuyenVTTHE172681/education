import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TeacherService } from '../../../../services/teacher.service';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-chi-tiet-giao-vien',
  templateUrl: './chi-tiet-giao-vien.component.html',
  styleUrl: './chi-tiet-giao-vien.component.css'
})
export class ChiTietGiaoVienComponent implements OnInit {
  id: string | null = null;
  breadcrum: any[] = [];
  home: MenuItem | undefined;
  roleData: any[] = [];
  role: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 1000;
  teacherForm: FormGroup;
  accountsNotTeacher: any[] = [];
  selectedAccountsNotTeacher: any = null;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private dashboardSrv: DashboardService,
    private formBuilder: FormBuilder
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
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);

    if (this.id) {
      this.isEditMode = true;
      this.getTeacherDetail(this.id);
    } else {
      this.isEditMode = false;
      this.teacherForm.reset();
    }

    this.breadcrum = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Giáo viên', routerLink: '/quan-tri/giao-vien' },
      { label: 'Chi tiết Giáo viên' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };

    this.getAccountsNotTeacher();
  }

  // Lấy chi tiết tài khoản
  getTeacherDetail(id: string) {
    this.teacherSrv.getTeacherWithId(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const teacherDetail = data.data;

        console.log("Account detail 1: ", teacherDetail);
        this.patchAccountForm(teacherDetail);
        console.log("Form value: ", this.teacherForm.value);
      }
    });
  }

  // Tách logic patch form
  patchAccountForm(teacher: any) {
    this.teacherForm.patchValue({
      accountId: teacher.accountId,
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
    this.dashboardSrv.getAccountsNotTeacher(this.filter, this.page, this.size).subscribe(
      (data) => {
        this.accountsNotTeacher = data.data.data;
        console.log("Accounts not teacher: ", this.accountsNotTeacher);
      }
    )
  }

  updateAccount() {
    if (this.teacherForm.valid) {
      const formValue = { ...this.teacherForm.value };
      formValue.status = formValue.status ? 1 : 0;
      formValue.averageRate = formValue.averageRate ?? 0;
      formValue.totalStudent = formValue.totalStudent ?? 0;

      if (this.isEditMode === true) {
        this.teacherSrv.updateTeacher(formValue).subscribe({
          next: (data) => {
            if (data.statusCode === 200) {
              alert('Cập nhật tài khoản thành công!');
              this.router.navigate(['/quan-tri/giao-vien']);
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
        if (this.teacherForm.invalid) {
          console.log("Form errors: ", this.teacherForm.errors);
          console.log("Form field errors: ", this.teacherForm.controls);
          alert('Vui lòng kiểm tra thông tin đầu vào!');
        } else {
          this.teacherSrv.addTeacher(formValue).subscribe({
            next: (data) => {
              if (data.statusCode === 200) {
                alert('Thêm tài khoản thành công!');
                this.router.navigate(['/quan-tri/giao-vien']);
              } else if (data.statusCode === 500) {
                alert(data.message);
              }
            },
            error: (err) => {
              console.error('Error adding account:', err);
              alert('Có lỗi xảy ra. Vui lòng thử lại!');
            },
          });
        }
      }
    } else {
      // In ra các lỗi cụ thể trong form khi nó không hợp lệ
      console.log("Form is invalid", this.teacherForm.errors);
      console.log("Form control errors:", this.teacherForm.controls);
      alert('Vui lòng kiểm tra thông tin đầu vào!');
    }
  }

  goBack() {
    this.router.navigate(['/quan-tri/giao-vien']);
  }

  onAccountSelect(event: any) {
    if (!this.isEditMode) { // Chỉ xử lý khi đang ở add mode
      const selectedAccount = event.value;

      if (selectedAccount) {
        this.teacherForm.patchValue({
          accountId: selectedAccount.id,
          name: selectedAccount.name || '',
          email: selectedAccount.email || '',
          phone: selectedAccount.phone || '',
          address: selectedAccount.address || '',
          identityNo: selectedAccount.identityNo || '',
          userName: selectedAccount.userName || '',
          avatar: selectedAccount.avatar || '',
        });
      } else {
        // Nếu không có tài khoản nào được chọn
        this.teacherForm.reset();
      }
    }
  }
}
