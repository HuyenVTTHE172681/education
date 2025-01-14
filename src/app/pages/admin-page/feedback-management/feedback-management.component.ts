import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepService } from '../../../core/services/api-core/step.service';
import { Feedback } from '../../../core/models/slide.model';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrl: './feedback-management.component.css'
})
export class FeedbackManagementComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  feedback: Feedback[] =[];
  query = {
    filter: '',
    page: 0,
    size: 10
  }
  totalItems: number = 0;

  constructor(
    private stepSrv: StepService
  ) {}

  ngOnInit(): void {
    this.initParams();
    this.getFeedback();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Feedback' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }
  getFeedback() {
    this.stepSrv.getFeedBack(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.feedback = data?.data?.data;
      this.totalItems = data.data.recordsTotal;

      if (this.query.page < 1) {
        this.query.page = 1; // Reset to page 1 if it's invalid
      }
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getFeedback();
  }

}
