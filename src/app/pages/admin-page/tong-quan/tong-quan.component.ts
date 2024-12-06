import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../../services/classRoom.service';
import { IResponeList } from '../../../models/common.model';
import { ClassRoom } from '../../../models/classRoom.model';
import { CourseService } from '../../../services/course.service';
import { Subject as SubjectModel } from '../../../models/subject.model';
import { DashboardService } from '../../../services/dashboard.service';
import { Dashboard } from '../../../models/dashboard.model';

@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrl: './tong-quan.component.css'
})
export class TongQuanComponent implements OnInit {
  products: any;
  cities: any | undefined;
  events: any;
  selectedCity: any | undefined;

  page: number = 1;
  size: number = 1000;
  searchText: string = '';
  classRoom: ClassRoom[] = [];
  selectedClassroom: string | undefined;
  subject: SubjectModel[] = [];
  selectedSubject: string | undefined;

  dashboard: Dashboard[] = [];
  filter: string = '';
  accountId: string = '';

  constructor(private classRoomSrv: ClassRoomService, private courseSrv: CourseService, private dashboardSrv: DashboardService) {

  }

  ngOnInit(): void {
    this.getClassRoom();
    this.getDashboard();

    this.events = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '2000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
    ];
  }

  getDashboard() {
    this.dashboardSrv.getDashboardAdminOverview(this.page, this.size, this.filter, this.selectedClassroom, this.selectedSubject, this.accountId).subscribe({
      next: (data: IResponeList<Dashboard>) => {
        this.dashboard = data.data.data;
        console.log("Dashboad: ", this.dashboard);
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

  getSubjectsByClassRoomId(classRoomId: string): void {
    this.courseSrv
      .getSubject(classRoomId, this.searchText, this.page, this.size)
      .subscribe({
        next: (response) => {
          // console.log('API Response of Subject:', response);
          this.subject = response;
        },
        error: () => {
          console.error('Error fetching subjects.');
        },
      });
  }
}
