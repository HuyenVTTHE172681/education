import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NewsCategory } from '../../../core/models/news.model';
import { NewsService } from '../../../core/services/api-core/news.service';
import { CONSTANTS, HttpStatus } from '../../../common/constants';
import { Router } from '@angular/router';
import { UtilsService } from '../../../common/utils/utils.service';
import { debounceTime, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    page: 0,
    size: 10,
    status: -1
  }
  showEditDialog: boolean = false;
  isEditMode: boolean = false;
  newsForm: FormGroup;
  private searchSubject: Subject<string> = new Subject();
  constructor(
    private newSrv: NewsService,
    private router: Router,
    public utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.newsForm = this.formBuilder.group({
      createdBy: [''],
      createdDate: [''],
      id: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      order: [0, [Validators.required, Validators.min(1)]],
      status: [0],
      totalFiltered: [0]
    })
  }

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
            command: () => this.showEdit(), // Open sidebar on click
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
    const documentId = this.selectedNews[0].id;

    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_DANH_MUC_TIN_TUC,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',

      accept: () => {
        this.newSrv.deletedNewsCategory(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br',
            life: 3000
          });
          this.getNewsCategory();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br',
          life: 3000
        });
      },
    })
  }

  addNew() {
    this.router.navigate(['/quan-tri/danh-muc-tin-tuc/them-moi']);
  }

  getNewsCategory() {
    this.newSrv.getNewsCategory(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.news = res?.data?.data || [];
        this.totalItems = res?.data?.recordsTotal || 0;

        if (this.query.page < 1) {
          this.query.page = 1; // Reset to page 1 if it's invalid
        }
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
    this.selectedNews = [news];
  }

  showAdd() {
    this.newsForm.reset();
    this.newsForm.patchValue({
      createdBy: '',
      createdDate: new Date().toISOString(),
      id: '',
      modifiedBy: '',
      modifiedDate: new Date().toISOString(),
      name: '',
      order: 0,
      status: 0,
      totalFiltered: 0
    })
    this.showEditDialog = true;
    this.isEditMode = false;
  }

  showEdit() {
    const selectedNew = this.selectedNews[0];
    const id = selectedNew.id;

    // Get the news by ID
    if (id) {
      this.newSrv.getNewsCategoryById(id).subscribe((res) => {
        if (res.statusCode === HttpStatus.OK) {
          this.patchNewsForm(res.data);
          this.showEditDialog = true;
          this.isEditMode = true;
        }
      })
    }

  }

  patchNewsForm(news: any) {
    this.newsForm.patchValue({
      createdBy: news.createdBy || '',
      createdDate: new Date().toISOString(),
      id: news.id,
      modifiedBy: news.modifiedBy || '',
      modifiedDate: new Date().toISOString(),
      name: news.name || '',
      order: news.order || 0,
      status: news.status === 1,
      totalFiltered: news.totalFiltered || 0
    });
  }

  save() {
    this.newsForm.markAllAsTouched();

    if (this.newsForm.valid) {
      const formValue = { ...this.newsForm.value };
      formValue.status = formValue.status ? 1 : 0;
      formValue.order = formValue.order || 0;

      this.newSrv.updateNewsCategory(formValue).subscribe((res) => {
        if (res.statusCode === HttpStatus.OK) {
          let detail = this.isEditMode ? CONSTANTS.MESSAGE_ALERT.UPDATE_SUCCESSFUL : CONSTANTS.MESSAGE_ALERT.ADD_SUCCESSFUL
          let summary = this.isEditMode ? CONSTANTS.SUMMARY.SUMMARY_UPDATE_SUCCESSFUL : CONSTANTS.SUMMARY.SUMMARY_ADD_SUCCESSFUL

          this.messageService.add({
            severity: 'success',
            summary: summary,
            detail: detail,
            key: 'br',
            life: 3000
          });
          this.showEditDialog = false;
          this.getNewsCategory();
        }
      },
        (err) => {
          this.messageService.add({
            severity: 'info',
            summary: CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL,
            detail: err.message,
            key: 'br',
            life: 3000
          });
        }
      )
    } else {
      this.messageService.add({
        severity: 'info',
        summary: CONSTANTS.SUMMARY.SUMMARY_INVALID_DATA,
        detail: CONSTANTS.MESSAGE_ALERT.INVALID_DATA,
        key: 'br',
        life: 3000
      });
    }
  }

}
