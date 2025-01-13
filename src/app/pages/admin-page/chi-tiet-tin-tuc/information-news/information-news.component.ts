import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { News, NewsCategory } from '../../../../core/models/news.model';
import { NewsService } from '../../../../core/services/api-core/news.service';
import { CONSTANTS, HttpStatus } from '../../../../environments/constants';

@Component({
  selector: 'app-information-news',
  templateUrl: './information-news.component.html',
  styleUrl: './information-news.component.css'
})
export class InformationNewsComponent implements OnInit {
  newsForm: FormGroup;
  isEditMode: boolean = false;
  id: string | null = null;
  news: News[] = [];
  newsCategory: NewsCategory[] = [];
  query = {
    filter: '',
    page: 0,
    size: 1000,
    status: -1
  }

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private newsSrv: NewsService,
  ) {
    this.newsForm = this.formBuilder.group({
      author: [''],
      avatar: [''],
      categoryId: [''],
      categoryName: [''],
      content: [''],
      createBy: [''],
      createdDate: [''],
      id: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      newsRelations: [[]],
      order: [1],
      rate: [1],
      shortContent: [''],
      status: [0],
      tags: [''],
      title: [''],
      totalFiltered: [1],
      view: [0]
    })
  }

  ngOnInit(): void {
    this.getNewsCategory();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id && this.id !== 'null' && this.id !== 'undefined') {
        this.isEditMode = true;
        this.getNewsById(this.id);
      } else {
        this.isEditMode = false;
        this.newsForm.reset();
      }
    });
  }

  patchForm(news: News) {
    this.newsForm.patchValue({
      author: news.author || '',
      avatar: news.avatar || '',
      categoryId: news.categoryId || '',
      categoryName: news.categoryName || '',
      content: news.content || '',
      createBy: news.createdBy || '',
      createdDate: news.createdDate || '',
      id: news.id || '',
      modifiedBy: news.modifiedBy || '',
      modifiedDate: news.modifiedDate || '',
      newsRelations: news.newsRelations || '',
      order: news.order,
      rate: news.rate,
      shortContent: news.shortContent || '',
      status: news.status === 1,
      tags: news.tags || '',
      title: news.title || '',
      totalFiltered: news.totalFiltered,
      view: news.view ?? 0
    })
  }

  getNewsById(id: string) {
    this.newsSrv.getNewsById(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const newsDetail = data?.data || [];
        this.patchForm(newsDetail);
      }
    })
  }

  getNewsCategory() {
    this.newsSrv.getNewsCategory(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.newsCategory = res?.data?.data || [];
      }
    })
  }

  update() {
    if (this.newsForm.valid) {
      const formValue = { ...this.newsForm.value };
      formValue.status = formValue.status ? 1 : 0;
      formValue.view = formValue.view ? 1 : 0;

      this.newsSrv.updateNews(formValue).subscribe({
        next: (data) => {
          if (data.statusCode === HttpStatus.OK) {
            let detail = this.isEditMode ? CONSTANTS.MESSAGE_ALERT.UPDATE_SUCCESSFUL : CONSTANTS.MESSAGE_ALERT.ADD_SUCCESSFUL
            let summary = this.isEditMode ? CONSTANTS.SUMMARY.SUMMARY_UPDATE_SUCCESSFUL : CONSTANTS.SUMMARY.SUMMARY_ADD_SUCCESSFUL

            this.messageService.add({
              severity: 'success',
              summary: summary,
              detail: detail,
              key: 'br',
              life: 3000
            });
            setTimeout(() => {
              this.router.navigate(['/quan-tri/tin-tuc']);
            }, 1000);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'info',
            summary: CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL,
            detail: err.message,
            key: 'br',
            life: 3000
          });
        }
      })
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

  goBack() {
    this.router.navigate(['/quan-tri/tin-tuc'])
  }


}
