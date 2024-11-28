import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { IResponeList } from '../../../../models/common.model';
import { ClassRoom } from '../../../../models/classRoom.model';
import { Teacher } from '../../../../models/teacher.model';
import { TeacherService } from '../../../../services/teacher.service';
import { CourseService } from '../../../../services/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course, CourseYear } from '../../../../models/course.model';
import { config } from 'rxjs';
import { Subject } from '../../../../models/subject.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  id: string | null = null;
  accountId: string | null = null;
  page: number = 0;
  size: number = 10000;
  searchText: string = '';
  classRoomId: string | null = null;

  classRoom: ClassRoom[] = [];
  teacher: Teacher[] = [];
  courseYears: CourseYear[] = [];
  subject: Subject[] = [];
  status: number = -1;
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
      courseAvatar: [],
      courseBanner: [],
      isShowHome: [],
      status: [],
      classRoom: [],
      courseYears: [],
      teacher: this.formBuilder.control({ value: null, disabled: true }),
      courseInfo1: [],
      courseInfo2: [],
      promotionTime: [],
      shortSummary: [],
      subject: [],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.getCourseById(this.id);
    }
    this.getClassRoom();
    this.getTeachers();
    this.getCourseYears();
  }

  getSubjectsByClassRoomId(classRoomId: string): void {
    this.courseSrv
      .getSubject(classRoomId, this.searchText, this.page, this.size)
      .subscribe({
        next: (response) => {
          // console.log('API Response of Subject:', response);
          this.subject = response;

          const subjectId = this.courseForm.get('subject')?.value?.id;
          if (subjectId) {
            const selectedSubject = this.subject.find(
              (subject) => subject.id === subjectId
            );
            this.courseForm.patchValue({
              subject: selectedSubject || null, // Nếu không tìm thấy, gán null
            });
          }
        },
        error: () => {
          console.error('Error fetching subjects.');
        },
      });
  }

  getCourseYears() {
    this.courseSrv.getCourseYear('', 0, 1000, -1).subscribe({
      next: (data) => {
        this.courseYears = data;
        console.log('Course Years:', this.courseYears);
      },
      error: (err) => {
        console.error('Error loading course years:', err);
      },
    });
  }
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<ClassRoom>) => {
          this.classRoom = data.data.data;
        },
      });
  }

  getTeachers() {
    this.teacherSrv
      .getTeachers(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<Teacher>) => {
          this.teacher = data.data.data;
          console.log('Teacher: ', this.teacher);

          this.courseForm.get('teacher')?.enable();
        },
        error: (err) => {
          console.log('Error loading teachers: ', err);
        },
      });
  }

  getCourseById(id: string, accountId: string = 'null') {
    this.courseSrv.getCourseById(id, accountId).subscribe({
      next: (data) => {
        if (data.statusCode === 200) {
          const courseData = data.data;
          const teacher =
            courseData.teacher && courseData.teacher.length > 0
              ? courseData.teacher[0]
              : null;
          // Cập nhật danh sách giáo viên và form
          this.courseForm.patchValue({
            id: courseData.id,
            name: courseData.name,
            price: courseData.price,
            priceDiscount: courseData.priceDiscount,
            courseAvatar: courseData.courseAvatar,
            courseBanner: courseData.courseBanner,
            promotionTime: courseData.promotionTime,
            isShowHome: courseData.isShowHome === 1, // Chuyển 0/1 -> true/false
            status: courseData.status === 1,
            classRoom:
              this.classRoom.find(
                (room) => room.id === courseData.classRoomId
              ) || null,
            teacher: teacher ? [teacher] : [], // Set teacher if available
            courseYears: this.courseYears.find(
              (years) => years.id === courseData.courseYearId
            ),
            courseInfo1: courseData.courseInfo1,
            courseInfo2: courseData.courseInfo2,
            shortSummary: courseData.shortSummary,
            subject: { id: courseData.subjectId },
          });

          console.log('Course Data ID:', courseData.id);
          console.log('Form value: ', this.courseForm.value);
          console.log(
            'Form Value - Subject:',
            this.courseForm.get('subject')?.value
          );

          if (courseData.classRoomId) {
            console.log('Fetching subjects for ClassRoomId:', this.classRoomId);
            this.getSubjectsByClassRoomId(courseData.classRoomId);
          } else {
            console.warn('ClassRoomId is missing. Skipping subject fetch.');
          }
        }
      },
      error: () => {
        console.log('Lỗi khi lấy thông tin khóa học');
      },
    });
  }

  onTeacherChange(event: any): void {
    console.log('Selected Teachers:', event.value);
  }
  convertToBoolean(value: number): boolean {
    return value === 1;
  }

  convertToNumber(value: boolean): number {
    return value ? 1 : 0;
  }
}
