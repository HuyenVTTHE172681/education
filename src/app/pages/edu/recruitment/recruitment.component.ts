import { Component, OnInit } from '@angular/core';
import { Recruit } from '../../../core/models/recruitment.model';
import { RecruitmentService } from '../../../core/services/api-core/recruitment.services';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.css',
})
export class RecruitmentComponent implements OnInit {
  steps: any[] = [];
  recruitment: Recruit[] = [];
  totalItems = 0;
  query = {
    filter: '',
    page: 1,
    size: 10,
    status: -1,
  }
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  stepsBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  stepsBreakpoints2 = {
    320: { slidesPerView: 1, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  constructor(private recruitmentSrv: RecruitmentService) { }

  ngOnInit(): void {
    this.loadSteps();
    this.getRecruitment();
  }

  loadSteps() {
    this.recruitmentSrv.getSteps().subscribe((data) => {
      this.steps = data;
    });
  }

  getRecruitment() {
    this.recruitmentSrv.getRecruitment(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe((data) => {
      this.recruitment = data?.data?.data || [];
    })
  }


}
