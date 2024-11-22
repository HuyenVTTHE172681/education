import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { IResponeList } from '../../../../models/common.model';
import { ClassRoom } from '../../../../models/classRoom.model';
import { Teacher } from '../../../../models/teacher.model';
import { TeacherService } from '../../../../services/teacher.service';
import { CourseService } from '../../../../services/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../../../models/course.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent implements OnInit {
  cities: any[] = [];
  id: string | null = null;
  page: number = 1;
  size: number = 10000;
  searchText: string = '';

  classRoom: ClassRoom[] = [];
  teacher: Teacher[] = [];
  courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classRoomSrv: ClassRoomService,
    private teacherSrv: TeacherService,
    private courseSrv: CourseService,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      id: [],
      name: [],
      price: [],
      priceDiscount: [],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.getCourseById(this.id);
    }
    this.getClassRoom();
    this.getTeachers();

    console.log('Id course in infor comp:' + this.id);
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<ClassRoom>) => {
          this.classRoom = data.data.data;
          console.log('Class room in infor comp: ', this.classRoom);
        },
      });
  }

  getTeachers() {
    this.teacherSrv
      .getTeachers(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<Teacher>) => {
          this.teacher = data.data.data;
          console.log('Teacher in infor comp: ', this.teacher);
        },
      });
  }

  getCourseById(id: string) {
    this.courseSrv.getCourseById(id).subscribe({
      next: (data) => {
        this.courseForm.patchValue(data.data);
      },
    });
  }
}
