import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { TeacherService } from '../../../../services/teacher.service';
import { IResponeList } from '../../../../models/common.model';
import { ClassRoom } from '../../../../models/classRoom.model';
import { Subject as SubjectModel } from '../../../../models/subject.model';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../services/subject.service';

@Component({
  selector: 'app-dashboard-course',
  templateUrl: './dashboard-course.component.html',
  styleUrl: './dashboard-course.component.css'
})
export class DashboardCourseComponent implements OnInit {
  adminCourse: any[] = [];
  page: number = 1;
  size: number = 1000;
  filter: string = '';
  selectedClassroom: string | undefined;
  selectedSubject: string | undefined;
  accountId: string = '';
  classRoom: ClassRoom[] = [];
  subject: SubjectModel[] = [];
  searchText: string = '';

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private classRoomSrv: ClassRoomService, private dashboardSrv: DashboardService, private subjectSrv: SubjectService) {
  }

  ngOnInit(): void {
    this.getDashboardAdminCourse();
    this.getClassRoom();
  }

  getDashboardAdminCourse() {
    this.dashboardSrv.getDashboardAdminCourse(this.page, this.size, this.filter, this.selectedClassroom || '', this.selectedSubject || '', this.accountId).subscribe({
      next: (data: IResponeList<any>) => {
        this.adminCourse = data.data.data;
        // console.log("Admin course: ", this.adminCourse)
      }
    })
  }

  // Get classrom
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.page, this.size, this.searchText)
      .subscribe({
        next: (data: IResponeList<ClassRoom>) => {
          this.classRoom = data.data.data;
        },
      });
  }

  // Get subject
  getSubjectsByClassRoomId(classRoomId: string): void {
    this.subjectSrv
      .getSubjectByCourse(classRoomId, this.searchText, this.page, this.size)
      .subscribe({
        next: (response) => {
          this.subject = response.data.data;
        },
        error: () => {
          // console.error('Error fetching subjects.');
          alert('Error fetching subjects.');
        },
      });
  }

  onSearchChange(searchValue: string): void {
    this.filter = searchValue.trim();
    this.searchSubject.next(this.filter);
  }
  searchCourse(): void {
    // console.log('Searching with filter:', this.filter);
    this.page = 1;
    this.getDashboardAdminCourse();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;

    this.filter = '';
    this.page = 1;


    this.getDashboardAdminCourse();
  }
}
