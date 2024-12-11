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
  dialogDelete: boolean = false;
  dialogAccept: boolean = false;
  dialogCancelAccept: boolean = false;
  note: string = '';

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
            command: () => this.acceptPayment(), // Open sidebar on click
          },
          {
            label: 'Hủy duyệt',
            icon: 'pi pi-times',
            command: () => this.cancelAcceptPayment(), // Delete functionality (if needed)
          },
          {
            label: 'Xóa thanh toán',
            icon: 'pi pi-trash',
            command: () => this.deletedPayment(), // Delete functionality (if needed)
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

  acceptPayment() {
    if (this.selectedPayment.isPayment === 1) {
      alert("Thanh toán đã được duyệt, không thể xác nhận lại!");
    } else if (this.selectedPayment.isPayment === 0) {
      this.dialogAccept = true;
      console.log("Accept payment: ", this.selectedPayment?.id);
    }
  }

  cancelAcceptPayment() {
    if (!this.selectedPayment) return;

    if (this.selectedPayment.isPayment === 0) {
      alert("Thanh toán chưa được duyệt, không thể hủy!");
    } else if (this.selectedPayment.isPayment === 1) {
      this.dialogCancelAccept = true;
      console.log("Cancel accept payment: ", this.selectedPayment?.id);
    }
  }

  deletedPayment() {
    if (this.selectedPayment) {
      this.dialogDelete = true;
      console.log("Delete payement: ", this.selectedPayment?.id);
    }
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

  handleDeletePayment() {
    if (this.selectedPayment) {
      const paymentID = this.selectedPayment.id;

      if (this.selectedPayment.isPayment === 1) {
        alert("Thanh toán đã được duyệt, không xóa được!");
        this.dialogDelete = false;
      } else {
        this.dashboardSrv.deletedPaymentList(paymentID).subscribe({
          next: () => {
            this.dialogDelete = false;
            this.getDashboardPayment(); // Làm mới dữ liệu
            alert('Xóa thanh toán thành công!');
          },

          error: (err) => {
            console.error('Lỗi khi xóa:', err);
            alert('Có lỗi xảy ra khi xóa. Vui lòng thử lại!');
          },
          complete: () => {
            this.note = ''; // Reset note sau khi xử lý xong
          }
        })
      }

    }
  }

  handleAcceptPayment(comment: string) {
    if (this.selectedPayment) {
      const payload = {
        id: this.selectedPayment.id,
        isPayment: 1,
        comment: comment
      }

      this.dashboardSrv.updatePayment(payload).subscribe({
        next: (response) => {
          if (response.data.valid) {
            alert("Xác nhận thanh toán rồi!");
            this.dialogAccept = false;
            this.getDashboardPayment();
          } else {
            alert("Có lỗi xảy ra");
          }
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          alert('Có lỗi xảy ra khi xóa. Vui lòng thử lại!');
        },
        complete: () => {
          this.note = ''; // Reset note sau khi xử lý xong
        }
      })
    }

  }

  handleCancelAcceptPayment(comment: string) {
    if (this.selectedPayment) {
      const payload = {
        id: this.selectedPayment.id,
        isPayment: 0,
        comment: comment
      }


      this.dashboardSrv.updatePayment(payload).subscribe({
        next: (respone) => {
          if (respone.data.valid) {
            alert("Hủy xác nhận thanh toán rồi!");
            this.dialogCancelAccept = false;
            this.getDashboardPayment();
          } else {
            alert("Có lỗi xảy ra");
          }
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          alert('Có lỗi xảy ra khi xóa. Vui lòng thử lại!');
        },
      })

    }
  }

}
