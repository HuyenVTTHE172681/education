import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrl: './exam-home.component.css',
})
export class ExamHomeComponent implements OnInit {
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
  constructor(private stepSrv: StepService) {}

  ngOnInit(): void {
    this.stepSrv.getSteps().subscribe((data) => {
      this.stepsApi = data;
    });
  }
}
