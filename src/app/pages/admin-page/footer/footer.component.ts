import { Component, OnInit } from '@angular/core';
import { Footer } from '../../../core/models/slide.model';
import { FooterService } from '../../../core/services/api-core/footer.service';
import { MenuItem } from 'primeng/api';
import { debounceTime, Subject } from 'rxjs';
import { UtilsService } from '../../../common/utils/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  footer: Footer[] = [];
  selectedFooter: any;
  totalItems = 0;
  query = {
    filter: '',
    page: 0,
    size: 10
  }
  private searchSubject: Subject<string> = new Subject();

  constructor(
    private footerSrv: FooterService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getFooter();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getFooter();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Quản lý nội dung tĩnh' },
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
            icon: 'pi pi-times',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];

  }

  deleted() { }

  getFooter() {
    this.footerSrv.getFooter(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.footer = data?.data?.data;
      this.totalItems = data?.data.recordsTotal;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
    })
  }

  // Search
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  search() {
    this.query.page = 1;
    this.getFooter();
  }

  add() { }

  setSelected(footer: any) {
    this.selectedFooter = footer;
  }

  // Pagination
  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getFooter();
  }

}
