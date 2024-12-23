import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { InformationComponent } from './information/information.component';
import { ChuongTrinhHocComponent } from './chuong-trinh-hoc/chuong-trinh-hoc.component';
import { ScoresComponent } from './scores/scores.component';
import { FeedbackComponent } from './feedback/feedback.component';

@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrl: './chi-tiet-khoa-hoc.component.css',
})
export class ChiTietKhoaHocComponent implements OnInit {
  menuBreachCrumbs: any[] = [];
  home: MenuItem | undefined;
  checked: boolean = false;
  id: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);
    this.menuBreachCrumbs = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Khóa học', routerLink: '/quan-tri/khoa-hoc' },
      { label: 'Chi tiết khóa học' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };

  }

  onTabChange(event: any): void {
    if (this.id) {
      this.router.navigate([
        `quan-tri/chi-tiet-khoa-hoc/${this.id}/${event.index}`,
      ]); // Điều hướng đến tab mới
    }
  }
}
