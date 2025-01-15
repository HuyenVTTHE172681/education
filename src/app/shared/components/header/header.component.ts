import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authen.service';
import { MenuService } from '../../../core/services/api-core/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: any = null;
  items: any[] = [];
  isDropdownOpen = false;
  menu: any[] = [];
  menuAdmin: any[] = [];
  isAdmin: boolean = false;
  page: number = 1;
  size: number = 100;
  filter: string = '';
  screenAdmin: string = 'admin';
  screenUser: string = 'user';
  status: number = 1;

  constructor(private router: Router, private authenSrv: AuthService, private menuService: MenuService) {
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    this.user = null;
    window.location.reload(); // Tải lại trang để reset UI
    this.router.navigate(['/edu']);
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

      // Kiểm tra role
      this.isAdmin = this.user?.roleTypeDataId === 'admin';
      console.log('Is Admin:', this.isAdmin);

      // Gọi hàm lấy menu tương ứng
      this.loadMenu();

    } else {
      const token = localStorage.getItem('token');
      console.log('Không tìm thấy thông tin user, token hiện tại:', token);
      this.loadMenu();


      if (token) {
        // Gọi lại API nếu cần cập nhật thông tin
        this.authenSrv.getUserInfo('username-from-token').subscribe({
          next: (res) => {
            console.log('Phản hồi từ API lấy thông tin user:', res);

            this.user = res?.data;
            localStorage.setItem('user', JSON.stringify(this.user));

            // Cập nhật vai trò sau khi lấy thông tin user
            this.isAdmin = this.user?.roleTypeDataId === 'admin';
            console.log('Is Admin:', this.isAdmin);

            // Gọi hàm lấy menu tương ứng
            this.loadMenu();
          },
          error: (err) => {
            console.error('Lỗi khi gọi API lấy thông tin user:', err);
            alert('Không thể lấy thông tin người dùng.');
          },
        });
      }
    }
  }

  loadMenu() {
    if (this.isAdmin) {
      console.log('Người dùng là admin, gọi getMenuAdmin');
      this.getMenuAdmin();
    } else {
      console.log('Người dùng không phải admin, gọi getMenuUser');
      this.getMenuUser();
    }
  }

  getMenuUser() {
    this.menuService.getMenus(this.page, this.size, this.filter, this.screenUser, this.status).subscribe((data) => {
      console.log("Raw Menu User Data:", data.data.data);
      this.menu = this.buildTree(data.data.data);
      console.log("Processed Menu User:", this.menu);
    });
  }


  getMenuAdmin(): void {
    this.menuService.getMenus(this.page, this.size, this.filter, this.screenAdmin, this.status).subscribe((data) => {
      console.log("Raw Menu User Data:", data.data.data);
      this.menu = this.buildTree(data.data.data);
      console.log("Processed Menu User:", this.menu);
    })
  }

  buildTree = (arr: any[]) => {
    const results: any = [];
    arr.map(t => {
      if (t.childs && t.childs.length) {
        t.childs = this.buildTree(t.childs);
      }
      const result = {
        label: t.name,
        items: t.childs,
        icon: t.icon,
        actions: JSON.parse(t.actions) || [],
        path: t.path,
        command: () => {
          if (t.path !== 'none') {
            this.router.navigate([t.path]);
          }
        }
      };
      if (result.items && result.items.length === 0) {
        delete result.items;
      }

      // Kiểm tra nếu được phân quyền thì mới thêm vào hiển thị
      // if (this.user?.roles.map((role: any) => role.id).includes(t.id) || !this.user?.roles) {
      //   results.push(result);
      // }
      // return result;

      results.push(result);
    })
    return results;
  }



}
