import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NewsCategory } from '../../../core/models/news.model';
import { NewsService } from '../../../core/services/api-core/news.service';
import { HttpStatus } from '../../../environments/constants';
import { Router } from '@angular/router';
import { UtilsService } from '../../../core/utils/utils.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-danh-muc-tin-tuc',
  templateUrl: './danh-muc-tin-tuc.component.html',
  styleUrl: './danh-muc-tin-tuc.component.css'
})
export class DanhMucTinTucComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  news: NewsCategory[] = [];
  selectedNews: any;
  totalItems = 0;
  query = {
    filter: '',
    page: 1,
    size: 10,
    status: -1
  }
  private searchSubject: Subject<string> = new Subject();
  constructor(
    private newSrv: NewsService,
    private router: Router,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getNewsCategory();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getNewsCategory();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Danh mục tin tức' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

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
        ],
      },
    ];
  }

  deleted() { }

  addNew() {
    this.router.navigate(['/quan-tri/danh-muc-tin-tuc/them-moi']);
  }

  getNewsCategory() {
    this.newSrv.getNewsCategory(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.news = res?.data?.data || [];
        this.totalItems = res?.data?.recordsTotal || 0;
      }
    })
  }

  search() {
    this.query.page = 0;
    this.getNewsCategory();
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onPageChange(event: any): void {
    this.query.page = event.page;
    this.query.size = event.rows;
    this.getNewsCategory();
  }

  setSelectedNews(news: NewsCategory) {
    this.selectedNews = news;
  }

}
