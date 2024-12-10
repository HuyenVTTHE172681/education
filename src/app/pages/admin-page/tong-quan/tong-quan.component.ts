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
    this.getDashboardFilterByDate();

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

  getDashboardFilterByDate() {
    this.dashboardSrv.getDashboardFilterByDate(this.fromDate, this.toDate).subscribe({
      next: (data: any) => {
        this.dashboardFilterByDate = data.data.dashboardOverview;
        this.adviceRequest = data.data.adviceRequest;
        console.log("Dashboad: ", this.dashboardFilterByDate);
        console.log("Dashboad: ", this.adviceRequest);
      },
    })
  }


}
