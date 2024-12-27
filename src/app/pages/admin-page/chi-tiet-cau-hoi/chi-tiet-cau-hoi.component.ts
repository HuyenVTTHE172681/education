import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuestionsService } from '../../../core/services/question.service';
import { TestQuestionGroup, TestQuestionNewById, TestQuestionType } from '../../../core/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../../core/models/teacher.model';
import { TeacherService } from '../../../core/services/teacher.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    { name: 'Tất cả', code: -1 },
    { name: 'Dễ', code: 1 },
    { name: 'Trung bình', code: 2 },
    { name: 'Khó', code: 3 },
    { name: 'Rất khó', code: 4 },
  ]
  teacher: Teacher[] = [];
  testQuestionType: TestQuestionType[] = [];
  testQuestionGroup: TestQuestionGroup[] = [];
  questionNew: TestQuestionNewById = new TestQuestionNewById();
  questionForm: FormGroup;

  constructor(
    private questionsSrv: QuestionsService,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private questionSrv: QuestionsService,
    private formBuilder: FormBuilder
  ) {
    this.questionForm = this.formBuilder.group({
      answer: [''],
      attackFiles: [''],
      content: [''],
      createdBy: [''],
      createdDate: [''],
      description: [''],
      id: [''],
      isAdd: [0],
      isAutoSort: [0],
      isLayoutSplitVertical: [1],
      lessonLink: [''],
      level: [1],
      modifiedBy: [''],
      modifiedDate: [''],
      name: [''],
      order: [0],
      point: [0],
      publicStatus: [0],
      quizzConfigSets: [''],
      teacherIds: [''],
      testId: [''],
      testQuestionAnswers: [[]],
      testQuestionGroupId: [0],
      testQuestionGroupName: [''],
      testQuestionTypeCode: [''],
      testQuestionTypeName: [''],
      totalFiltered: [''],
    })
  }

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

  patchQuestionForm(question: any) {
    this.questionForm.patchValue({
      answer: question.answer,
      attackFiles: question.attackFiles,
      content: question.content,
      createdBy: question.createdBy,
      createdDate: question.createdDate,
      description: question.description,
      id: question.id,
      isAdd: question.isAdd,
      isAutoSort: question.isAutoSort,
      isLayoutSplitVertical: question.isLayoutSplitVertical,
      lessonLink: question.lessonLink,
      level: question.level,
      modifiedBy: question.modifiedBy,
      modifiedDate: question.modifiedDate,
      name: question.name,
      order: question.order,
      point: question.point,
      publicStatus: question.publicStatus,
      quizzConfigSets: question.quizzConfigSets,
      teacherIds: question.teacherIds,
      testId: question.testId,
      testQuestionAnswers: question.testQuestionAnswers,
      testQuestionGroupId: question.testQuestionGroupId,
      testQuestionGroupName: question.testQuestionGroupName,
      testQuestionTypeCode: question.testQuestionTypeCode,
      testQuestionTypeName: question.testQuestionTypeName,
      totalFiltered: question.totalFiltered,
      
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
