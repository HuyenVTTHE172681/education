import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuestionsService } from '../../../core/services/question.service';
import { TestQuestionNewById } from '../../../core/models/question.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chi-tiet-cau-hoi',
  templateUrl: './chi-tiet-cau-hoi.component.html',
  styleUrl: './chi-tiet-cau-hoi.component.css'
})
export class ChiTietCauHoiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  id: string | null = null;

  questionNew: TestQuestionNewById = new TestQuestionNewById();

  constructor(
    private questionsSrv: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initParams();

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
}
