import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Slide } from '../../../core/models/slide.model';
import { StepService } from '../../../core/services/api-core/step.service';
import { debounceTime, Subject } from 'rxjs';
import { UtilsService } from '../../../common/utils/utils.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css'
})
export class SlideComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  slider: Slide[] = [];
  selectedSlider: any = null;
  totalItems: number = 0;
  query = {
    filter: '',
    page: 0,
    size: 10,
    screen: '',
    status: -1
  }
  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Hiển thị', value: 1 },
    { name: 'Ẩn', value: 0 },
  ];
  selectedStatus: any = this.statusList[0];
  private searchSubject: Subject<string> = new Subject();

  constructor(
    private sliderSrv: StepService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getSlide();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getSlide();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Slide' },
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

  getSlide() {
    this.sliderSrv.getSlide(this.query.filter, this.query.page, this.query.size, this.query.screen, this.selectedStatus.value).subscribe((data) => {
      this.slider = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;

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
    this.getSlide();
  }

  add() {

  }

  resetFilters(): void {
    this.query.filter = '';
    this.query.page = 1;
    this.getSlide();
  }

  setSelected(slider: Slide) {
    this.selectedSlider = slider;
  }

  // Pagination
  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getSlide();
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getSlide();
  }



}
