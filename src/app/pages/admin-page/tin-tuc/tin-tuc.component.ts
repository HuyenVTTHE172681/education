import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NewsService } from '../../../core/services/api-core/news.service';
import { News, NewsCategory } from '../../../core/models/news.model';
import { debounceTime, filter, Subject } from 'rxjs';
import { CONSTANTS, HttpStatus } from '../../../common/constants';
import { Router } from '@angular/router';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrl: './tin-tuc.component.css'
})
export class TinTucComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];

  news: News[] = [];
  selectedNews: any;
  totalItems: number = 0;
  query = {
    categoryId: '',
    filter: '',
    page: 0,
    size: 10,
    status: -1
  }
  newsCategory: NewsCategory[] = [];
  selectedNewsCategory: any;
  private searchSubject: Subject<string> = new Subject();

  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Hiển thị', value: 1 },
    { name: 'Ẩn', value: 0 },
  ]
  selectedStatus: any = this.statusList[0];

  constructor(
    private newsSrv: NewsService,
    private router: Router,
    public utilsService: UtilsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getNews();
    this.getNewsCategory();
    this.initParams();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getNews();
    });

  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Tin tức' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.edit(), // Open sidebar on click
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
    const documentId = this.selectedNews?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_BAI_VIET,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.newsSrv.deleteNew(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br', life: 3000
          });
          this.getNews();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br', life: 3000
        });
      },
    })
  }

  edit() {
    this.router.navigate(['/quan-tri/tin-tuc', this.selectedNews?.id])
  }

  getNews() {
    this.newsSrv.getNews(this.selectedNewsCategory || '', this.query.filter, this.query.page, this.query.size, this.selectedStatus.value).subscribe((res) => {
      this.news = res?.data?.data || [];
      this.totalItems = res?.data?.recordsTotal || 0;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
    })
  }

  search() {
    this.query.page = 0;
    this.getNews();
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onPageChange(event: any): void {
    this.query.page = event.page;
    this.query.size = event.rows;
    this.getNews();
  }

  getNewsCategory() {
    this.newsSrv.getNewsCategory(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.newsCategory = res?.data?.data || [];

      }
    })
  }

  add() {
    this.router.navigate(['/quan-tri/tin-tuc/them-moi']);
  }

  setSelected(news: any) {
    this.selectedNews = news;
  }

  resetFilters(): void {
    this.selectedNewsCategory = '';
    this.query.filter = '';
    this.query.page = 1;
    this.getNews();
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getNews();
  }

}
