import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  // products: any[] = [
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image:
  //       'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image:
  //       'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image:
  //       'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image:
  //       'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image:
  //       'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image:
  //       'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5,
  //   },
  // ];
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  products: any[] = [];

  slider: any[] = [];
  classRooms: any[] = [];

  breakpointSlides = {
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
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    // this.homeService.getSubjects().subscribe((res) => (this.products = res));
    this.homeService.getSubjects().subscribe((res) => (this.products = res));
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
