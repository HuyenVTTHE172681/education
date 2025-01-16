import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Guide } from '../../../core/models/guide.model';
import { DashboardService } from '../../../core/services/api-core/dashboard.service';
import { UtilsService } from '../../../utils/utils.service';
import { PaginatorModule } from 'primeng/paginator';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-tro-giup',
  templateUrl: './tro-giup.component.html',
  styleUrl: './tro-giup.component.css'
})
export class TroGiupComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  helps: Guide[] = [];
  selectedHelps: Guide | null = null;
  query = {
    page: 0,
    size: 1000,
    filter: '',
    screen: ''
  }
  totalItems: number = 0;
  private searchSubject: Subject<string> = new Subject();
  statusList = [
    { name: 'Tất cả', value: '' },
    { name: 'Trang chủ', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
  ];
  selectedStatus: any = this.statusList[0];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dashboardSrv: DashboardService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getHelps();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getHelps();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Trợ giúp' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.delete(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.delete(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  delete() { }

  getHelps() {
    this.dashboardSrv.getDashboardGuide(this.query.filter, this.query.page, this.query.size, this.selectedStatus.value).subscribe((data) => {
      this.helps = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getHelps();
  }

  // Search
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  setSelectedHelp(help: any) {
    this.selectedHelps = help;
  }

  search() {
    this.query.page = 1;
    this.getHelps();
  }

  resetFilters(): void {
    this.query.filter = '';
    this.query.page = 1;
    this.getHelps();
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getHelps();
  }
}
