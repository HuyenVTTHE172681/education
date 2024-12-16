import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { ClassRoom } from '../../../../models/classRoom.model';

@Component({
  selector: 'app-infomation-classroom',
  templateUrl: './infomation-classroom.component.html',
  styleUrl: './infomation-classroom.component.css'
})
export class InfomationClassroomComponent implements OnInit {
  id: string | null = null;
  breadcrum: any[] = [];
  roleData: any[] = [];
  role: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 10;
  classRoomForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classRoomSrv: ClassRoomService,
    private formBuilder: FormBuilder
  ) {
    this.classRoomForm = this.formBuilder.group({
      avatar: [''],
      code: [''],
      courseId: [''],
      createdBy: [''],
      id: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
      status: [0, [Validators.required]],
      subjectId: [''],
      totalFiltered: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);

    if (this.id) {
      this.getClassRoomDetail(this.id);
    }
  }

  // Lấy chi tiết tài khoản
  getClassRoomDetail(id: string) {
    this.classRoomSrv.getClassRoomWithId(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const classRoomDetail = data.data;

        console.log("Account detail 1: ", classRoomDetail);
        this.patchAccountForm(classRoomDetail);
        console.log("Form value: ", this.classRoomForm.value);
      }
    });
  }

  // Tách logic patch form
  patchAccountForm(classRoom: any) {
    this.classRoomForm.patchValue({
      avatar: classRoom.avatar || '',
      code: classRoom.code,
      courseId: classRoom.courseId,
      createdBy: classRoom.createdBy,
      id: classRoom.id,
      modifiedBy: classRoom.modifiedBy || '',
      modifiedDate: classRoom.modifiedDate || '',
      name: classRoom.name || '',
      order: classRoom.order,
      status: classRoom.status === 1,
      subjectId: classRoom.subjectId || '',
      totalFiltered: classRoom.totalFiltered || ''
    });
  }

  updateAccount() {
    // if (this.classRoomForm.valid) {
    //   const formValue = { ...this.classRoomForm.value };

    //   // Convert `status` to number
    //   formValue.status = formValue.status ? 1 : 0;

    //   this.teacherSrv.updateTeacher(formValue).subscribe({
    //     next: (data) => {
    //       if (data.statusCode === 200) {
    //         alert('Cập nhật tài khoản thành công!');
    //         this.router.navigate(['/quan-tri/giao-vien']);
    //       } else if (data.statusCode === 500) {
    //         alert(data.message);
    //       }
    //     },
    //     error: (err) => {
    //       console.error('Error updating account:', err);
    //       alert('Có lỗi xảy ra. Vui lòng thử lại!');
    //     },
    //   });
    // } else {
    //   alert('Vui lòng kiểm tra thông tin đầu vào!');
    // }
  }

  goBack() {
    this.router.navigate(['/quan-tri/lop-hoc']);
  }
}
