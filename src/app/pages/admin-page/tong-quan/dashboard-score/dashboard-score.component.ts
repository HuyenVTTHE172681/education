import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { ClassRoom } from '../../../../models/classRoom.model';
import { IResponeList } from '../../../../models/common.model';
import { CourseService } from '../../../../services/course.service';
import { ClassRoomService } from '../../../../services/classRoom.service';
import { Subject as SubjectModel } from '../../../../models/subject.model';
import { Subject } from 'rxjs';
import { SubjectService } from '../../../../services/subject.service';

@Component({
  selector: 'app-dashboard-score',
  templateUrl: './dashboard-score.component.html',
  styleUrl: './dashboard-score.component.css'
})
export class DashboardScoreComponent implements OnInit {
  page: number = 1;
  size: number = 1000;
  filter: string = '';
  selectedClassroom: string | undefined;
  accountId: string = '';
  selectedSubject: string | undefined;
  dashboardAdminScore: any = {};
  searchText: string = '';
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
    this.dashboardSrv.getDashboardAdminScore(this.selectedClassroom, this.selectedSubject || '', this.accountId, this.filter, this.page, this.size).subscribe({
      next: (data: IResponeList<any>) => {
        this.dashboardAdminScore = data.data.data;
        console.log("Admin course: ", this.dashboardAdminScore)
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
          console.error('Error fetching subjects.');
        },
      });
  }

  onSearchChange(searchValue: string): void {
    this.filter = searchValue.trim();
    this.searchSubject.next(this.filter);
  }
  searchCourse(): void {
    console.log('Searching with filter:', this.filter);
    this.page = 1;
    this.getDashboardAdminScore();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;

    this.filter = '';
    this.page = 1;


    this.getDashboardAdminScore();
  }

}
