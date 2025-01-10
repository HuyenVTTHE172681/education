import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-tin-tuc',
  templateUrl: './chi-tiet-tin-tuc.component.html',
  styleUrl: './chi-tiet-tin-tuc.component.css'
})
export class ChiTietTinTucComponent implements OnInit {
  menuBreachCrumbs: MenuItem[] = [];
  home: MenuItem | undefined;
  id: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initParams();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.isEditMode = !!this.id;
    });
  }

  initParams() {
    this.menuBreachCrumbs = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Tin tức', routerLink: '/quan-tri/tin-tuc' },
      { label: 'Chi tiết tin tức' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  onTabChange(event: any): void {
    if (this.id) {
      this.isEditMode = true;
      this.router.navigate([
        `quan-tri/tin-tuc/${this.id}`,]);
    } else {
      this.isEditMode = false;
      this.router.navigate(['quan-tri/tin-tuc/them-moi']);
    }
  }
}
