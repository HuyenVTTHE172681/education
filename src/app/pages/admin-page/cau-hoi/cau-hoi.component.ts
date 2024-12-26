import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuestionsService } from '../../../services/question.service';
import { Question, TestQuestionGroup, TestQuestionType } from '../../../models/question.model';
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
  }
  totalItems: number = 0;
  selectedQuestion: any = null;

  testQuestionGroup: TestQuestionGroup[] = [];
  selectedTestQuestionGroup: any = null;
  testQuestionType: TestQuestionType[] = [];
  selectTestQuestionType: any = null;
  query = {
    searchValue: '',
    page: 1,
    size: 10000,
    status: 1,
  }
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

  constructor(private questionSrv: QuestionsService) { }

  ngOnInit(): void {
    this.getBreadcrum();
    this.initParams();
    this.getQuestion();
    this.getTestQuestionGroup();
    this.getTestQuestionType();
  }

  getBreadcrum() {
    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Bài kiểm tra' },
    ];
    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

  initParams() {
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

  deleted() { }

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
          console.log("Question: ", this.questions);
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
    this.questionSrv.getTestQuestionGroup(this.query.searchValue, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionGroup = res.data.data;
        console.log("Test Question Group: ", this.testQuestionGroup);
      }
    })
  }

  getTestQuestionType() {
    this.questionSrv.getTestQuestionType(this.query.searchValue, this.query.page, this.query.size).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionType = res.data.data;
        console.log("Test Question Type: ", this.testQuestionType);
      }
    })
  }




}
