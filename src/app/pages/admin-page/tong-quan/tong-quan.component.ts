import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrl: './tong-quan.component.css'
})
export class TongQuanComponent implements OnInit {
  dateFilter: any | undefined;
  selectedDateFilter: any | undefined;
  dashboardFilterByDate: any = {};// 
  adviceRequest: any = {}; //
  fromDate: string = '2024-12-01%2000:00:00';
  toDate: string = '2024-12-07%2023:59:59';
  dataChart: any;
  options: any;

  constructor(private dashboardSrv: DashboardService) {

  }

  ngOnInit(): void {
    this.updateDateRange('day');
    this.getDashboardFilterByDate(this.fromDate, this.toDate);

    this.dateFilter = [
      { name: 'Hôm nay', code: 'day' },
      { name: 'Tuần nay', code: 'week' },
      { name: 'Tháng nay', code: 'month' },
      { name: 'Năm nay', code: 'year' },
    ];


    // Chart
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataChart = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };


  }

  getDashboardFilterByDate(fromDate: string, toDate: string) {
    this.dashboardSrv.getDashboardFilterByDate(this.fromDate, this.toDate).subscribe({
      next: (data: any) => {
        this.dashboardFilterByDate = data.data.dashboardOverview;
        this.adviceRequest = data.data.adviceRequest;
        console.log("Dashboad: ", this.dashboardFilterByDate);
        console.log("Dashboad: ", this.adviceRequest);
      },
    })
  }

  // updateDateRange(filter: string) {
  //   const now = new Date();
  //   switch (filter) {
  //     case 'day':
  //       this.fromDate = now.toISOString().split('T')[0] + '%2000:00:00';
  //       this.toDate = now.toISOString().split('T')[0] + '%2023:59:59';
  //       break;
  //     case 'week':
  //       const firstDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  //       this.fromDate = firstDayOfWeek.toISOString().split('T')[0] + '%2000:00:00';
  //       this.toDate = now.toISOString().split('T')[0] + '%2023:59:59';
  //   }

  // }

  onDateFilterChange() {
    if (this.selectedDateFilter) {
      this.updateDateRange(this.selectedDateFilter);
      this.getDashboardFilterByDate(this.fromDate, this.toDate);
    }
  }
  updateDateRange(filter: string) {
    const now = new Date();
    switch (filter) {
      case 'day':
        this.fromDate = this.formatDate(now, '00:00:00');
        this.toDate = this.formatDate(now, '23:59:59');
        break;
      case 'week':
        const firstDayOfWeek = this.startOfWeek(now);
        this.fromDate = this.formatDate(firstDayOfWeek, '00:00:00');
        this.toDate = this.formatDate(new Date(now.setDate(firstDayOfWeek.getDate() + 6)), '23:59:59');
        break;
      case 'month':
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        this.fromDate = this.formatDate(firstDayOfMonth, '00:00:00');
        this.toDate = this.formatDate(lastDayOfMonth, '23:59:59');
        break;
      case 'year':
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(now.getFullYear(), 11, 31);
        this.fromDate = this.formatDate(firstDayOfYear, '00:00:00');
        this.toDate = this.formatDate(lastDayOfYear, '23:59:59');
        break;
    }
  }
  startOfWeek(date: Date): Date {
    const firstDay = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(firstDay));
  }

  formatDate(date: Date, time: string): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2); return `${year}-${month}-${day} ${time}`;
  }


}
