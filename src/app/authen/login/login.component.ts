import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authen.service';
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
  ) {}

  ngOnInit(): void {
    this.loginObj = this.fb.group({
      Username: [''],
      Password: [''],
    });

    this.getUser();
  }

  login() {
    if (this.loginObj.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.authenticationSrv.login(this.loginObj.value).subscribe(
          (res) => {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('refresh_token', res.refresh_token);
            alert('Đăng nhập hợp lệ.');
            this.isLoading = false;
            this.router.navigate(['/edu']);
          },
          (err) => {
            console.log(err);
            alert('Đăng nhập không hợp lệ. Vui long thử lại.');
            this.isLoading = false;
          }
        );
      }, 1000);
    } else {
      this.loginObj.markAllAsTouched();
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ.');
    }
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

  getUser() {
    this.user = this.authenticationSrv.user$.subscribe((res) => {
      this.user = res;
      console.log('USER:', this.user);
    });
  }
}
