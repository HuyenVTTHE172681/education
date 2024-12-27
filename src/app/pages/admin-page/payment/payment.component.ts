import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Payment } from '../../../core/models/payment.model';
import { PaymentService } from '../../../core/services/payment.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CONSTANTS, STATUS } from '../../../environments/constants';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  breadcrum: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  payment: Payment[] = [];
  selectedPayment: any = null;
  query = {
    filter: '',
    isPayment: -1,
    page: 1,
    size: 10
  }
  totalItems: number = 0;
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
    this.initParams();
    this.getDashboardPayment();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getDashboardPayment();
    });
  }

  constructor(
    private paymentSrv: PaymentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  initParams() {
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
    const documentId = this.selectedPayment?.id;

    if (this.selectedPayment.isPayment === 1) {
      this.messageService.add({
        severity: 'success',
        summary: CONSTANTS.SUMMARY.SUMMARY_PAYMENT_NOT_DELETE,
        detail: CONSTANTS.MESSAGE_ALERT.PAYMENT_NOT_DELETE,
        key: 'br', life: 3000
      });
      this.getDashboardPayment();
    } else {
      this.confirmationService.confirm({
        message: CONSTANTS.CONFIRM.DELETE_PAYMENT,
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Hủy bỏ',
        accept: () => {
          this.paymentSrv.deletedPaymentList(documentId).subscribe((data) => {
            this.messageService.add({
              severity: 'success',
              summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
              detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
              key: 'br', life: 3000
            });
            this.getDashboardPayment();
          })
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
            detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
            key: 'br', life: 3000
          });
        },
      })
    }

  }

  onStatusChange(event: any) {
    this.query.page = 1;
    this.getDashboardPayment();
  }
  // Trigger search with debounce
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }
  searchPayment() {
    this.query.page = 1;
    this.getDashboardPayment();
  }

  resetFilters(): void {
    this.selectedStatus = -1;
    this.query.filter = '';
    this.query.page = 1; // Reset về trang đầu tiên
    this.getDashboardPayment(); // Gọi API để lấy lại dữ liệu ban đầu
  }

  getDashboardPayment() {
    this.paymentSrv.getDashboardPayment(this.query.filter, this.selectedStatus.value, this.query.page, this.query.size).subscribe((data) => {
      this.payment = data.data.data;
      this.totalItems = data.data.recordsTotal;
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getDashboardPayment();
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
    return isPayment === 1 ? STATUS.DA_THANH_TOAN : STATUS.CHO_THANH_TOAN;
  }

  setSelectedPayment(course: any) {
    this.selectedPayment = course;
  }

  handleDeletePayment() {
    if (this.selectedPayment) {
      const paymentID = this.selectedPayment.id;

      if (this.selectedPayment.isPayment === 1) {
        alert("Thanh toán đã được duyệt, không xóa được!");
        this.dialogDelete = false;
      } else {
        this.paymentSrv.deletedPaymentList(paymentID).subscribe({
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

      this.paymentSrv.updatePayment(payload).subscribe({
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
      this.paymentSrv.updatePayment(payload).subscribe({
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
