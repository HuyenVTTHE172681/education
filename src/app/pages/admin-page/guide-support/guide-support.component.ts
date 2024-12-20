import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Guide } from '../../../models/dashboard.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-guide-support',
  templateUrl: './guide-support.component.html',
  styleUrl: './guide-support.component.css'
})
export class GuideSupportComponent implements OnInit {
  breadcrum: any[] = [];
  home: any = [];
  listGuide: Guide[] = [];
  page: number = 1;
  size: number = 1000;
  filter: string = '';
  screen: string = 'admin';
  selectedGuide: Guide | null = null;

  constructor(private dashboardSrv: DashboardService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getDashboardGuide();

    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Trợ giúp' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

  getDashboardGuide() {
    this.dashboardSrv.getDashboardGuide(this.filter, this.page, this.size, this.screen).subscribe((data) => {
      this.listGuide = data.data.data;
      console.log("Payment: ", this.listGuide);
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
