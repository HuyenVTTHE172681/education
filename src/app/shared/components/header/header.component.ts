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
    this.getUser();
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

  getUser() {
    this.user = this.authenSrv.user$.subscribe((res) => {
      this.user = res;
      console.log('USERRRRRRRRR:', this.user.avatar);
    });
  }

  logout(): void {
    this.authenSrv.logout();
    this.user = null;
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
}
