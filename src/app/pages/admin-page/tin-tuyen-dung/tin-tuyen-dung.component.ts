import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Recruit } from '../../../core/models/recruitment.model';
import { UtilsService } from '../../../core/utils/utils.service';
import { RecruitmentService } from '../../../core/services/recruitment.services';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-tin-tuyen-dung',
  templateUrl: './tin-tuyen-dung.component.html',
  styleUrl: './tin-tuyen-dung.component.css'
})
export class TinTuyenDungComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  recruitment: Recruit[] = [];
  selectedRecruit: Recruit | null = null;
  totalItems = 0;
  query = {
    filter: '',
    page: 0,
    size: 10,
    status: -1,
  }
  private searchSubject: Subject<string> = new Subject();

  constructor(
    public utilsService: UtilsService,
    private recruitmentSrv: RecruitmentService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getRecruitment();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getRecruitment();
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

  getRecruitment() {
    this.recruitmentSrv.getRecruitment(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe((data) => {
      this.recruitment = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;

    })
  }

  search() {
    this.query.page = 0;
    this.getRecruitment();
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onPageChange(event: any): void {
    this.query.page = event.page;
    this.query.size = event.rows;
    this.getRecruitment();
  }

  setSelectedRecruit(recruit: Recruit) {
    this.selectedRecruit = recruit;
  }


}
