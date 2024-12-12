import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-tai-khoan',
  templateUrl: './chi-tiet-tai-khoan.component.html',
  styleUrl: './chi-tiet-tai-khoan.component.css'
})
export class ChiTietTaiKhoanComponent implements OnInit {
  id: string | null = null;
  breadcrum: any[] = [];
  home: MenuItem | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);
    this.breadcrum = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Tài khoản', routerLink: '/quan-tri/tai-khoan' },
      { label: 'Chi tiết tài khoản' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }
}
