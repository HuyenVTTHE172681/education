import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../core/services/api-core/step.service';
import { NewsItemStep } from '../../../core/models/slide.model';

@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrl: './exam-home.component.css',
})
export class ExamHomeComponent implements OnInit {
  listSteps: NewsItemStep[] = [];
  query = {
    filter: '',
    isParent: '',
    page: 0,
    size: 10,
    screen: '',
    status: -1
  }
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  stepsBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  reasonsBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 5, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  infoBreakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  stepsApi: any[] = [];
  constructor(private stepSrv: StepService) { }

  ngOnInit(): void {
    this.getStep();
  }

  getStep() {
    this.stepSrv.getStep(
      this.query.filter,
      this.query.isParent,
      this.query.page,
      this.query.size,
      this.query.screen,
      this.query.status
    ).subscribe({
      next: (data) => {
        this.listSteps = data?.data?.data || [];

        if (this.query.page < 1) {
          this.query.page = 1; // Reset to page 1 if it's invalid
        }
      }
    })
  }
}
