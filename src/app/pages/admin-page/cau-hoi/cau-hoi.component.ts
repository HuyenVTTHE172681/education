import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { QuestionsService } from '../../../core/services/question.service';
import { Question, TestQuestionGroup, TestQuestionType } from '../../../core/models/question.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cau-hoi',
  templateUrl: './cau-hoi.component.html',
  styleUrl: './cau-hoi.component.css'
})
export class CauHoiComponent implements OnInit {
  breadcrum: MenuItem[] = [];
  home: MenuItem = [];
  items: any[] = [];

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
  selectedQuestion: any = null;
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
    { name: 'Tạo mới', value: 0 },
    { name: 'Chờ duyệt', value: 1 },
    { name: 'Công chờ', value: 2 },
  ]
  selectedPublicStatus: any = this.publicStatus[0];
  private searchSubject: Subject<string> = new Subject(); // Subject for search

  constructor(
    private questionSrv: QuestionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.initParams();
    this.getQuestion();
    this.getTestQuestionGroup();
    this.getTestQuestionType();
  }

  initParams() {
    this.breadcrum = [
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
            command: () => this.deleted(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
          {
            label: 'Trình duyệt',
            icon: 'pi pi-eye',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  deleted() {
    // const documentId = this.selectedTeacher?.id;
    // this.confirmationService.confirm({
    //   message: CONSTANTS.CONFIRM.DELETE_CLASSROOM,
    //   header: 'Xác nhận',
    //   icon: 'pi pi-exclamation-triangle',
    //   acceptLabel: 'Đồng ý',
    //   rejectLabel: 'Hủy bỏ',
    //   accept: () => {
    //     this.classRoomSrv.deleteClassRoom(documentId).subscribe((data) => {
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
    //         detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
    //         key: 'br', life: 3000
    //       });
    //       this.getClassRoom();
    //     })
    //   },
    //   reject: () => {
    //     this.messageService.add({
    //       severity: 'info',
    //       summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
    //       detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
    //       key: 'br', life: 3000
    //     });
    //   },
    // })
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
          this.questions = res.data.data;
          this.totalItems = res.data.recordsTotal;
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

  getStatusLabel(status: number) {
    switch (status) {
      case 0:
        return 'Tạo mới';

      case 1:
        return 'Chờ duyệt';

      case 2:
        return 'Công chờ';

      default:
        return '---';
    }
  }
  getStatus(status: number) {
    switch (status) {
      case 0:
        return 'primary';

      case 1:
        return 'warning';

      case 2:
        return 'success';

      default:
        return 'danger';
    }
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

  resetFilters() { }

  getTestQuestionGroup() {
    this.questionSrv.getTestQuestionGroup(this.queryQuestion.searchValue, this.queryQuestion.page, this.queryQuestion.size2, this.queryQuestion.status).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionGroup = res.data.data;
      }
    })
  }

  getTestQuestionType() {
    this.questionSrv.getTestQuestionType(this.queryQuestion.searchValue, this.queryQuestion.page, this.queryQuestion.size2).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionType = res.data.data;
      }
    })
  }




}
