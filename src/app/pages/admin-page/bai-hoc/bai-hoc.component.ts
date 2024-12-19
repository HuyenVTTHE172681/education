import { Component, OnInit } from '@angular/core';
import { Test, TestCategory } from '../../../models/test.model';
import { TestAbilityService } from '../../../services/test-ability.service';
import { ClassRoomService } from '../../../services/classRoom.service';
import { ClassRoom } from '../../../models/classRoom.model';
import { SubjectService } from '../../../services/subject.service';
import { Subject as SubjectModel } from '../../../models/subject.model';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bai-hoc',
  templateUrl: './bai-hoc.component.html',
  styleUrl: './bai-hoc.component.css'
})
export class BaiHocComponent implements OnInit {
  breadcrum: any[] = [];
  home: any = [];
  items: any[] = [];

  searchText: string = '';
  page: number = 1;
  size: number = 10;

  testCategory: TestCategory[] = [];
  selectedTestCategory: string | undefined;

  classRoom: ClassRoom[] = [];
  selectedClassroom: string | undefined;

  subject: SubjectModel[] = [];
  selectedSubject: string | undefined;

  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Hiển thị', value: 1 },
    { name: 'Ẩn', value: 0 },
  ];
  selectedStatus: any = this.statusList[0];

  test: Test[] = [];
  totalItems: number = 0;
  selectedTest: any = null;
  courseId: string = '';
  filter: string = '';
  isFromCMS: number = 1;

  dialogDelete: boolean = false;
  private searchSubject: Subject<string> = new Subject(); // Subject for search

  constructor(private testSrv: TestAbilityService, private classRoomSrv: ClassRoomService, private subjectSrv: SubjectService, private router: Router) { }

  ngOnInit(): void {
    this.getTestCategory();
    this.getClassRoom();
    this.getSubject();
    this.getTest();

    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Bài kiểm tra' },
    ];
    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.edit(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
          {
            label: 'Xem trước',
            icon: 'pi pi-eye',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1; // Reset to the first page for new search
      this.getTest();
    });
  }

  edit() {
    this.router.navigate(['/quan-tri/bai-kiem-tra', this.selectedTest?.id]);
  }

  deleted() {
    if (this.selectedTest) {
      this.dialogDelete = true;
    }
  }

  getTestCategory() {
    this.testSrv.getTestType(this.searchText, this.page, this.size).subscribe((data) => {
      this.testCategory = data.data.data;
      console.log("test category: ", this.testCategory);
    })
  }

  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.page, this.size, this.searchText).subscribe((data) => {
      this.classRoom = data.data.data;
      console.log("ClassRoom: ", this.classRoom);
    })
  }

  getSubject() {
    this.subjectSrv.getSubjectByCourse(this.selectedClassroom || '', this.searchText, this.page, this.size).subscribe((data) => {
      this.subject = data.data.data;
      console.log("Subject: ", this.subject);
    })
  }

  getTest() {
    this.testSrv.getTest(this.selectedStatus.value, this.selectedClassroom || '', this.courseId, this.filter,
      this.isFromCMS, this.page, this.size, this.selectedSubject || '', this.selectedTestCategory || ''
    ).subscribe((data) => {
      this.test = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("test: ", this.test);
    })
  }

  onMenuShow(menu: any) {
    if (this.selectedTest) {
      console.log("Test: ", this.selectedTest.id);
    }
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getTest();
  }

  search() {
    this.page = 1;
    this.getTest();
  }
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }

  resetFilters() {
    this.selectedClassroom = undefined;
    this.selectedStatus = -1;
    this.selectedSubject = undefined;
    this.selectedTestCategory = undefined;
    this.filter = '';
    this.page = 1;
    this.getTest();
  }

  setSelected(test: any) {
    this.selectedTest = test;
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'Hiển thị' : 'Ẩn';
  }
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

  getFree(status: number) {
    return status === 1 ? 'Miễn phí' : 'Trả phí';
  }

  getStatusFree(status: number) {
    switch (status) {
      case 1:
        return 'primary';

      case 0:
        return 'warning';

      default:
        return 'danger';
    }
  }

  getEmail(status: number) {
    return status === 1 ? 'Gửi' : 'Không';
  }

  addNew() {
    this.router.navigate(['/quan-tri/bai-kiem-tra/them-moi']);
  }

  handleDelete() {

  }

}
