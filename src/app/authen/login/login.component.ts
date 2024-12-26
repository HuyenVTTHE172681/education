import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authen.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginObj: any;
  isLoading: boolean = false;
  error: string = '';
  showIcon: boolean = false;
  passwordType: string = 'password';
  user: any = null;

  constructor(
    private fb: FormBuilder,
    private authenticationSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginObj = this.fb.group({
      Username: [''],
      Password: [''],
    });
  }

  login() {
    console.log('Bắt đầu gửi request đăng nhập với dữ liệu:', this.loginObj);

    this.authenticationSrv.login(this.loginObj.value).subscribe({
      next: (res) => {
        console.log('Phản hồi từ API đăng nhập:', res);

        const token = res.data.token;
        const username = res.data.username;

        if (token) {
          // Lưu token vào localStorage
          localStorage.setItem('token', token);
          console.log('Token đã được lưu:', token);

          // Lấy thông tin chi tiết của user
          this.authenticationSrv.getUserInfo(username).subscribe({
            next: (userRes) => {
              console.log('Thông tin người dùng từ API:', userRes);

              localStorage.setItem('user', JSON.stringify(userRes.data));
              alert('Đăng nhập thành công!');
              this.router.navigate(['/home']);
            },
            error: (err) => {
              console.error('Lỗi khi lấy thông tin người dùng:', err);
              alert('Không thể lấy thông tin người dùng.');
            },
          });
        } else {
          alert('Đăng nhập thất bại! Không tìm thấy token.');
        }
      },
      error: (err) => {
        console.error('Lỗi khi gửi request đăng nhập:', err);
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      },
    });
  }

  onChange() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showIcon = true;
      console.log(this.showIcon);
    } else {
      this.passwordType = 'password';
      this.showIcon = false;
      console.log(this.showIcon, this.passwordType);
    }
  }

  // getUser() {
  //   this.user = this.authenticationSrv.user$.subscribe((res) => {
  //     this.user = res;
  //     console.log('USER:', this.user);
  //   });
  // }
}
