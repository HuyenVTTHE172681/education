import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrl: './chi-tiet-khoa-hoc.component.css',
})
export class ChiTietKhoaHocComponent implements OnInit {
  menuBreachCrumbs: MenuItem[] = [];
  home: MenuItem = [];

  constructor() { }

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.menuBreachCrumbs = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Khóa học', routerLink: '/quan-tri/khoa-hoc' },
      { label: 'Chi tiết khóa học' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }
}
