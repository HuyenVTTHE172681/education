import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { ClassRoom } from '../../../../core/models/classRoom.model';
import { IResponseList } from '../../../../core/models/common.model';
import { CourseService } from '../../../../core/services/course.service';
import { ClassRoomService } from '../../../../core/services/classRoom.service';
import { Subject as SubjectModel } from '../../../../core/models/subject.model';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../core/services/subject.service';
import { DashboardAdminScore } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard-score',
  templateUrl: './dashboard-score.component.html',
  styleUrl: './dashboard-score.component.css'
})
export class DashboardScoreComponent implements OnInit {
  query = {
    page: 1,
    size: 1000,
    filter: '',
    accountId: '',
    searchText: ''
  }
  selectedClassroom: string | undefined;
  selectedSubject: string | undefined;
  dashboardAdminScore: DashboardAdminScore[] = [];
  classRoom: ClassRoom[] = [];
  subject: SubjectModel[] = [];

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private dashboardSrv: DashboardService, private courseSrv: CourseService, private classRoomSrv: ClassRoomService, private subjectSrv: SubjectService) {

  }

  ngOnInit(): void {
    this.getDashboardAdminScore();
    this.getClassRoom();
  }

  getDashboardAdminScore() {
    this.dashboardSrv.getDashboardAdminScore(this.selectedClassroom, this.selectedSubject || '', this.query.accountId, this.query.filter, this.query.page, this.query.size).subscribe({
      next: (data: IResponseList<DashboardAdminScore>) => {
        this.dashboardAdminScore = data?.data?.data || [];
      }
    })
  }

  // Get classrom
  getClassRoom() {
    this.classRoomSrv
      .getClassRooms(this.query.page, this.query.size, this.query.searchText)
      .subscribe({
        next: (data: IResponseList<ClassRoom>) => {
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
    this.getDashboardAdminScore();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;

    this.query.filter = '';
    this.query.page = 1;


    this.getDashboardAdminScore();
  }

}
