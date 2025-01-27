import { Component, OnInit } from '@angular/core';
import { Test, TestCategory } from '../../../core/models/test.model';
import { ClassRoom } from '../../../core/models/classRoom.model';
import { Subject as SubjectModel } from '../../../core/models/subject.model';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, HttpStatus, STATUS } from '../../../common/constants';
import { UtilsService } from '../../../utils/utils.service';
import { TestAbilityService } from '../../../core/services/api-core/test-ability.service';
import { ClassRoomService } from '../../../core/services/api-core/classRoom.service';
import { SubjectService } from '../../../core/services/api-core/subject.service';

@Component({
  selector: 'app-bai-hoc',
  templateUrl: './bai-hoc.component.html',
  styleUrl: './bai-hoc.component.css'
})
export class BaiHocComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] | undefined;

  query = {
    searchText: '',
    page: 0,
    size: 10,
    sizeForFilter: 1000,
    status: -1,
    testCategoryId: -1,
    classRoomId: -1,
    subjectId: -1,
    courseId: '',
    filter: '',
    isFromCMS: 1,
  }

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
  private searchSubject: Subject<string> = new Subject(); // Subject for search

  constructor(
    private testSrv: TestAbilityService,
    private classRoomSrv: ClassRoomService,
    private subjectSrv: SubjectService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.getTestCategory();
    this.getClassRoom();
    this.getSubject();
    this.getTest();
    this.initParams();


    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1;
      this.getTest();
    });
  }

  initParams() {
    this.breadcrumb = [
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
  }

  edit() {
    this.router.navigate(['/quan-tri/bai-kiem-tra', this.selectedTest?.id]);
  }

  deleted() {
    const documentId = this.selectedTest?.id;
    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_BAI_HOC,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.testSrv.deleteTest(documentId).subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
            key: 'br', life: 3000
          });
          this.getTest();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br', life: 3000
        });
      },
    })
  }

  getTestCategory() {
    this.testSrv.getTestType(this.query.searchText, this.query.page, this.query.sizeForFilter).subscribe((data) => {
      if (data.statusCode == HttpStatus.OK) {
        this.testCategory = data?.data?.data || [];
      }
    })
  }

  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.query.page, this.query.sizeForFilter, this.query.searchText).subscribe((data) => {
      this.classRoom = data?.data?.data || [];
    })
  }

  getSubject() {
    this.subjectSrv.getSubjectByCourse(
      this.selectedClassroom || '',
      this.query.searchText,
      this.query.page,
      this.query.sizeForFilter
    )
      .subscribe((data) => {
        this.subject = data?.data?.data || [];

        if (this.query.page < 1) {
          this.query.page = 1; // Reset to page 1 if it's invalid
        }
      })
  }

  getTest() {
    this.testSrv.getTest(
      this.selectedStatus.value,
      this.selectedClassroom || '',
      this.query.courseId,
      this.query.filter,
      this.query.isFromCMS,
      this.query.page,
      this.query.size,
      this.selectedSubject || '',
      this.selectedTestCategory || ''
    ).subscribe((data) => {
      this.test = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getTest();
  }

  search() {
    this.query.page = 1;
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
    this.query.filter = '';
    this.query.page = 1;
    this.getTest();
  }

  setSelected(test: any) {
    this.selectedTest = test;
  }

  addNew() {
    this.router.navigate(['/quan-tri/bai-kiem-tra/them-moi']);
  }



}
