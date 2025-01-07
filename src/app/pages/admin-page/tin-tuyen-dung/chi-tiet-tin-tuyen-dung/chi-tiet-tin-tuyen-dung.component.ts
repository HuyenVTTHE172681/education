import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-tin-tuyen-dung',
  templateUrl: './chi-tiet-tin-tuyen-dung.component.html',
  styleUrl: './chi-tiet-tin-tuyen-dung.component.css'
})
export class ChiTietTinTuyenDungComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Tuyển dụng', routerLink: '/quan-tri/tuyen-dung' },
      { label: 'Chi tiết Tuyển dụng' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  goBack() {
    this.router.navigate(['/quan-tri/tuyen-dung']);
  }


}
