import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/authen.service';
import { CONSTANTS } from '../../../common/constants';

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
    private router: Router,
    private messageService: MessageService,
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
          localStorage.setItem('token', token);

          // Fetch user details
          this.authenticationSrv.getUserInfo(username).subscribe({
            next: (userRes) => {

              localStorage.setItem('user', JSON.stringify(userRes.data));
              this.messageService.add({
                severity: 'success',
                summary: CONSTANTS.SUMMARY.SUMMARY_LOGIN_SUCCESSFUL,
                detail: CONSTANTS.MESSAGE_ALERT.LOGIN_SUCCESSFUL,
                key: 'br', life: 3000
              });
              setTimeout(() => {
                this.router.navigate(['/edu']);
              }, 1000)
            },
            error: (err) => {
              this.messageService.add({
                severity: 'info',
                summary: CONSTANTS.SUMMARY.SUMMARY_ERROR,
                detail: CONSTANTS.MESSAGE_ALERT.ERROR,
                key: 'br', life: 3000
              });
            },
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: CONSTANTS.SUMMARY.SUMMARY_LOGIN_FAIL,
            detail: CONSTANTS.MESSAGE_ALERT.LOGIN_FAIL,
            key: 'br', life: 3000
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'info',
          summary: err.mess,
          detail: CONSTANTS.MESSAGE_ALERT.ERROR,
          key: 'br', life: 3000
        });
      },
    });
  }


  onChange() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showIcon = true;
    } else {
      this.passwordType = 'password';
      this.showIcon = false;
    }
  }

  // getUser() {
  //   this.user = this.authenticationSrv.user$.subscribe((res) => {
  //     this.user = res;
  //     console.log('USER:', this.user);
  //   });
  // }
}
