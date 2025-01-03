import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Recruit, RecruitCandidate } from '../../../core/models/recruitment.model';
import { debounceTime, Subject } from 'rxjs';
import { UtilsService } from '../../../core/utils/utils.service';
import { RecruitmentService } from '../../../core/services/api-core/recruitment.services';

@Component({
  selector: 'app-ung-vien',
  templateUrl: './ung-vien.component.html',
  styleUrl: './ung-vien.component.css'
})
export class UngVienComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  recruitmentCandidate: RecruitCandidate[] = [];
  selectedRecruitCandidate: RecruitCandidate | null = null;
  totalItems = 0;
  query = {
    filter: '',
    interviewPass: -1,
    page: 1,
    size: 10,
    status: -1,
  }
  private searchSubject: Subject<string> = new Subject();
  interviewList = [
    { name: 'Tất cả', code: -1 },
    { name: 'Phỏng vấn đạt', code: 1 },
    { name: 'Phỏng vấn trượt', code: 0 }
  ]
  statusList = [
    { name: 'Tất cả', code: -1 },
    { name: 'Chưa phỏng vấn', code: 0 },
    { name: 'Đã phỏng vấn', code: 1 }
  ]

  selectedInterviewList: any = this.interviewList[0];
  selectedStatusList: any = this.statusList[0];

  constructor(
    public utilsService: UtilsService,
    private recruitmentSrv: RecruitmentService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getRecruitmentCandidate();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getRecruitmentCandidate();
    });
  }


  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Tin tuyển dụng' },
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

  getRecruitmentCandidate() {
    this.recruitmentSrv.getRecruitCandidate(this.query.filter, this.selectedInterviewList.code, this.query.page, this.query.size, this.selectedStatusList.code).subscribe((data) => {
      this.recruitmentCandidate = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;
    })
  }

  search() {
    this.query.page = 0;
    this.getRecruitmentCandidate();
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onPageChange(event: any): void {
    this.query.page = event.page;
    this.query.size = event.rows;
    this.getRecruitmentCandidate();
  }

  setSelectedRecruit(recruit: RecruitCandidate) {
    this.selectedRecruitCandidate = recruit;
  }

  resetFilters() {
    this.query.page = 0;
    this.getRecruitmentCandidate();
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getRecruitmentCandidate();
  }

}
