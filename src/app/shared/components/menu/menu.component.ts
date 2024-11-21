import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  menuAdmin: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenuItems();
    this.getMenuAdmin();
  }

  getMenuItems() {
    this.menuService.getMenuItems().subscribe((items: any) => {
      this.menu = items;
    });
  }

  getMenuAdmin(): void {
    this.menuService.getMenuAdmin().subscribe((items: any) => {
      this.menuAdmin = items;
      console.log('Menu admin: ', this.menuAdmin);
    });
  }
}
