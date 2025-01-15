import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];

  constructor() { }

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Menu' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

}
