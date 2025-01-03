import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-lop-hoc',
  templateUrl: './chi-tiet-lop-hoc.component.html',
  styleUrl: './chi-tiet-lop-hoc.component.css'
})
export class ChiTietLopHocComponent {
  menuBreachCrumbs: MenuItem[] = [];
  home: MenuItem | undefined;
  id: string | null = null;
  isEditMode: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

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
      { label: 'Lớp học', routerLink: '/quan-tri/lop-hoc' },
      { label: 'Chi tiết lớp học' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  onTabChange(event: any): void {
    if (this.id) {
      this.isEditMode = true;
      this.router.navigate([
        `quan-tri/lop-hoc/${this.id}`,]);
    } else {
      this.isEditMode = false;
      this.router.navigate(['quan-tri/lop-hoc/them-moi']);
    }
  }
}
