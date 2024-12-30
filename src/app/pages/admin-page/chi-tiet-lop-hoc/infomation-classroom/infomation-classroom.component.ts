import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../core/services/teacher.service';
import { ClassRoomService } from '../../../../core/services/classRoom.service';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, HttpStatus } from '../../../../environments/constants';

@Component({
  selector: 'app-infomation-classroom',
  templateUrl: './infomation-classroom.component.html',
  styleUrl: './infomation-classroom.component.css'
})
export class InfomationClassroomComponent implements OnInit {
  id: string | null = null;
  classRoomForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classRoomSrv: ClassRoomService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
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
      status: [0],
      subjectId: [''],
      totalFiltered: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id && this.id !== 'null' && this.id !== 'undefined') {
        this.isEditMode = true;
        this.getClassRoomDetail(this.id);
      } else {
        this.isEditMode = false;
        this.classRoomForm.reset();
      }
    });
  }

  // Lấy chi tiết tài khoản
  getClassRoomDetail(id: string) {
    this.classRoomSrv.getClassRoomWithId(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const classRoomDetail = data?.data || []; 
        this.patchAccountForm(classRoomDetail);
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
      createDate: classRoom.createDate || '',
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

  updateClassRoom() {
    if (this.classRoomForm.valid) {
      const formValue = { ...this.classRoomForm.value };
      formValue.status = formValue.status ? 1 : 0;

      this.classRoomSrv.updateClassRoom(formValue).subscribe({
        next: (data) => {
          if (data.statusCode === HttpStatus.OK) {
            let detail = this.isEditMode ? CONSTANTS.MESSAGE_ALERT.UPDATE_SUCCESSFUL : CONSTANTS.MESSAGE_ALERT.ADD_SUCCESSFUL
            let summary = this.isEditMode ? CONSTANTS.SUMMARY.SUMMARY_UPDATE_SUCCESSFUL : CONSTANTS.SUMMARY.SUMMARY_ADD_SUCCESSFUL

            this.messageService.add({
              severity: 'success',
              summary: summary,
              detail: detail,
              key: 'br',
              life: 3000
            });
            setTimeout(() => {
              this.router.navigate(['/quan-tri/lop-hoc']);
            }, 1000);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'info',
            summary: CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL,
            detail: err.message,
            key: 'br',
            life: 3000
          });
        }
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
    this.router.navigate(['/quan-tri/lop-hoc']);
  }
}
