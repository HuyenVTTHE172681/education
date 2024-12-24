import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestAbilityService } from '../../../../services/test-ability.service';

@Component({
  selector: 'app-information-comment',
  templateUrl: './information-comment.component.html',
  styleUrl: './information-comment.component.css'
})
export class InformationCommentComponent implements OnInit {
  id: string | null = null;
  filter: string = '';
  page: number = 1;
  size: number = 10;
  parentId: string = '';
  comment: any[] = [];
  totalItems: number = 0;
  items: any[] = [];
  selectedTest: any = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testSrv: TestAbilityService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);

    if(this.id) {
      this.getComment();
    }

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.deleted(), // Open sidebar on click
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

  deleted() {

  }
  getComment() {
    this.testSrv.comment(this.filter, this.page, this.size, this.parentId, this.id!).subscribe((data) => {
      this.comment = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Comment: ", this.comment);
    })
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

  setSelected(test: any) {
    this.selectedTest = test;
  }

  onMenuShow(menu: any) {
    if (this.selectedTest) {
      console.log("Test: ", this.selectedTest.id);
    }
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getComment();
  }

}
