import { Component, NgModule, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-teacher-quiz',
  templateUrl: './teacher-quiz.component.html',
  styleUrl: './teacher-quiz.component.css',
})
export class TeacherQuizComponent implements OnInit {
  products: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image:
        'https://bsite.net/tntan796/images/638161857720365272_redux%20toolkit.PNG',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 }, // Màn hình rất nhỏ: 1 sản phẩm
    640: { slidesPerView: 2, spaceBetween: 20 }, // Màn hình nhỏ: 2 sản phẩm
    768: { slidesPerView: 3, spaceBetween: 20 }, // Màn hình trung bình: 3 sản phẩm
    1024: { slidesPerView: 4, spaceBetween: 20 }, // Màn hình lớn: 4 sản phẩm
  };

  quizzes: any[] = [];
  teachers: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
      this.homeService.getQuiz().subscribe((res) => (this.quizzes = res));
      this.homeService.getTeachers().subscribe((res) => (this.teachers = res));
  }
}
