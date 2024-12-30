import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuestionGroups } from '../../../core/models/question.model';
import { QuestionGroupsService } from '../../../core/services/questionGroups.service';
import { HttpStatus } from '../../../environments/constants';

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
    page: 1,
    size: 10,
    status: -1
  }

  constructor(
    private questionGroupSrv: QuestionGroupsService
    
  ) { }

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
            command: () => this.deleted(), // Open sidebar on click
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

  deleted() {

  }

  getQuestionGroups() {
    this.questionGroupSrv.getQuestionGroups(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.questionGroups = res?.data?.data || [];
      }
    })
  }

}
