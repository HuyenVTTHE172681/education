import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UtilsService } from '../../../utils/utils.service';
import { NewsItemStep, Step } from '../../../core/models/slide.model';
import { StepService } from '../../../core/services/api-core/step.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.css'
})
export class StepComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  itemsChild: MenuItem[] = [];
  expandedRows = {};
  listSteps: NewsItemStep[] = [];
  selectedStep: NewsItemStep = new NewsItemStep();
  query = {
    filter: '',
    isParent: '',
    page: 0,
    size: 10,
    screen: '',
    status: -1
  }
  statusList = [
    { name: 'Trang chủ', value: 'trang-chu' },
    { name: 'Tuyển dụng', value: 'tuyen-dung' },
  ];
  selectedStatus: any = this.statusList[0];
  totalItems: number = 0;
  private searchSubject: Subject<string> = new Subject();
  selectedStepChild: Step = new Step();


  constructor(
    public utilsService: UtilsService,
    private stepSrv: StepService
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.getStep();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getStep();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Step' },
    ];
    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Step con',
            icon: 'pi pi-plus',
            command: () => this.deleted(), // Open sidebar on click
          },
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Open sidebar on click
          }
        ],
      },
    ];

    this.itemsChild = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Open sidebar on click
          }
        ],
      },
    ];
  }

  deleted() { }

  getStep() {
    this.stepSrv.getStep(
      this.query.filter,
      this.query.isParent,
      this.query.page,
      this.query.size,
      this.selectedStatus.value,
      this.query.status
    ).subscribe({
      next: (data) => {
        this.totalItems = data?.data?.recordsTotal || 0;
        this.listSteps = data?.data?.data || [];

        this.listSteps.forEach((step: NewsItemStep) => {
          step.steps = step.steps || [];
        })

        if (this.query.page < 1) {
          this.query.page = 1; // Reset to page 1 if it's invalid
        }
      }
    })
  }

  onPageChange(event: any) {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getStep();
  }

  search() {
    this.query.page = 1;
    this.getStep();
  }

  resetFilters(): void {
    this.query.filter = '';
    this.query.page = 1;
    this.getStep();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getStep();
  }

  setSelectedStep(step: NewsItemStep) {
    this.selectedStep = step;
  }

  setSelectedStepChild(child: Step) {
    this.selectedStepChild = child;
  }
}
