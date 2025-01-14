import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../core/services/api-core/news.service';
import { News, NewsCategory } from '../../../core/models/news.model';
import { filter } from 'rxjs';
import { HttpStatus } from '../../../common/constants';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  newsByDate: any[] = [];
  newsByView: any[] = [];

  newsCategory: NewsCategory[] = [];
  query = {
    categoryId: '',
    filter: '',
    page: 1,
    size: 10,
    status: -1
  }

  constructor(private newSrv: NewsService) { }
  ngOnInit() {
    this.getNewsCategory();
    this.getNews();


    this.newSrv.getNewsByDate().subscribe((res) => {
      this.newsByDate = res;
    });

    this.newSrv.getNewsByView().subscribe((res) => {
      this.newsByView = res;
    })
  }

  getNewsCategory() {
    this.newSrv.getNewsCategory(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.newsCategory = res?.data?.data || [];
      }
    })
  }

  getNews() {
    this.newSrv.getNews(this.query.categoryId || '', this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.news = res?.data?.data || [];
      }
    })
  }

}
