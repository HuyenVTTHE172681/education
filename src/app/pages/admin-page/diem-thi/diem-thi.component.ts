import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Scores } from '../../../core/models/scores.model';
import { SCoresService } from '../../../core/services/scores.service';

@Component({
  selector: 'app-diem-thi',
  templateUrl: './diem-thi.component.html',
  styleUrl: './diem-thi.component.css'
})
export class DiemThiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  expandedRows = {};
  listScores: Scores[] = [];
  totalItems: number = 0;
  query = {
    classId: '',
    courseId: '',
    filter: '',
    page: 0,
    size: 10,
    subjectId: '',
    testCategoryId: '',
    userId: '',
  }

  constructor(
    private scoresSrv: SCoresService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getScores();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Điểm thi' },
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

  deleted() { }

  expandAll() {
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getScores() {
    this.scoresSrv.getScores(
      this.query.classId,
      this.query.courseId,
      this.query.filter,
      this.query.page,
      this.query.size,
      this.query.subjectId,
      this.query.testCategoryId,
      this.query.userId
    ).subscribe((data) => {
      this.listScores = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;
    });
  }

}
