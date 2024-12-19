import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-bai-hoc',
  templateUrl: './chi-tiet-bai-hoc.component.html',
  styleUrl: './chi-tiet-bai-hoc.component.css'
})
export class ChiTietBaiHocComponent implements OnInit {
  menuBreachCrumbs: any[] = [];
  home: MenuItem | undefined;
  checked: boolean = false;
  id: string | null = null;
  isEditMode: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.id;
    console.log('ID course: ', this.id);

    this.menuBreachCrumbs = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Bài kiểm tra', routerLink: '/quan-tri/bai-kiem-tra' },
      { label: 'Chi tiết bài kiểm tra' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };

  }

  onTabChange(event: any): void {
    if (this.id) {
      this.isEditMode = true;
      this.router.navigate([
        `quan-tri/bai-kiem-tra/${this.id}`]);
    } else {
      this.isEditMode = false;
      this.router.navigate(['quan-tri/bai-kiem-tra/them-moi']);
    }
  }
}
