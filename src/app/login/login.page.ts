import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Common } from '../common';
import { Api } from '../api';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  login_data: any={email_id:'', password:''};

  email: string = '';
  password: string = '';

  showPassword: boolean = false;

  emailFocused: boolean = false;
  passwordFocused: boolean = false;

  constructor(private router: Router, private commonService: Common, private apiService: Api, private userService: User) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  onLogin() {
    if (!this.login_data.email_id) {
      this.commonService.showToastMessage('Enter the Email Id.', 'toast-error','', 2000);
      return;
    }
    let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    if (!epattern.test(this.login_data.email_id)) {
      this.commonService.showToastMessage('Please enter email in correct format.', 'toast-error', 'top', 2000);
      return;
    }
    if (!this.login_data.password) {
      this.commonService.showToastMessage('Enter the password.', 'toast-error','', 2000);
      return;
    }
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append("email_id",this.login_data.email_id),
    formData.append("password",this.login_data.password),
    formData.append("device_type",this.commonService.device_type),
    this.apiService.login(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      // response.data['form_completed'] = response.form_completed;
      this.userService.setCurrentUser(response.data);
      localStorage.setItem('currentUser',JSON.stringify(response.data));
      this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.commonService.dismissLoading();
      this.login_data = { email_id: '', password: '' };
      this.router.navigateByUrl('home');
    },
    respError => {console.log(respError);
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToSignup() {
    this.router.navigateByUrl('sign-up');
  }

}
