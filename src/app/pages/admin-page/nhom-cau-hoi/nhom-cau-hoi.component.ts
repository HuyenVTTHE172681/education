import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { QuestionGroups } from '../../../core/models/question.model';
import { CONSTANTS, HttpStatus } from '../../../common/constants';
import { UtilsService } from '../../../common/utils/utils.service';
import { debounceTime, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionGroupsService } from '../../../core/services/api-core/questionGroups.service';

@Component({
  selector: 'app-nhom-cau-hoi',
  templateUrl: './nhom-cau-hoi.component.html',
  styleUrl: './nhom-cau-hoi.component.css'
})
export class NhomCauHoiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  questionGroups: QuestionGroups[] = [];
  query = {
    filter: '',
    page: 0,
    size: 10,
    status: -1
  }
  selectedQuestionGroups: any;
  totalItems: number = 0;
  private searchSubject: Subject<string> = new Subject();
  showEditDialog: boolean = false;
  isEditMode: boolean = false;
  questionGroupForm: FormGroup;

  constructor(
    private questionGroupSrv: QuestionGroupsService,
    public utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.questionGroupForm = this.formBuilder.group({
      createdBy: [''],
      createdDate: [''],
      id: [1],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      order: [0, [Validators.required, Validators.min(1)]],
      status: [0],
      testQuestions: [''],
      totalFiltered: [0]
    })
  }

  ngOnInit(): void {
    this.initParams();
    this.getQuestionGroups();

  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Lớp học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-check',
            command: () => this.showEdit(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  getQuestionGroups() {
    this.questionGroupSrv.getQuestionGroups(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.questionGroups = res?.data?.data || [];
        this.totalItems = res?.data?.recordsTotal || 0;

        if (this.query.page < 1) {
          this.query.page = 1; // Reset to page 1 if it's invalid
        }
      }
    })
  }

  setSelectedQuestionGroup(questionGroups: QuestionGroups) {
    this.selectedQuestionGroups = [questionGroups];
  }

  onPageChange(event: any) {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getQuestionGroups();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }

  search() {
    this.query.page = 1;
    this.getQuestionGroups();
  }

  // GET QUESTION BY ID
  getQuestionGroupsById(id: number) {
    this.questionGroupSrv.getQuestionGroupsById(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const questionsGroupDetail = data?.data || [];
        this.patchQuestionForm(questionsGroupDetail);
      }
    });
  }
  patchQuestionForm(question: any) {
    this.questionGroupForm.patchValue({
      createdBy: question.createdBy || '',
      createdDate: new Date().toISOString(),
      id: question.id || 1,
      modifiedBy: question.modifiedBy || '',
      modifiedDate: new Date().toISOString(),
      name: question.name || '',
      order: question.order || 0,
      status: question.status === 1,
      testQuestions: question.testQuestions || '',
      totalFiltered: question.totalFiltered || 0
    })
  }


  showEdit() {
    const selectedGroup = this.selectedQuestionGroups[0]; // Lấy nhóm câu hỏi được chọn
    const id = selectedGroup.id;

    if (id) {
      this.questionGroupSrv.getQuestionGroupsById(id).subscribe((res) => {
        if (res.statusCode === HttpStatus.OK) {
          this.patchQuestionForm(res.data); // Điền dữ liệu vào form
          this.showEditDialog = true; // Mở dialog
          this.isEditMode = true;
        }
      });
    }
  }

  showAdd() {
    // Tìm ID lớn nhất từ danh sách hiện tại
    const maxId = this.questionGroups.reduce((max, group) => (group.id > max ? group.id : max), 0);

    this.questionGroupForm.reset();
    this.questionGroupForm.patchValue({
      createdBy: '',
      createdDate: new Date().toISOString(),
      id: maxId + 1,
      modifiedBy: '',
      modifiedDate: new Date().toISOString(),
      name: '',
      order: 0,
      status: 0,
      testQuestions: '',
      totalFiltered: 0
    });
    this.showEditDialog = true;
    this.isEditMode = false;
  }

  // ADD & UPDATE QUESTION GROUP
  saveQuestionGroup() {
    this.questionGroupForm.markAllAsTouched();

    if (this.questionGroupForm.valid) {
      const formValue = { ...this.questionGroupForm.value };
      formValue.status = formValue.status ? 1 : 0;
      formValue.order = formValue.order || 0;


      this.questionGroupSrv.updateQuestionGroup(formValue).subscribe((res) => {
        if (res.statusCode === HttpStatus.OK) {
          let detail = this.isEditMode ? CONSTANTS.MESSAGE_ALERT.UPDATE_SUCCESSFUL : CONSTANTS.MESSAGE_ALERT.ADD_SUCCESSFUL
          let summary = this.isEditMode ? CONSTANTS.SUMMARY.SUMMARY_UPDATE_SUCCESSFUL : CONSTANTS.SUMMARY.SUMMARY_ADD_SUCCESSFUL

          this.messageService.add({
            severity: 'success',
            summary: summary,
            detail: detail,
            key: 'br',
            life: 3000
          });
          this.showEditDialog = false;
          this.getQuestionGroups();
        }
      },
        (err) => {
          this.messageService.add({
            severity: 'info',
            summary: CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL,
            detail: err.message,
            key: 'br',
            life: 3000
          });
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

  // DELETE
  deleted() {
    const documentId = this.selectedQuestionGroups[0].id;

    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_QUESTION_GROUP,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',

      accept: () => {
        this.questionGroupSrv.deletedQuestionGroup(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br',
            life: 3000
          });
          this.getQuestionGroups();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br',
          life: 3000
        });
      },
    })
  }

}
