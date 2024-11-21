import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrl: './chi-tiet-khoa-hoc.component.css',
})
export class ChiTietKhoaHocComponent implements OnInit {
  items: any[] = [];
  cities: any[] = [];
  checked: boolean = false;

  home: any = { icon: 'pi pi-home', routerLink: '/' };
  constructor() {}

  ngOnInit(): void {
    this.items = [
      { label: 'Electronics' },
      { label: 'Computer' },
      { label: 'Accessories' },
      { label: 'Keyboard' },
      { label: 'Wireless' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
