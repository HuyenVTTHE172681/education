import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from '../../../services/recruitment';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.css',
})
export class RecruitmentComponent implements OnInit {
  steps: any[] = [];
  recruitment: any[] = [];
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

  constructor(private recruitmentSrv: RecruitmentService) {}

  ngOnInit(): void {
    this.loadSteps();
    this.loadRecruitments();
  }

  loadSteps() {
    this.recruitmentSrv.getSteps().subscribe((data) => {
      this.steps = data;
    });
  }

  loadRecruitments() {
    this.recruitmentSrv.getRecruits().subscribe((data) => {
      this.recruitment = data;
    });
  }

  // loadRecruitments() {
  //   this.recruitmentSrv.getRecruits().subscribe((data) => {
  //     this.recruitment = data.filter((item) => item.status === 1);
  //   });
  // }
}
