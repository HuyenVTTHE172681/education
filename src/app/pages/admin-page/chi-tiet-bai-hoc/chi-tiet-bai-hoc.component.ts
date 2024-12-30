import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TestAbilityService } from '../../../core/services/test-ability.service';
import { Test } from '../../../core/models/test.model';
import { HttpStatus } from '../../../environments/constants';

@Component({
  selector: 'app-chi-tiet-bai-hoc',
  templateUrl: './chi-tiet-bai-hoc.component.html',
  styleUrl: './chi-tiet-bai-hoc.component.css'
})
export class ChiTietBaiHocComponent implements OnInit {
  menuBreachCrumbs: MenuItem[] = [];
  home: MenuItem | undefined;
  checked: boolean = false;
  id: string | null = null;
  isEditMode: boolean = false;
  testDetail: Test[] = [];
  testCategory: any;

  constructor(private router: Router, private route: ActivatedRoute, private testSrv: TestAbilityService) { }

  ngOnInit(): void {
    this.initParams();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.isEditMode = !!this.id;
      if (this.id) {
        this.getTestDetail(this.id);
      }
    });

  }

  initParams() {
    this.menuBreachCrumbs = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Bài kiểm tra', routerLink: '/quan-tri/bai-kiem-tra' },
      { label: 'Chi tiết bài kiểm tra' },
    ];
    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  getTestDetail(id: string) {
    this.testSrv.getTestNewById(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const testDetail = data?.data || [];

        this.testCategory = testDetail?.testCategoryCode

      }
    })
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
