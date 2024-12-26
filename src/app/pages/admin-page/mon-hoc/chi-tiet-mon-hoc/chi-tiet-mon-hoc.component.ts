import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { ClassRoomService } from '../../../../core/services/classRoom.service';
import { SubjectService } from '../../../../core/services/subject.service';

@Component({
  selector: 'app-chi-tiet-mon-hoc',
  templateUrl: './chi-tiet-mon-hoc.component.html',
  styleUrl: './chi-tiet-mon-hoc.component.css'
})
export class ChiTietMonHocComponent implements OnInit {
  id: string | null = null;
  breadcrum: MenuItem[] = [];
  home: MenuItem = [];
  subjectForm: FormGroup;
  isEditMode: boolean = false;
  classRoom: ClassRoom[] = [];
  selectedClassRoom: any[] = [];
  query = {
    page: 1,
    size: 1000,
    searchText: ''
  }
  fallbackFormControl = new FormControl([]);

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private classRoomSrv: ClassRoomService, private subjectSrv: SubjectService) {
    this.subjectForm = this.formBuilder.group({
      avatar: [''],
      classRoomIds: [[]],
      classRooms: [[]], // mảng selected lớp học
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
    this.initParams();
    this.getClassRoom();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEditMode = true;
      this.getSubjectDetail(this.id);
    } else {
      this.isEditMode = false;
      this.subjectForm.reset();
    }

  }

  initParams() {
    this.breadcrum = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Môn học', routerLink: '/quan-tri/mon-hoc' },
      { label: 'Chi tiết Môn học' },
    ];
    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.query.page, this.query.size, this.query.searchText).subscribe((data) => {
      this.classRoom = data.data.data;
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
      // formValue.classRoomIds = this.selectedClassRoom.map((classRoom) => classRoom.id);

      console.log("Form value: ", formValue);
      if (this.isEditMode) {
        this.subjectSrv.updateSubject(formValue).subscribe({
          next: (data) => {
            if (data.statusCode === 200) {
              alert("Cập nhật thành công");
              this.router.navigate(['/quan-tri/mon-hoc']);
            } else if (data.statusCode === 500) {
              alert(data.message);
            }
          }
        })
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




}
