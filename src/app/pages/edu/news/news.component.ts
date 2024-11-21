import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  newsCategory: any[] = [];
  newsByDate: any[] = [];
  newsByView: any[] = [];

  constructor(private newSrv: NewsService) {}
  ngOnInit() {

    this.newSrv.getCategory().subscribe((res) => {
      this.newsCategory = res;
    });

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
  
}
