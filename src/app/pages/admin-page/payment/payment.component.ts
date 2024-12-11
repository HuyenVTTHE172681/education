import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/dashboard.model';
import { DashboardService } from '../../../services/dashboard.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  breadcrum: any[] = [];
  home: any = [];
  items: any[] = [];
  payment: Payment[] = [];
  filter: string = '';
  isPayment: number = -1;
  page: number = 1;
  size: number = 10;
  totalItems: number = 0;

  selectedPayment: any = null;
  private searchSubject: Subject<string> = new Subject(); // Subject for search

  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Đã thanh toán', value: 1 },
    { name: 'Chưa thanh toán', value: 0 },
  ];
  selectedStatus: any = this.statusList[0];
  ngOnInit(): void {
    this.getDashboardPayment();

    this.breadcrum = [
      { label: 'Quản trị' },
      { label: 'Thanh toán' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Duyệt',
            icon: 'pi pi-check',
            // command: () => this.editCourse(), // Open sidebar on click
          },
          {
            label: 'Hủy duyệt',
            icon: 'pi pi-times',
            // command: () => this.deletedCourse(), // Delete functionality (if needed)
          },
          {
            label: 'Xóa thanh toán',
            icon: 'pi pi-trash',
            // command: () => this.deletedCourse(), // Delete functionality (if needed)
          },
        ],
      },
    ];

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filter = searchValue;
      this.page = 1; // Reset to the first page for new search
      this.getDashboardPayment();
    });
  }

  constructor(private dashboardSrv: DashboardService) {
  }

  onStatusChange(event: any) {
    this.page = 1;
    console.log('Trạng thái đã được chọn: ', this.selectedStatus);
    this.getDashboardPayment();
  }
  // Trigger search with debounce
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.page = 1;
    this.getDashboardPayment();
  }

  resetFilters(): void {
    this.selectedStatus = -1;
    this.filter = '';
    this.page = 1; // Reset về trang đầu tiên
    this.getDashboardPayment(); // Gọi API để lấy lại dữ liệu ban đầu
  }

  getDashboardPayment() {
    this.dashboardSrv.getDashboardPayment(this.filter, this.selectedStatus.value, this.page, this.size).subscribe((data) => {
      this.payment = data.data.data;
      this.totalItems = data.data.recordsTotal;
      console.log("Payment: ", this.payment);
    })
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getDashboardPayment();
    console.log("Page: ", this.page);
  }

  getStatus(isPayment: number) {
    switch (isPayment) {
      case 1:
        return 'primary';

      case 0:
        return 'warning';

      default:
        return 'danger';
    }
  }


  getStatusLabel(isPayment: number) {
    return isPayment === 1 ? 'Đã thanh toán' : 'Chờ thanh toán';
  }

  setSelectedPayment(course: any) {
    this.selectedPayment = course;
    console.log("Course: ", this.selectedPayment);
  }
  onMenuShow(menu: any) {
    if (this.selectedPayment) {
      console.log('Selected File ID:', this.selectedPayment.id);
    }
  }

  // handleDeletePayment() {
  //   if (this.selectedPayment) {
  //     const paymentID = this.selectedPayment.id;

  //     this.courseSrv.deletedCourseList(paymentID).subscribe({
  //       next: () => {
  //         this.dialogDelete = false;
  //         this.getDashboardPayment(); // Làm mới dữ liệu
  //         alert('Xóa chương trình học thành công!');
  //       },
  //       error: (err) => {
  //         console.error('Lỗi khi xóa:', err);
  //         alert('Có lỗi xảy ra khi xóa. Vui lòng thử lại!');
  //       },
  //     })

  //   }
  // }

}
