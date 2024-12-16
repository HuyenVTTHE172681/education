import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Subject as SubjectModel } from '../../../../models/subject.model';
import { SubjectService } from '../../../../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-information-subject',
  templateUrl: './information-subject.component.html',
  styleUrl: './information-subject.component.css'
})
export class InformationSubjectComponent implements OnInit {
  breadcrum: any[] = [];
  home: any = [];
  items: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 10;
  totalItems: number = 0;
  courseId: string | null = null;;
  roleId: string = '';
  roleTypeDataId: string = '';
  subject: SubjectModel[] = [];
  selectedTeacher: any;
  roleList = [
    { name: 'Tất cả', value: '' },
    { name: 'Người dùng', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
    { name: 'Giáo viên', value: 'teacher' },
  ];
  selectedRole: any = this.roleList[0];
  dialogDelete: boolean = false;

  private searchSubject: Subject<string> = new Subject();
  constructor(private subjectSrv: SubjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    if(this.courseId) {
      this.getSubject(this.courseId);
    }

    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Lớp học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-check',
            command: () => this.editAccount(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deletedAccount(), // Delete functionality (if needed)
          },
        ],
      },
    ];
    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1; // Reset to the first page for new search
    });
  }

  addNewTeacher() {
    this.router.navigate(['/']);
  }
  editAccount() {
    this.router.navigate(['/quan-tri/giao-vien/', this.selectedTeacher?.id]);
  }
  deletedAccount() {
    if (this.selectedTeacher) {
      this.dialogDelete = true;
      console.log("Delete payement: ", this.selectedTeacher?.id);
    }
  }

  getSubject(courseID: string) {
    this.subjectSrv.getSubjectByCourse(courseID, this.filter, this.page, this.size).subscribe((data) => {
      this.subject = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Teacher: ", this.subject);
    })
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    console.log("Page: ", this.page);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.page = 1;
  }

  resetFilters(): void {
    this.selectedRole = '';
    this.filter = '';
    this.page = 1;
  }

  setSelectedAccount(account: any) {
    this.selectedTeacher = account;
    console.log("Course: ", this.selectedTeacher);
  }

  onMenuShow(menu: any) {
    if (this.selectedTeacher) {
      console.log('Selected File ID:', this.selectedTeacher.id);
    }
  }

  onStatusChange(event: any) {
    this.page = 1;
    console.log('Trạng thái đã được chọn: ', this.selectedRole);
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

  getStatusLabel(status: number) {
    return status === 1 ? 'Hiển thị' : 'Ẩn';
  }

  handleDeleteTeacher() {
    // if (this.selectedTeacher) {
    //   const accID = this.selectedTeacher?.id;
    //   console.log("Teacher id: ", accID)
    //   this.teacherSrv.deleteTeacher(accID).subscribe({
    //     next: () => {
    //       this.dialogDelete = false;
    //       alert("Xóa giáo viên thành công");
    //       this.getTeacher();
    //     },
    //     error: (err) => {
    //       alert("Lỗi xảy ra khi xóa. Vui lòng thử lại!")
    //     }
    //   })
    // }
  }

}
