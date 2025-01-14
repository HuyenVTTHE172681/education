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
    this.authenticationSrv.login(this.loginObj.value).subscribe({
      next: (res) => {
        const token = res?.data?.token;
        const username = res?.data?.username;

        if (token) {
          // Store token in localStorage
          localStorage.setItem('token', token);  // 'token' is the correct key

          // Fetch user details
          this.authenticationSrv.getUserInfo(username).subscribe({
            next: (userRes) => {

              localStorage.setItem('user', JSON.stringify(userRes.data));
              alert('Đăng nhập thành công!');
              this.router.navigate(['/edu']);
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
