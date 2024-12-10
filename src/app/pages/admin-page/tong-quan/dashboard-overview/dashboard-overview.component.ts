import { Component, OnInit } from "@angular/core";
import { Subject as SubjectModel } from "../../../../models/subject.model";
import { Dashboard } from "../../../../models/dashboard.model";
import { IResponeList } from "../../../../models/common.model";
import { Subject } from "rxjs";
import { DashboardService } from "../../../../services/dashboard.service";
import { ClassRoomService } from "../../../../services/classRoom.service";
import { ClassRoom } from "../../../../models/classRoom.model";
import { CourseService } from "../../../../services/course.service";

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.css'
})
export class DashboardOverviewComponent implements OnInit {
  dashboard: Dashboard[] = [];
  page: number = 1;
  size: number = 1000;
  filter: string = '';
  selectedClassroom: string | undefined;
  accountId: string = '';
  selectedSubject: string | undefined;

  subject: SubjectModel[] = [];
  classRoom: ClassRoom[] = [];
  searchText: string = '';

  private searchSubject: Subject<string> = new Subject(); // Subject for search
  constructor(private dashboardSrv: DashboardService, private classRoomSrv: ClassRoomService, private courseSrv: CourseService) {

  }

  ngOnInit(): void {
    this.getDashboard();

    this.getClassRoom();
  }

  getDashboard() {
    this.dashboardSrv.getDashboardAdminOverview(this.page, this.size, this.filter, this.selectedClassroom || '', this.selectedSubject || '', this.accountId).subscribe({
      next: (data: IResponeList<Dashboard>) => {
        this.dashboard = data.data.data;
        console.log("Filter: ", this.filter);
        console.log("Selected classrôm: ", this.selectedClassroom);
        console.log("Subject: ", this.selectedSubject)
        console.log("Dashboad Admin Overview: ", this.dashboard);

      },
    });
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
    this.courseSrv
      .getSubject(classRoomId, this.searchText, this.page, this.size)
      .subscribe({

        next: (response) => {
          this.subject = response;
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
    this.getDashboard();
  }

  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;

    this.filter = '';
    this.page = 1;


    this.getDashboard();
  }

}
