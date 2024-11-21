import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrl: './chi-tiet-khoa-hoc.component.css',
})
export class ChiTietKhoaHocComponent implements OnInit {
  menuBreachCrumbs: any[] = [];
  home: MenuItem | undefined;
  cities: any[] = [];
  checked: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.menuBreachCrumbs = [
      { label: 'Quản trị' },
      { label: 'Khóa học' },
      { label: 'Chi tiết khóa học' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
