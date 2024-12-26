import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AdviceRequest, DashboardOverview, TestQuestions } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrl: './tong-quan.component.css'
})
export class TongQuanComponent implements OnInit {
  dateFilter: any | undefined;
  selectedDateFilter: any | undefined;
  dashboardFilterByDate: DashboardOverview = new DashboardOverview();
  adviceRequest: AdviceRequest[] = [];
  testQuestion: TestQuestions = new TestQuestions();

  fromDate: string = '';
  toDate: string = '';
  dataChart: any;
  options: any;

  constructor(private dashboardSrv: DashboardService) {

  }

  ngOnInit(): void {
    this.updateDateRange('day');
    this.getDashboardFilterByDate();
    this.getDateFilter(this.selectedDateFilter);

    // Chart setup 
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.options = {
      plugins: {
        legend:
          { labels: { usePointStyle: true, color: textColor } }
      }
    };

  }

  getDateFilter(dateFilter: any) {
    this.dateFilter = [
      { name: 'Hôm nay', code: 'day' },
      { name: 'Tuần nay', code: 'week' },
      { name: 'Tháng nay', code: 'month' },
      { name: 'Năm nay', code: 'year' },
    ];
  }

  // Filter by date and update chart
  getDashboardFilterByDate() {
    this.dashboardSrv.getDashboardFilterByDate(this.fromDate, this.toDate).subscribe({
      next: (response: any) => {
        const data = response.data;

        // Ánh xạ từng trường
        this.dashboardFilterByDate = { ...data.dashboardOverview };
        this.adviceRequest = data.adviceRequest.map((item: any) => ({
          academicAbility: item.academicAbility,
          birthday: item.birthday,
          comment: item.comment,
          createdBy: item.createdBy,
          createdDate: item.createdDate,
          id: item.id,
          isAdvice: item.isAdvice,
          modifiedBy: item.modifiedBy,
          modifiedDate: item.modifiedDate,
          name: item.name,
          phone: item.phone,
          totalFiltered: item.totalFiltered,
        }));
        this.testQuestion = {
          data: data.testQuestions.data,
          labels: data.testQuestions.labels,
        };

        // Debug log
        // console.log("Dashboard Overview: ", this.dashboardFilterByDate);
        // console.log("Advice Request: ", this.adviceRequest);
        // console.log("Test Questions: ", this.testQuestion);
        this.updateChartData();
      },
      error: (err) => {
        console.error("Error fetching dashboard data: ", err);
      },
    });
  }

  onDateFilterChange() {
    if (this.selectedDateFilter) {
      this.updateDateRange(this.selectedDateFilter);
      this.getDashboardFilterByDate();
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


  //Chart 
  updateChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.dataChart = {
      labels: this.testQuestion?.labels,
      datasets: [{
        data: this.testQuestion?.data,
        backgroundColor: [
          documentStyle.getPropertyValue('--blue-500'),
          documentStyle.getPropertyValue('--yellow-500'),
          documentStyle.getPropertyValue('--green-500'),
          documentStyle.getPropertyValue('--red-500'),
          documentStyle.getPropertyValue('--purple-500'),
          documentStyle.getPropertyValue('--orange-500'),
          documentStyle.getPropertyValue('--cyan-500'),
          documentStyle.getPropertyValue('--pink-500')],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--blue-400'),
          documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--pink-400')]
      }]
    };
  }

}
