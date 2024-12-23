import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../../services/footer.service';
import { AuthService } from '../../../services/authen.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  footer: any;
  footerLeft: any[] = [];
  footerRight: any[] = [];
  isAdmin: boolean = false;
  user: any = null;

  constructor(private footerSrv: FooterService, private authenSrv: AuthService) {}

  ngOnInit(): void {
    this.footerSrv.getFooter().subscribe((data) => {
      this.processFooterData(data);
    });
  }

  loadUserInfo() {
    const savedUser = localStorage.getItem('user');
    console.log('Thông tin người dùng từ localStorage:', savedUser);

    if (savedUser) {
      this.user = JSON.parse(savedUser);
      console.log('Người dùng hiện tại:', this.user);

      // Kiểm tra role
      this.isAdmin = this.user?.roleTypeDataId === 'admin';
      console.log('Is Admin:', this.isAdmin);

    } else {
      const token = localStorage.getItem('token');
      console.log('Không tìm thấy thông tin user, token hiện tại:', token);

      if (token) {
        // Gọi lại API nếu cần cập nhật thông tin
        this.authenSrv.getUserInfo('username-from-token').subscribe({
          next: (res) => {
            console.log('Phản hồi từ API lấy thông tin user:', res);

            this.user = res.data;
            localStorage.setItem('user', JSON.stringify(this.user));
          },
          error: (err) => {
            console.error('Lỗi khi gọi API lấy thông tin user:', err);
            alert('Không thể lấy thông tin người dùng.');
          },
        });
      }
    }
  }

  processFooterData(data: any): void {
    this.footerLeft = data.filter(
      (item: any) => item.title === 'Footerbeen trái'
    );
    this.footerRight = data.filter(
      (item: any) => item.title === 'Footer bên phải'
    );
  }
}
