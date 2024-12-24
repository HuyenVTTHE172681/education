import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TestAbilityService } from '../../../services/test-ability.service';
import { Test, TestCategory } from '../../../models/test.model';

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
  testDetail: Test[] = [];
  testCategory: any;

  constructor(private router: Router, private route: ActivatedRoute, private testSrv: TestAbilityService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.id;
    console.log('ID course: ', this.id);

    if (this.id) {
      this.getTestDetail(this.id);
    }

    this.menuBreachCrumbs = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Bài kiểm tra', routerLink: '/quan-tri/bai-kiem-tra' },
      { label: 'Chi tiết bài kiểm tra' },
    ];
    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  getTestDetail(id: string) {
    this.testSrv.getTestNewById(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const testDetail = data.data;
        console.log("Test Data: ", testDetail)
        // console.log("Test Category: ", testDetail?.testCategoryCode)

        this.testCategory = testDetail?.testCategoryCode
        console.log("Test Category: ", this.testCategory)

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
