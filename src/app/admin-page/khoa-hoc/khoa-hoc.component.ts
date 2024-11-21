import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrl: './khoa-hoc.component.css'
})
export class KhoaHocComponent implements OnInit {
  course: any[] = [];

  constructor(private courseSrv: CourseService) { }

  ngOnInit(): void {
    this.getKhoaHoc();
  }

  getKhoaHoc(): void {
    this.courseSrv.getKhoaHoc().subscribe((data) => {
      this.course = data;
    })
  }

}
