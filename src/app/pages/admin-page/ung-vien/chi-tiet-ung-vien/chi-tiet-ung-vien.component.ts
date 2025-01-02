import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-ung-vien',
  templateUrl: './chi-tiet-ung-vien.component.html',
  styleUrl: './chi-tiet-ung-vien.component.css'
})
export class ChiTietUngVienComponent implements OnInit {
  id: string | null = null;
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  isEditMode: boolean = false;
  recruitmentCandidateForm: FormGroup;

  constructor(
    private router: Router,
  ) {
    this.recruitmentCandidateForm = new FormGroup({

    });
   }

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Ứng viên', routerLink: '/quan-tri/ung-vien' },
      { label: 'Chi tiết Ứng viên' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  goBack() {
    this.router.navigate(['/quan-tri/ung-vien']);
  }

}
