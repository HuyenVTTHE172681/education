import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TeacherService } from '../../../../services/teacher.service';

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
  size: number = 10;
  teacherForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private formBuilder: FormBuilder
  ) {
    this.teacherForm = this.formBuilder.group({
      accountId: [''],
      address: [''],
      avatar: [''],
      averageRate: [''],
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
      totalStudent: [''],
      userName: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);

    if (this.id) {
      this.getTeacherDetail(this.id);
    }

    this.breadcrum = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Giáo viên', routerLink: '/quan-tri/giao-vien' },
      { label: 'Chi tiết Giáo viên' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
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
      averageRate: teacher.averageRate,
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
      totalStudent: teacher.totalStudent,
      userName: teacher.userName
    });
  }

  updateAccount() {
    if (this.teacherForm.valid) {
      const formValue = { ...this.teacherForm.value };

      // Convert `status` to number
      formValue.status = formValue.status ? 1 : 0;

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
      alert('Vui lòng kiểm tra thông tin đầu vào!');
    }
  }

  goBack() {
    this.router.navigate(['/quan-tri/giao-vien']);
  }

}
