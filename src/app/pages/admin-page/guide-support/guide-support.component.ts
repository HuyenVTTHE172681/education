import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Guide } from '../../../core/models/guide.model';
import { MenuItem } from 'primeng/api';
import { DashboardService } from '../../../core/services/api-core/dashboard.service';

@Component({
  selector: 'app-guide-support',
  templateUrl: './guide-support.component.html',
  styleUrl: './guide-support.component.css'
})
export class GuideSupportComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  listGuide: Guide[] = [];
  query = {
    page: 1,
    size: 1000,
    filter: '',
    screen: 'admin'
  }
  selectedGuide: Guide | null = null;

  constructor(private dashboardSrv: DashboardService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getDashboardGuide();
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Trợ giúp' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

  getDashboardGuide() {
    this.dashboardSrv.getDashboardGuide(this.query.filter, this.query.page, this.query.size, this.query.screen).subscribe((data) => {
      this.listGuide = data?.data?.data || [];
      if (this.listGuide.length > 0) {
        this.selectedGuide = this.listGuide[0];
      }
    })
  }

  selectGuide(guide: Guide) {
    this.selectedGuide = guide; // Set the selected guide
  }

  getSanitizedContent(content: string | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content || '');
  }

}
