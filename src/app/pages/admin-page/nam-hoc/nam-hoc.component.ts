import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../core/utils/utils.service';
import { CourseService } from '../../../core/services/course.service';
import { CourseYear } from '../../../core/models/course.model';
import { MenuItem } from 'primeng/api';
import { debounceTime, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpStatus } from '../../../environments/constants';

@Component({
  selector: 'app-nam-hoc',
  templateUrl: './nam-hoc.component.html',
  styleUrl: './nam-hoc.component.css'
})
export class NamHocComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  items: MenuItem[] = [];
  home: MenuItem = [];
  coursesYears: CourseYear[] = [];
  totalItems: number = 0;
  selectedCourseYear: any;
  query = {
    filter: '',
    page: 0,
    size: 10,
    status: -1
  }
  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Hiển thị', value: 1 },
    { name: 'Ẩn', value: 0 },
  ];
  selectedStatus: any = this.statusList[0];
  private searchSubject: Subject<string> = new Subject(); // Subject for search
  showEditDialog: boolean = false;
  courseYearForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public utilsService: UtilsService,
    private courseSrv: CourseService,
    private formBuilder: FormBuilder,
  ) {
    this.courseYearForm = this.formBuilder.group({
      createBy: [''],
      createDate: [''],
      description: [''],
      id: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: [''],
      status: [0],
      totalFiltered: [0],
    })
  }

  ngOnInit() {
    this.getCourseYear();
    this.initParams();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getCourseYear();
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Năm học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.showEdit(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.delete(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  delete() { }

  getCourseYear(): void {
    this.courseSrv.getCourseYear(this.query.filter, this.query.page, this.query.size, this.selectedStatus.value).subscribe((data) => {
      this.coursesYears = data?.data.data || [];
      this.totalItems = data?.data.recordsTotal || 0;

      console.log("Course YEar: ", this.coursesYears);
    })
  }

  setSelectedCourseYear(courseYear: CourseYear) {
    this.selectedCourseYear = courseYear;
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getCourseYear();
  }

  resetFilters() {
    this.selectedStatus = -1;
    this.query.filter = '';
    this.query.page = 1;
    this.getCourseYear();
  }

  search() {
    this.query.page = 1;
    this.getCourseYear();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getCourseYear();
  }

  showAdd() {
    this.courseYearForm.reset();
    this.showEditDialog = true;
    this.isEditMode = false;
  }

  showEdit() {
    const id = this.selectedCourseYear.id;

    if (id) {
      this.courseSrv.getCourseYEarById(id).subscribe((res) => {
        if (res.statusCode === HttpStatus.OK) {
          this.patchCourseYearForm(res.data); // Điền dữ liệu vào form
          this.showEditDialog = true; // Mở dialog
          this.isEditMode = true;
        }
      });
    }
  }

  patchCourseYearForm(courseYear: CourseYear) {
    this.courseYearForm.patchValue({
      createBy: courseYear.createdBy || '',
      createDate: courseYear.createdDate || '',
      description: courseYear.description || '',
      id: courseYear.id || '',
      modifiedBy: courseYear.modifiedBy || '',
      modifiedDate: courseYear.modifiedDate || '',
      name: courseYear.name || '',
      status: courseYear.status || 0,
      totalFiltered: courseYear.totalFiltered || 0,
    });
  }

}
