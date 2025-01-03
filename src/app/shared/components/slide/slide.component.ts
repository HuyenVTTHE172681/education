import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../core/services/api-core/home.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css',
})
export class SlideComponent implements OnInit {
  // images: any[] = [
  //   {
  //     previewImageSrc:
  //       'https://bsite.net/tntan796/images/638154670041136908_cover2.jpg',
  //     thumbnailImageSrc:
  //       'https://bsite.net/tntan796/images/638154670041136908_cover2.jpg',
  //     alt: 'Cascading Style Sheet',
  //     title: 'CSS',
  //   },
  //   {
  //     previewImageSrc:
  //       'https://api.hochieuqua.vn/images/638094115717860831_study%203.gif',
  //     thumbnailImageSrc:
  //       'https://api.hochieuqua.vn/images/638094115717860831_study%203.gif',
  //     alt: 'Angular for Front end',
  //     title: 'Angular',
  //   },
  //   {
  //     previewImageSrc:
  //       'https://api.hochieuqua.vn/images/638094115853590170_study%202.gif',
  //     thumbnailImageSrc:
  //       'https://api.hochieuqua.vn/images/638094115853590170_study%202.gif',
  //     alt: 'Java Programming Language',
  //     title: 'Java',
  //   },
  //   {
  //     previewImageSrc:
  //       'https://api.hochieuqua.vn/images/638238570663251194_33.png',
  //     thumbnailImageSrc:
  //       'https://api.hochieuqua.vn/images/638238570663251194_33.png',
  //     alt: 'HyperText Markup Language',
  //     title: 'HTML',
  //   },
  //   {
  //     previewImageSrc:
  //       'https://api.hochieuqua.vn/images/638228999784312943_Picture4.png',
  //     thumbnailImageSrc:
  //       'https://api.hochieuqua.vn/images/638228999784312943_Picture4.png',
  //     alt: 'HyperText Markup Language',
  //     title: 'HTML',
  //   },
  //   {
  //     previewImageSrc:
  //       'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png',
  //     thumbnailImageSrc:
  //       'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png',
  //     alt: 'HyperText Markup Language',
  //     title: 'HTML',
  //   },
  // ];
  // responsiveOptions: any[] = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 3,
  //     numScroll: 3,
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 2,
  //     numScroll: 2,
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1,
  //     numScroll: 1,
  //   },
  // ];

  slider: any[] = [];
  classRooms: any[] = [];

  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  backgroundColors = [
    'rgb(238, 130, 238)',
    'rgb(255, 186, 0)',
    'rgb(135, 206, 250)',
    'rgb(255, 99, 71)',
  ];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getSlider().subscribe((res) => (this.slider = res));
    this.homeService
      .getClassRooms()
      .subscribe((res) => (this.classRooms = res));

    console.log(this.slider);
  }

  // Hàm trả về màu nền theo chỉ số của lớp học
  getBackgroundColor(index: number): string {
    return this.backgroundColors[index % this.backgroundColors.length];
  }
}
