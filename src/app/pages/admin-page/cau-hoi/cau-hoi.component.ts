import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { QuestionsService } from '../../../core/services/question.service';
import { Question, TestQuestionGroup, TestQuestionType } from '../../../core/models/question.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../environments/constants';
import { UtilsService } from '../../../core/utils/utils.service';

@Component({
  selector: 'app-cau-hoi',
  templateUrl: './cau-hoi.component.html',
  styleUrl: './cau-hoi.component.css'
})
export class CauHoiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];

  questions: Question[] = [];
  queryQuestion = {
    filter: '',
    isHaveConfig: 0,
    level: -1,
    page: 1,
    size: 10,
    publicStatus: -1,
    testQuestionGroupId: -1,
    testQuestionTypeCode: '',
    searchValue: '',
    size2: 10000,
    status: 1,
  }
  totalItems: number = 0;
  selectedQuestion: Question = new Question();
  testQuestionGroup: TestQuestionGroup[] = [];
  selectedTestQuestionGroup: any = null;
  testQuestionType: TestQuestionType[] = [];
  selectTestQuestionType: any = null;
  levelQuestion = [
    { name: 'Tất cả', value: -1 },
    { name: 'Dễ', value: 1 },
    { name: 'Trung bình', value: 2 },
    { name: 'Khó', value: 3 },
    { name: 'Rất khó', value: 4 },
  ]
  selectedLevelQuestion: any = this.levelQuestion[0];
  publicStatus = [
    { name: 'Tất cả', value: -1 },
    { name: 'Mới tạo', value: 0 },
    { name: 'Chờ duyệt', value: 1 },
    { name: 'Công khai', value: 2 },
  ]
  selectedPublicStatus: any = this.publicStatus[0];
  private searchSubject: Subject<string> = new Subject(); // Subject for search

  constructor(
    private questionSrv: QuestionsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initParams();
    this.getQuestion();
    this.getTestQuestionGroup();
    this.getTestQuestionType();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Bài kiểm tra' },
    ];
    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.edit(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
          {
            label: 'Trình duyệt',
            icon: 'pi pi-eye',
            command: () => this.updateTestQuestionPublicStatus(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  edit() {
    this.router.navigate(['/quan-tri/cau-hoi/', this.selectedQuestion?.id])
  }

  deleted() {
    const documentId = this.selectedQuestion?.id;
    const isMultiple = 0;

    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_CLASSROOM,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.questionSrv.deletedTestQuestion(documentId, isMultiple).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br', life: 3000
          });
          this.getQuestion();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br', life: 3000
        });
      },
    })
  }

  getQuestion() {
    this.questionSrv
      .getQuestions(
        this.queryQuestion.filter,
        this.queryQuestion.isHaveConfig,
        this.selectedLevelQuestion.value,
        this.queryQuestion.page,
        this.queryQuestion.size,
        this.selectedPublicStatus.value,
        this.selectedTestQuestionGroup || -1,
        this.selectTestQuestionType || '',
      ).subscribe(res => {
        if (res.statusCode === 200) {
          this.questions = res?.data?.data || [];
          this.totalItems = res?.data?.recordsTotal || 0;
        } 
      })
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  search() {
    this.queryQuestion.page = 1;
    this.getQuestion();
  }

  addNew() { }

  setSelected(test: any) {
    this.selectedQuestion = test;
  }

  openQuestion() {

  }

  onPageChange(event: any): void {
    this.queryQuestion.page = event.page + 1;
    this.queryQuestion.size = event.rows;
    this.getQuestion();
  }


  getNameLevel(level: number) {
    switch (level) {
      case 1:
        return 'Dễ';

      case 2:
        return 'Trung bình';

      case 3:
        return 'Khó';

      case 4:
        return 'Rất khó';

      default:
        return '---';
    }
  }

  resetFilters() {
    this.selectedTestQuestionGroup = undefined;
    this.selectTestQuestionType = undefined;
    this.queryQuestion.filter = '';
    this.queryQuestion.page = 1;
    this.getQuestion();
  }

  getTestQuestionGroup() {
    this.questionSrv.getTestQuestionGroup(this.queryQuestion.searchValue, this.queryQuestion.page, this.queryQuestion.size2, this.queryQuestion.status).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionGroup = res?.data?.data || [];
      }
    })
  }

  getTestQuestionType() {
    this.questionSrv.getTestQuestionType(this.queryQuestion.searchValue, this.queryQuestion.page, this.queryQuestion.size2).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionType = res?.data?.data || [];
      }
    })
  }

  updateTestQuestionPublicStatus() {
    // 0 -> 2, 2 -> 0
    this.selectedQuestion.publicStatus = (this.selectedQuestion.publicStatus + 1) % 3;

    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.CHANGE_STATUS_QUESTION,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',

      accept: () => {
        this.questionSrv.updateTestQuestionChangePublicStatus(this.selectedQuestion.id, this.selectedQuestion.publicStatus).subscribe(data => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.CHANGE_STATUS,
            key: 'br', life: 3000
          });
          setTimeout(() => {
            this.getQuestion();
          }, 1000)
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br', life: 3000
        });
      }
    })
  }


}
