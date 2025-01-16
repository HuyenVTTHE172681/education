import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NotificationService } from '../../../core/services/api-core/notification.service';
import { AdminNotifications } from '../../../core/models/slide.model';
import { debounceTime, Subject } from 'rxjs';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-thong-bao',
  templateUrl: './thong-bao.component.html',
  styleUrl: './thong-bao.component.css'
})
export class ThongBaoComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  notification: AdminNotifications[] = [];
  setSelectedNotification: any = null;
  query = {
    filter: '',
    isRead: -1,
    page: 0,
    size: 10
  }
  totalItems: number = 0;
  private searchSubject: Subject<string> = new Subject();

  constructor(
    private notificationSrv: NotificationService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getNotification();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getNotification();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Thông báo' },
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

  getNotification() {
    this.notificationSrv.getAdminNotifications(this.query.filter, this.query.isRead, this.query.page, this.query.size).subscribe((data) => {
      this.notification = data?.data?.data;
      this.totalItems = data?.data?.recordsTotal;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
    })
  }

  // Pagination
  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getNotification();
  }

  resetFilters(): void {
    this.query.filter = '';
    this.query.page = 1;
    this.getNotification();
  }
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }
  search() {
    this.query.page = 1;
    this.getNotification();
  }

  setSelected(noti: any) {
    this.setSelectedNotification = noti;
  }

}
