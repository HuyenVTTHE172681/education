import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClassRoom } from '../../../../models/classRoom.model';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../services/subject.service';

@Component({
  selector: 'app-chi-tiet-mon-hoc',
  templateUrl: './chi-tiet-mon-hoc.component.html',
  styleUrl: './chi-tiet-mon-hoc.component.css'
})
export class ChiTietMonHocComponent implements OnInit {
  id: string | null = null;
  breadcrum: any[] = [];
  home: MenuItem | undefined;
  subjectForm: FormGroup;
  isEditMode: boolean = false;

  classRoom: ClassRoom[] = [];
  selectedClassRoom: any[] = [];
  page: number = 1;
  size: number = 10;
  searchText: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private classRoomSrv: ClassRoomService, private subjectSrv: SubjectService) {
    this.subjectForm = this.formBuilder.group({
      avatar: [''],
      classRoomIds: [[]],
      classRooms: [[], [Validators.required]], // mảng selected lớp học
      courseId: [''],
      courses: [''],
      createdBy: [''],
      createdDate: [''],
      id: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      order: [1],
      status: [0],
      totalFiltered: [''],
    });
  }

  ngOnInit() {
    this.getClassRoom();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEditMode = true;
      this.getSubjectDetail(this.id);
    } else {
      this.isEditMode = false;
      this.subjectForm.reset();
    }

    this.breadcrum = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Môn học', routerLink: '/quan-tri/moc-hoc' },
      { label: 'Chi tiết Môn học' },
    ];
    this.home = { icon: 'pi pi-shop', routerLink: '/' };

  }

  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.page, this.size, this.searchText).subscribe((data) => {
      this.classRoom = data.data.data;
      console.log("ClassRoom: ", this.classRoom);
    })
  }

  getSubjectDetail(id: string) {
    this.subjectSrv.getSubjectById(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const subjectDetail = data.data;

        // Ánh xạ classRoomIds thành các đối tượng từ danh sách classRoom
        this.selectedClassRoom = this.classRoom.filter((classRoom) =>
          subjectDetail.classRoomIds.includes(classRoom.id)
        );

        console.log("Subject detail: ", subjectDetail);
        this.patchAccountForm(subjectDetail);
        console.log("Form: ", this.subjectForm.value);
      }
    })
  }

  patchAccountForm(subject: any) {
    this.subjectForm.patchValue({
      avatar: subject.avatar || '',
      classRoomIds: subject.classRoomIds || [],
      classRooms: subject.classRooms || [], // mảng selected lớp học
      courseId: subject.courseId || '',
      courses: subject.courses || '',
      createdBy: subject.createdBy || '',
      createdDate: subject.createdDate || '',
      id: subject.id || '',
      modifiedBy: subject.modifiedBy || '',
      modifiedDate: subject.modifiedDate || '',
      name: subject.name || '',
      order: subject.order,
      status: subject.status === 1,
      totalFiltered: subject.totalFiltered || '',
    });
  }


  updateSubject() {
    if (this.subjectForm.valid) {
      const formValue = { ...this.subjectForm.value };

      formValue.status = formValue.status ? 1 : 0;
      formValue.classRoomIds = this.selectedClassRoom.map((classRoom) => classRoom.id);

      if (this.isEditMode) {
        // update subject
        alert('Cập nhật môn học thanh cong!');
      } else {
        if (this.subjectForm.invalid) {
          console.log("Form errors: ", this.subjectForm.errors);
          console.log("Form field errors: ", this.subjectForm.controls);
          alert('Vui lòng kiểm tra thông tin đầu vào!');
        } else {
          this.subjectSrv.addSubject(formValue).subscribe({
            next: (data) => {
              if (data.statusCode === 200) {
                alert('Thêm tài khoản thành công!');
                this.router.navigate(['/quan-tri/mon-hoc']);
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
      console.log("Form is invalid", this.subjectForm.errors);
      console.log("Form control errors:", this.subjectForm.controls);
      alert('Vui lòng kiểm tra thông tin đầu vào!');
    }
  }

  goBack() {
    this.router.navigate(['/quan-tri/mon-hoc']);
  }

  onClassRoomChange(selected: any[]) {
    this.selectedClassRoom = selected;
    this.subjectForm.patchValue({
      classRoomIds: selected.map((item) => item.id),
    });
  }




}
