import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuestionsService } from '../../../core/services/question.service';
import { TestQuestionGroup, TestQuestionNewById, TestQuestionType } from '../../../core/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../../core/models/teacher.model';
import { TeacherService } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-chi-tiet-cau-hoi',
  templateUrl: './chi-tiet-cau-hoi.component.html',
  styleUrl: './chi-tiet-cau-hoi.component.css'
})
export class ChiTietCauHoiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  id: string | null = null;
  query = {
    filter: '',
    page: 1,
    size: 10000,
    status: 1
  }
  levelQuestion = [
    { name: 'Tất cả', value: -1 },
    { name: 'Dễ', value: 1 },
    { name: 'Trung bình', value: 2 },
    { name: 'Khó', value: 3 },
    { name: 'Rất khó', value: 4 },
  ]
  teacher: Teacher[] = [];
  testQuestionType: TestQuestionType[] = [];
  testQuestionGroup: TestQuestionGroup[] = [];
  questionNew: TestQuestionNewById = new TestQuestionNewById();

  constructor(
    private questionsSrv: QuestionsService,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private questionSrv: QuestionsService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getTeacher();
    this.getTestQuestionType();
    this.getTestQuestionGroup();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log("ID TEST QUESTION: ", this.id);
      if (this.id) {
        this.getTestQuestionNewById(this.id);
      }
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri/tong-quan' },
      { label: 'Bài kiểm tra', routerLink: '/quan-tri/bai-kiem-tra' },
      { label: 'Chi tiết câu hỏi' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

  getTestQuestionNewById(id: string) {
    this.questionsSrv.getTestQuestionNewById(id).subscribe((data) => {
      this.questionNew = data.data;
      console.log("Question Test New By id: ", this.questionNew);
    })
  }

  getTeacher() {
    this.teacherSrv.getTeachers(this.query.page, this.query.size, this.query.filter).subscribe((data) => {
      this.teacher = data.data.data;
    })
  }

  getTestQuestionType() {
    this.questionSrv.getTestQuestionType(this.query.filter, this.query.page, this.query.size).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionType = res.data.data;
      }
    })
  }

  getTestQuestionGroup() {
    this.questionSrv.getTestQuestionGroup(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === 200) {
        this.testQuestionGroup = res.data.data;
      }
    })
  }
}
