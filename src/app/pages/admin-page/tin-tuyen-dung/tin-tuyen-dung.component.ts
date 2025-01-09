import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Recruit } from '../../../core/models/recruitment.model';
import { UtilsService } from '../../../core/utils/utils.service';
import { debounceTime, Subject } from 'rxjs';
import { RecruitmentService } from '../../../core/services/api-core/recruitment.services';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../environments/constants';

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
  selectedRecruit: any;
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
    private recruitmentSrv: RecruitmentService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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

  edit() {
    this.router.navigate(['/quan-tri/tuyen-dung/', this.selectedRecruit?.id]);
  }

  deleted() {
    const documentId = this.selectedRecruit?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_TEACHER,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.recruitmentSrv.deleteRecruitment(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br', life: 3000
          });
          this.getRecruitment();
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

  getRecruitment() {
    this.recruitmentSrv.getRecruitment(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe((data) => {
      this.recruitment = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
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

  addNew() {
    this.router.navigate(['/quan-tri/tuyen-dung/them-moi']);
  }

}
