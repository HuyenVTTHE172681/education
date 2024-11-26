import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: any = null;
  items: any[] = [];
  isDropdownOpen = false;

  constructor(private router: Router, private authenSrv: AuthService) {
    this.items = [
      {
        label: 'Trang quản trị',
        icon: 'pi pi-cog',
        command: () => {
          this.goToHome();
        },
      },
      {
        label: 'Thông tin cá nhân',
        icon: 'pi pi-users',
        command: () => {
          this.login();
        },
      },
      {
        label: 'Khóa học của tôi',
        icon: 'pi pi-book',
        command: () => {
          this.goToHome();
        },
      },
      {
        label: 'Quá trình học tập',
        icon: 'pi pi-clock',
        command: () => {
          this.login();
        },
      },
      {
        label: 'Kích hoạt khóa học',
        icon: 'pi pi-key',
        command: () => {
          this.goToHome();
        },
      },
      {
        label: 'Báo cáo',
        icon: 'pi pi-file',
        command: () => {
          this.login();
        },
      },
      {
        label: 'Đăng xuất',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  getUser() {
    this.authenSrv.getUserInfo('current-username').subscribe({
      next: (user) => {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        console.log(this.user + 'USERSRRRR');
      },
      error: (err) => {
        console.error('Lỗi lấy thông tin user:', err);
      },
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('refresh_token');
  //   localStorage.removeItem('userInfo');
  //   this.user = null;
  //   this.router.navigate(['/edu']);
  // }

  logout() {
    console.log('Đăng xuất, xóa dữ liệu localStorage.');
    localStorage.clear();
    this.user = null;
    alert('Bạn đã đăng xuất.');
    window.location.reload(); // Tải lại trang để reset UI
    this.router.navigate(['/edu']);
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  executeCommand(command: Function, overlayPanel: any) {
    if (command) {
      command();
    }
    overlayPanel.hide();
  }

  loadUserInfo() {
    const savedUser = localStorage.getItem('user');
    console.log('Thông tin người dùng từ localStorage:', savedUser);

    if (savedUser) {
      this.user = JSON.parse(savedUser);
      console.log('Người dùng hiện tại:', this.user);
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
}
