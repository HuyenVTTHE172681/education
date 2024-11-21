import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrl: './khoa-hoc.component.css',
})
export class KhoaHocComponent implements OnInit {
  course: any[] = [];
  items: any[] = [];
  home: any = [];

  constructor(private courseSrv: CourseService) {}

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
}
