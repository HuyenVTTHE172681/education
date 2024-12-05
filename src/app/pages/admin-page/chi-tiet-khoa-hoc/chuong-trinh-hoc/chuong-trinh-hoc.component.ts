import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestAbilityService } from '../../../../services/test-ability.service';

@Component({
  selector: 'app-chuong-trinh-hoc',
  templateUrl: './chuong-trinh-hoc.component.html',
  styleUrls: ['./chuong-trinh-hoc.component.css'],
})
export class ChuongTrinhHocComponent implements OnInit {
  items: any[] = [];
  files: any[] = [];
  id: string | null = null;
  expandedRows: any = {};
  isExpanded: boolean = false;
  sidebarForEdit: boolean = false;
  dialogDelete: boolean = false;
  selectedFile: any = null;
  showExam: boolean = false;

  constructor(
    private courseSrv: CourseService,
    private testSrv: TestAbilityService,
    private route: ActivatedRoute,
    private router: Router // private messageService: MessageService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.getCourseSchedule(this.id);
    }

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.editFile(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleteFile(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  showDetailExam() {
    this.showExam = true;
  }
  onMenuShow(menu: any) {
    if (this.selectedFile) {
      console.log('Selected File ID:', this.selectedFile.data.id);
    }
  }

  editFile(): void {
    if (this.selectedFile) {
      console.log('Editing file:', this.selectedFile.data.id);
    } else {
      this.selectedFile = { data: { courseId: this.id } }; // Thêm mới với courseID
      console.log('Adding new file');
    }
    this.sidebarForEdit = true;
  }



  handleDataUpdated(success: boolean): void {
    if (success) {
      this.sidebarForEdit = false;
      this.refreshData(); // Refresh data if needed
    }
  }

  deleteFile() {
    if (this.selectedFile) {
      this.dialogDelete = true;
      console.log('Deleting file with ID:', this.selectedFile.data.id);
    }
  }

  getCourseSchedule(
    courseId: string,
    page: number = 0,
    size: number = 10000,
    searchText: string = ''
  ) {
    this.courseSrv.getCourseSchedule(courseId, searchText, page, size).subscribe({
      next: (data) => {
        this.files = data.map((courseData: any) => {
          return {
            data: {
              name: courseData.name,
              order: courseData.order,
              status: courseData.status,
              id: courseData.id,
              courseId: courseData.courseId,
              createdDate: courseData.createdDate,
              requiredCourseId: courseData.requiredCourseId,
            },
            children: courseData.tests.map((testData: any) => ({
              data: {
                id: testData.id,
                name: testData.name,
                testCategoryName: testData.testCategoryName,
                order: testData.order,
                time: testData.time,
                deadlineDate: testData.deadlineDate,
                isFree: testData.isFree,
                isSpecial: testData.isSpecial,
                isAutoSendMail: testData.isAutoSendMail,
                avgRating: testData.avgRating,
                totalViewed: testData.totalViewed,
                status: testData.status,
                isShowInAbilityTest: testData.isShowInAbilityTest,
              },
            })),
          };
        });
        console.log('Final Files Array:', this.files);
        console.log(
          'Final ID Files Array:',
          this.files.map((file) => file.data.id)
        );
      },
    });
  }

  // Toggle between expand and collapse for all rows
  toggleExpandCollapse() {
    if (this.isExpanded) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
  }

  // Expand all rows
  expandAll() {
    this.expandedRows = {};
    this.files.forEach((file) => (this.expandedRows[file.data.id] = true));
    this.isExpanded = true; // Update the state
  }

  // Collapse all rows
  collapseAll() {
    this.expandedRows = {};
    this.isExpanded = false; // Update the state
  }

  get expandAllText() {
    return this.isExpanded ? 'Mở rộng' : 'Thu gọn';
  }

  get expandAllIcon() {
    return this.isExpanded ? 'pi pi-minus' : 'pi pi-plus';
  }

  setSelectedFile(file: any) {
    this.selectedFile = file; // Lưu file vào biến selectedFile
    console.log('File:', this.selectedFile);
  }

  getStatus(status: number): string {
    return status === 1 ? 'pi pi-check' : 'pi pi-times';
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'isFree' : 'notFree';
  }

  getStyle(status: number) {
    switch (status) {
      case 1:
        return 'primary';
      default:
        return 'danger';
    }
  }

  changeTestStatus(testId: string, isFree: number, newStatus: number): void {
    const payload = {
      id: testId,
      isFree: isFree,
      status: newStatus,
    };

    console.log('Payload gửi đi:', payload);

    this.testSrv.setTestChangeStatus(payload).subscribe(
      (response) => {
        console.log('Response:', response);

        if (response.statusCode === 200 && response.data.valid) {
          alert(response.data.messages || 'Cập nhật trạng thái thành công!');
          if (this.id) {
            this.getCourseSchedule(this.id);
          }
        } else {
          alert('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
        }
      },
      (error) => {
        console.error('Error updating status:', error);
        alert('Có lỗi xảy ra khi cập nhật trạng thái.');
      }
    );
  }

  changeTestFree(testId: string, newIsFree: number, status: number): void {
    const payload = {
      id: testId,
      isFree: newIsFree,
      status: status,
    };

    console.log('Payload gửi đi:', payload);

    this.testSrv.setTestChangeFree(payload).subscribe(
      (response) => {
        console.log('Response:', response);

        if (response.statusCode === 200 && response.data.valid) {
          alert(response.data.messages || 'Cập nhật trạng thái thành công!');
          if (this.id) {
            this.getCourseSchedule(this.id);
          }
        } else {
          alert('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
        }
      },
      (error) => {
        console.error('Error updating status:', error);
        alert('Có lỗi xảy ra khi cập nhật trạng thái.');
      }
    );
  }

  changeTestStatusForAll(
    testId: string,
    newIsAutoSendMail: number,
    isFree: number,
    isShowInAbilityTest: number,
    isSpecial: number,
    status: number
  ): void {
    const payload = {
      id: testId,
      isAutoSendMail: newIsAutoSendMail,
      isFree: isFree,
      isShowInAbilityTest: isShowInAbilityTest,
      isSpecial: isSpecial,
      status: status,
    };
    console.log('Payload gửi đi:', payload);

    this.testSrv.setTestChangeAutoSendMail(payload).subscribe(
      (response) => {
        console.log('Response:', response);

        if (response.statusCode === 200 && response.data.valid) {
          alert(response.data.messages || 'Cập nhật trạng thái thành công!');
          if (this.id) {
            this.getCourseSchedule(this.id);
          }
        } else {
          alert('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
        }
      },
      (error) => {
        console.error('Error updating status:', error);
        alert('Có lỗi xảy ra khi cập nhật trạng thái.');
      }
    );
  }

  // refreshData() {
  //   if (this.selectedFile) {
  //     const courseId = this.selectedFile.data.id;
  //     this.courseSrv.getCourseSchedule(courseId, '', 0, 10000).subscribe({
  //       next: (data) => {
  //         this.files = [
  //           console.log('Dữ liệu sau khi refresh:', data),
  //           ...data.map((courseData: any) => ({
  //             data: {
  //               id: courseData.id,
  //               name: courseData.name,
  //               order: courseData.order,
  //               status: courseData.status,
  //             },
  //             children: courseData.tests.map((testData: any) => ({
  //               data: {
  //                 id: testData.id,
  //                 name: testData.name,
  //                 status: testData.status,
  //               },
  //             })),
  //           })),
  //         ];
  //         console.log('Dữ liệu mới sau khi refresh:', this.files);
  //       },
  //       error: (err) => console.error('Lỗi khi gọi API:', err),
  //     });
  //   } else {
  //     const courseId = this.selectedFile.data.id;
  //           this.courseSrv.getCourseSchedule(courseId, '', 0, 10000).subscribe({
  //       next: (data) => {
  //         this.files = [
  //           console.log('Dữ liệu sau khi refresh:', data),
  //           ...data.map((courseData: any) => ({
  //             data: {
  //               id: courseData.id,
  //               name: courseData.name,
  //               order: courseData.order,
  //               status: courseData.status,
  //             },
  //             children: courseData.tests.map((testData: any) => ({
  //               data: {
  //                 id: testData.id,
  //                 name: testData.name,
  //                 status: testData.status,
  //               },
  //             })),
  //           })),
  //         ];
  //         console.log('Dữ liệu mới sau khi refresh:', this.files);
  //       },
  //       error: (err) => console.error('Lỗi khi gọi API:', err),
  //     });
  //   }
  // }

  refreshData() {
    if (this.id) {
      console.log('Refreshing data for courseId:', this.id);
      this.getCourseSchedule(this.id);
    } else {
      console.error('Không tìm thấy courseId từ URL!');
    }
  }


  trackByFn(index: number, item: any): string {
    return item.data.id;
  }

  // Phương thức để xóa file
  deleteChuongTrinhHoc() {
    if (this.selectedFile) {
      const courseId = this.selectedFile.data.id;

      this.courseSrv.deletedCourse(courseId).subscribe({
        next: () => {
          this.dialogDelete = false; // Đóng dialog sau khi xóa
          this.refreshData(); // Làm mới dữ liệu
          alert('Xóa chương trình học thành công!');
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          alert('Có lỗi xảy ra khi xóa. Vui lòng thử lại!');
        },
      });
    }
  }
}
