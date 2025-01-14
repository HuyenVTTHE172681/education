import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { CONSTANTS, HttpStatus } from '../../../../common/constants';
import { ClassRoomService } from '../../../../core/services/api-core/classRoom.service';
import { SubjectService } from '../../../../core/services/api-core/subject.service';

@Component({
  selector: 'app-chi-tiet-mon-hoc',
  templateUrl: './chi-tiet-mon-hoc.component.html',
  styleUrl: './chi-tiet-mon-hoc.component.css'
})
export class ChiTietMonHocComponent implements OnInit {
  id: string | null = null;
  breadcrumb: MenuItem[] = [];
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private classRoomSrv: ClassRoomService,
    private subjectSrv: SubjectService,
    private messageService: MessageService) {

    this.subjectForm = this.formBuilder.group({
      avatar: [''],
      classRoomIds: [[]],
      classRooms: [[]],
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
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Môn học', routerLink: '/quan-tri/mon-hoc' },
      { label: 'Chi tiết Môn học' },
    ];
    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.query.page, this.query.size, this.query.searchText).subscribe((data) => {
      this.classRoom = data?.data?.data || [];
    })
  }

  getSubjectDetail(id: string) {
    this.subjectSrv.getSubjectById(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const subjectDetail = data?.data || [];

        this.selectedClassRoom = this.classRoom.filter((classRoom) =>
          subjectDetail.classRoomIds.includes(classRoom.id)
        );

        this.patchAccountForm(subjectDetail);
      }
    })
  }

  patchAccountForm(subject: any) {
    this.subjectForm.patchValue({
      avatar: subject.avatar || '',
      classRoomIds: subject.classRoomIds || [],
      classRooms: subject.classRooms || [],
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

      this.subjectSrv.updateSubject(formValue).subscribe({
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
              this.router.navigate(['/quan-tri/mon-hoc']);
            }, 1000);
          }
        }
      })
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
    this.router.navigate(['/quan-tri/mon-hoc']);
  }
}
