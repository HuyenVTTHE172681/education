import { Component, OnInit } from '@angular/core';
import { Subject as SubjectModel } from '../../../models/subject.model';
import { SubjectService } from '../../../services/subject.service';
import { Router } from '@angular/router';
import { ClassRoomService } from '../../../services/classRoom.service';
import { ClassRoom } from '../../../models/classRoom.model';
import { debounceTime, Subject } from 'rxjs';
@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrl: './mon-hoc.component.css'
})
export class MonHocComponent implements OnInit {
  breadcrum: any;
  home: any;
  items: any;

  page: number = 1;
  size: number = 10;
  filter: string = '';
  subject: SubjectModel[] = [];
  selectedSubject: any = null;
  totalItems: number = 0;

  // ClassRoom
  searchText: string = '';
  classRoom: ClassRoom[] = [];
  selectedClassroom: string | undefined;
  dialogDelete: boolean = false;

  private searchSubject: Subject<string> = new Subject();

  constructor(private router: Router, private classRoomSrv: ClassRoomService, private subjectSrv: SubjectService) { }

  ngOnInit(): void {
    this.getClassRoom();
    this.getSubject();


    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Khóa học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.editCourse(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deletedCourse(), // Delete functionality (if needed)
          },
        ],
      },
    ];

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1; 
      this.getSubject();
    });

  }

  editCourse() {
    this.router.navigate(['/quan-tri/chi-tiet-khoa-hoc', this.selectedSubject?.id]);
  }

  deletedCourse() {
    if (this.selectedSubject) {
      this.dialogDelete = true;
      console.log("Delete subject: ", this.selectedSubject?.id);
    }
  }

  setSelectedSubject(subject: any) {
    this.selectedSubject = subject;
    console.log("Selected Subject: ", this.selectedSubject);
  }

  onMenuShow(menu: any) {
    if (this.selectedSubject) {
      console.log('Selected File ID:', this.selectedSubject.id);
    }
  }

  getSubject() {
    this.subjectSrv.getSubjectByCourse(this.selectedClassroom || '', this.filter, this.page, this.size).subscribe((data) => {
      this.subject = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Subject: ", this.subject);
      console.log("Filter: ", this.filter)
    })
  }

  // Pagination
  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getSubject();
  }

  // Get ClassRoom to dropdown list filter Subject
  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.page, this.size, this.searchText).subscribe((data) => {
      this.classRoom = data.data.data;
      console.log("ClassRoom: ", this.classRoom);
    })
  }

  // Search
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }
  searchCourse() {
    this.page = 1;
    this.getSubject();
  }
  resetFilters(): void {
    this.selectedClassroom = undefined;
    this.selectedSubject = undefined;
    this.filter = '';
    this.page = 1;
    this.getSubject();
  }

  // Format Label
  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'primary';

      case 0:
        return 'danger';

      default:
        return 'warning';
    }
  }
  getStatusLabel(status: number) {
    return status === 1 ? 'Hiển thị' : 'Ẩn';
  }

  handleDeletedSubject() {

  }




}
