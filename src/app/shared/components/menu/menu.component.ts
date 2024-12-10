import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { AuthService } from '../../../services/authen.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  menuAdmin: any[] = [];
  isAdmin: boolean = false;
  user: any = null;

  constructor(private menuService: MenuService, private authenSrv: AuthService) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.getMenuItems();
    this.getMenuAdmin();
  }

  getMenuItems() {
    this.menuService.getMenuItems().subscribe((items: any) => {
      this.menu = items;
    });
  }

  getMenuAdmin(): void {
    this.menuService.getMenuAdmin().subscribe((items: any) => {
      this.menuAdmin = items;
      console.log('Menu admin: ', this.menuAdmin);
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
}
