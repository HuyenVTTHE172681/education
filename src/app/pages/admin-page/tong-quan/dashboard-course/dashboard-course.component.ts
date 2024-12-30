import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../../../core/services/classRoom.service';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { IResponeList } from '../../../../core/models/common.model';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { Subject as SubjectModel } from '../../../../core/models/subject.model';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../core/services/subject.service';
import { DashboardAdminCourse } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard-course',
  templateUrl: './dashboard-course.component.html',
  styleUrl: './dashboard-course.component.css'
})
export class DashboardCourseComponent implements OnInit {
  adminCourse: DashboardAdminCourse[] = [];
  query = {
    page: 1,
    size: 1000,
    filter: '',
    searchText: '',
    accountId: ''
  }
  selectedClassroom: string | undefined;
  selectedSubject: string | undefined;
  classRoom: ClassRoom[] = [];
  subject: SubjectModel[] = [];

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private classRoomSrv: ClassRoomService, private dashboardSrv: DashboardService, private subjectSrv: SubjectService) {
  }

  ngOnInit(): void {
    this.getDashboardAdminCourse();
    this.getClassRoom();
  }

  getDashboardAdminCourse() {
    this.dashboardSrv.getDashboardAdminCourse(this.query.page, this.query.size, this.query.filter, this.selectedClassroom || '', this.selectedSubject || '', this.query.accountId).subscribe({
      next: (data: IResponeList<DashboardAdminCourse>) => {
        this.adminCourse = data?.data?.data || [];
        // console.log("Admin course: ", this.adminCourse)
      }
    })
  }

  // Get classrom
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.query.page, this.query.size, this.query.searchText)
      .subscribe({
        next: (data: IResponeList<ClassRoom>) => {
          this.classRoom = data?.data?.data || [];
        },
      });
  }

  // Get subject
  getSubjectsByClassRoomId(classRoomId: string): void {
    this.subjectSrv
      .getSubjectByCourse(classRoomId, this.query.searchText, this.query.page, this.query.size)
      .subscribe({
        next: (response) => {
          this.subject = response?.data?.data || [];
        },
        error: () => {
          // console.error('Error fetching subjects.');
          alert('Error fetching subjects.');
        },
      });
  }

  onSearchChange(searchValue: string): void {
    this.query.filter = searchValue.trim();
    this.searchSubject.next(this.query.filter);
  }
  searchCourse(): void {
    // console.log('Searching with filter:', this.filter);
    this.query.page = 1;
    this.getDashboardAdminCourse();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;

    this.query.filter = '';
    this.query.page = 1;


    this.getDashboardAdminCourse();
  }
}
