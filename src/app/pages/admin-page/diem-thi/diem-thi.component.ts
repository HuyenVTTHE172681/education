import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HistoriesTestUser, Scores } from '../../../core/models/scores.model';
import { SCoresService } from '../../../core/services/scores.service';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../../core/utils/utils.service';

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
  selectedScore: Scores = new Scores();
  historiesTestUser: HistoriesTestUser[] = [];
  selectedScoreHistories: HistoriesTestUser = new HistoriesTestUser();
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
    private scoresSrv: SCoresService,
    public utilsService: UtilsService
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
          {
            label: 'Bài chính',
            icon: 'pi pi-verified',
            command: () => this.deleted(), // Open sidebar on click
          }
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
    ).subscribe({
      next: (data) => {
        this.totalItems = data?.data?.recordsTotal || 0;
        this.listScores = data?.data?.data || [];

        this.listScores.forEach((score: any) => {
          score.historiesTestUser = score.historiesTestUser || [];
        });

      }
    })
  }

  onPageChange(event: any) {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getScores();
  }

  setSelectedScore(score: Scores) {
    this.selectedScore = score;
  }

  setSelectedHistory(history: HistoriesTestUser) {
    this.selectedScoreHistories = history;
  }

}
