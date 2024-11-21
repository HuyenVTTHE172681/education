import { Component, OnInit } from '@angular/core';
import { TestAbilityService } from '../../../services/test-ability.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  classRoom: any[] = [];
  subject: any[] = [];
  selectedClassRoom: string | null = null;
  selectedSubject: string | null = null;
  first = 0;
  rows = 10;

  courses: any[] = [];
  constructor(
    private testAbilitySr: TestAbilityService,
    private courseSrv: CourseService
  ) {}

  ngOnInit(): void {
    this.getClassrooms();
    this.getSubjects();
    this.getCourse();
  }

  getClassrooms(): void {
    this.testAbilitySr.getClassrooms().subscribe((data) => {
      this.classRoom = data.map((item: any) => ({
        name: item.name, // Tên lớp học
        value: item.id, // ID lớp học
      }));
      console.log(this.classRoom);
    });
  }

  getSubjects(): void {
    this.testAbilitySr.getSubjects().subscribe((data) => {
      this.subject = data.map((item: any) => ({
        name: item.name, // Tên môn học
        value: item.id, // ID môn học
      }));
    });
  }


  getCourse(): void {
    this.courseSrv.getCourse().subscribe((data) => {
      this.courses = data.map((item: any) => ({
        id: item.id,
        classRoomId: item.classRoomId,
        courseAvatar: item.courseAvatar,
        courseBanner: item.courseBanner,
        name: item.name,
        price: item.price,
        priceDiscount: item.priceDiscount,
        shortSummary: item.shortSummary,
        averageRating: item.averageRating,
      }));
    });
  }
}
