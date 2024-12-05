import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrl: './khoa-hoc.component.css',
})
export class KhoaHocComponent implements OnInit {
  course: Course[] = [];
  items: any[] = [];
  home: any = [];

  constructor(private courseSrv: CourseService) { }

  ngOnInit(): void {
    this.getKhoaHoc();

    this.items = [
      { label: 'Electronics' },
      { label: 'Computer' },
      { label: 'Accessories' },
      { label: 'Keyboard' },
      { label: 'Wireless' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  getKhoaHoc(): void {
    this.courseSrv.getKhoaHoc().subscribe((data) => {
      this.course = data;
    });
  }

  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'primary';

      case 0:
        return 'danger';

      default:
        return 'warning';
    }
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'Hiển thị' : 'Ẩn';
  }
}
