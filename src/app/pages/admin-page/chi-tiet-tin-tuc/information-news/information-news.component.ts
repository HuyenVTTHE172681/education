import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { News, NewsCategory } from '../../../../core/models/news.model';
import { NewsService } from '../../../../core/services/api-core/news.service';
import { HttpStatus } from '../../../../environments/constants';

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
      view: [1]
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

  patchForm(news: any) {
    this.newsForm.patchValue({
      author: news.author || '',
      avatar: news.avatar || '',
      categoryId: news.categoryId || '',
      categoryName: news.categoryName || '',
      content: news.content || '',
      createBy: news.createBy || '',
      createdDate: news.createdDate || '',
      id: news.id || '',
      modifiedBy: news.modifiedBy || '',
      modifiedDate: news.modifiedDate || '',
      newsRelations: news.newsRelations || '',
      order: news.order || '',
      rate: news.rate,
      shortContent: news.shortContent || '',
      status: news.status === 1,
      tags: news.tags || '',
      title: news.title || '',
      totalFiltered: news.totalFiltered === 1,
      view: news.view === 1
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

  update() { }

  goBack() {
    this.router.navigate(['/quan-tri/tin-tuc'])
  }


}
