import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-cau-hoi',
  templateUrl: './chi-tiet-cau-hoi.component.html',
  styleUrl: './chi-tiet-cau-hoi.component.css'
})
export class ChiTietCauHoiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];

  constructor() { }

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri/tong-quan' },
      { label: 'Bài kiểm tra', routerLink: '/quan-tri/bai-kiem-tra' },
      { label: 'Chi tiết câu hỏi' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }
}
