import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../core/services/api-core/news.service';
import { NewsCategory } from '../../../core/models/news.model';
import { filter } from 'rxjs';
import { HttpStatus } from '../../../environments/constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  newsByDate: any[] = [];
  newsByView: any[] = [];

  newsCategory: NewsCategory[] = [];
  query = {
    filter: '',
    page: 1,
    size: 10,
    status: -1
  }

  constructor(private newSrv: NewsService) { }
  ngOnInit() {
    this.getNewsCategory();

    this.newSrv.getNews().subscribe((res) => {
      this.news = res;
    });

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

}
