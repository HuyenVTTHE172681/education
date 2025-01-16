import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UtilsService } from '../../../../utils/utils.service';
import { TestAbilityService } from '../../../../core/services/api-core/test-ability.service';

@Component({
  selector: 'app-information-comment',
  templateUrl: './information-comment.component.html',
  styleUrl: './information-comment.component.css'
})
export class InformationCommentComponent implements OnInit {
  items: MenuItem[] = [];
  query = {
    filter: '',
    page: 1,
    size: 10,
    parentId: '',
    id: ''
  }
  comment: any[] = [];
  totalItems: number = 0;
  selectedTest: any = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testSrv: TestAbilityService,
    public utilsService: UtilsService) { }

  ngOnInit(): void {
    this.initParams();

    this.route.params.subscribe((params) => {
      this.query.id = params['id'];
      if (this.query.id) {
        this.getComment();
      }
    });


  }
  initParams() {
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
    this.testSrv.comment(this.query.filter, this.query.page, this.query.size, this.query.parentId, this.query.id).subscribe((data) => {
      this.comment = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal || 0;
    })
  }


  setSelected(test: any) {
    this.selectedTest = test;
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getComment();
  }

}
