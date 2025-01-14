import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HistoriesTestUser, Scores } from '../../../core/models/scores.model';
import { debounceTime, map, throwIfEmpty } from 'rxjs/operators';
import { UtilsService } from '../../../common/utils/utils.service';
import { Subject } from 'rxjs';
import { ClassRoom } from '../../../core/models/classRoom.model';
import { Course } from '../../../core/models/course.model';
import { Subject as SubjectModel } from '../../../core/models/subject.model';
import { IResponseList } from '../../../core/models/common.model';
import { SCoresService } from '../../../core/services/api-core/scores.service';
import { ClassRoomService } from '../../../core/services/api-core/classRoom.service';
import { CourseService } from '../../../core/services/api-core/course.service';
import { SubjectService } from '../../../core/services/api-core/subject.service';

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
    page: 1,
    size: 10,
    subjectId: '',
    testCategoryId: '',
    userId: '',
    pageFilter: 1,
    sizeFilter: 1000,
    searchText: '',
    accountId: '',
    callFromAdmin: 1,
    isPayment: -1,
    status: -1,
    teacherId: '',
  }
  private searchSubject: Subject<string> = new Subject();
  classRoom: ClassRoom[] = [];
  selectedClassroom: string | undefined;
  subject: SubjectModel[] = [];
  selectedSubject: string | undefined;
  course: Course[] = [];
  selectedCourse: string | undefined;

  constructor(
    private scoresSrv: SCoresService,
    public utilsService: UtilsService,
    private classRoomSrv: ClassRoomService,
    private courseSrv: CourseService,
    private subjectSrv: SubjectService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getScores();
    this.getClassRoom();
    this.getAllKhoaHoc();
    this.getSubject();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getScores();
    });
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
      this.selectedClassroom || '',
      this.selectedCourse || '',
      this.query.filter,
      this.query.page,
      this.query.size,
      this.selectedSubject || '',
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

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  search() {
    this.query.page = 1;
    this.getScores();
  }

  resetFilters(): void {
    this.query.filter = '';
    this.query.page = 1;
    this.getScores();
  }

  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.query.pageFilter, this.query.sizeFilter, this.query.searchText)
      .subscribe({
        next: (data: IResponseList<ClassRoom>) => {
          this.classRoom = data?.data?.data || [];
        },
      });
  }

  getAllKhoaHoc(): void {
    this.courseSrv.getKhoaHoc(
      this.query.accountId,
      this.query.callFromAdmin,
      this.query.classId,
      this.query.filter,
      this.query.isPayment,
      this.query.pageFilter,
      this.query.sizeFilter,
      this.query.status,
      this.query.subjectId,
      this.query.teacherId
    ).subscribe({
      next: (data: IResponseList<Course>) => {
        this.course = data?.data?.data || [];
      }
    })
  }

  getSubject() {
    this.subjectSrv.getSubjectByCourse(this.query.classId, this.query.searchText, this.query.pageFilter, this.query.sizeFilter).subscribe((data) => {
      this.subject = data?.data?.data || [];

    })
  }

}
