import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CourseService } from '../../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selectedFile: any = null;

  constructor(
    private courseSrv: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
            command: () => this.openSidebar(event), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleteItem(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  // Method to open the sidebar
  openSidebar(file: any) {
    this.selectedFile = file;
    this.sidebarForEdit = true;
  }

  // Method to handle delete action (if needed)
  deleteItem() {
    console.log('Item deleted');
  }
  getCourseSchedule(
    id: string,
    page: number = 0,
    size: number = 10000,
    searchText: string = ''
  ) {
    this.courseSrv.getCourseSchedule(id, searchText, page, size).subscribe({
      next: (data) => {
        this.files = data.map((courseData: any) => {
          return {
            data: {
              name: courseData.name,
              order: courseData.order,
              status: courseData.status,
            },
            children: courseData.tests.map((testData: any) => ({
              data: {
                id: testData.id,
                testCategoryName: testData.testCategoryName,
                order: testData.order,
                time: testData.time,
                deadlineDate: testData.deadlineDate,
                isFree: testData.isFree,
                isSpecial: testData.isSpecial,
                isAutoSendMail: testData.isAutoSendMail,
              },
            })),
          };
        });
        console.log('Final Files Array:', this.files);
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

  getStyle(status: number) {
    switch (status) {
      case 1: 
      return 'success';
      default:
        return 'danger';
    }
  }
}
