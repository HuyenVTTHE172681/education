import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/authen.service';
import { FooterService } from '../../../core/services/api-core/footer.service';
import { Footer } from '../../../core/models/slide.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  footer: any;
  footerLeft: Footer[] = [];
  footerRight: Footer[] = [];
  isAdmin: boolean = false;
  user: any;
  query = {
    filter: '',
    page: 0,
    size: 10,
  }

  constructor(private footerSrv: FooterService, private authenSrv: AuthService) { }

  ngOnInit(): void {
    this.getFooter();
    this.loadUserInfo();
  }

  getFooter() {
    this.footerSrv.getFooter(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.processFooterData(data);
    });
  }
  loadUserInfo() {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      this.user = JSON.parse(savedUser);

      // Kiểm tra role
      this.isAdmin = this.user?.roleTypeDataId === 'admin';

    } else {
      const token = localStorage.getItem('token');

      if (token) {
        // Gọi lại API nếu cần cập nhật thông tin
        this.authenSrv.getUserInfo('username-from-token').subscribe({
          next: (res) => {
            this.user = res.data;
            localStorage.setItem('user', JSON.stringify(this.user));
          },
          error: (err) => {
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
