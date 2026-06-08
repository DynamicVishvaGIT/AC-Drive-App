import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Common } from '../common';
import { Api } from '../api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  user_data: any = {full_name:'',email_id:'',mobile_number:'',company_name:'',password:'',confirm_Password:''};
  agreeTerms = false;
  showPassword = false;
  showCPassword = false;
  nameFocused = false;
  emailFocused = false;
  phoneFocused = false;
  companyFocused = false;
  passwordFocused = false;
  passwordCFocused = false;
  disable: boolean = false;

  constructor(private toastController: ToastController,private router: Router, private commonService: Common, private apiService: Api) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleCPassword() {
    this.showCPassword = !this.showCPassword;
  }

  async createAccount() {
    if (!this.user_data.full_name) {
      this.commonService.showToastMessage('Please enter full name.', 'toast-error','', 2000);
      return;
    }
    if (!this.user_data.email_id) {
      this.commonService.showToastMessage('Please enter email id.', 'toast-error','', 2000);
      return;
    }
    if (this.user_data.email_id) {
      let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
      if (!epattern.test(this.user_data.email_id)) {
        this.commonService.showToastMessage('Please enter email in correct format.', 'toast-error', 'top', 2000);
        return;
      }
    }
    if (!this.user_data.mobile_number) {
      this.commonService.showToastMessage('Please enter mobile number.', 'toast-error','', 2000);
      return;
    }
    let phonePattern = /(^\d{10}$)/;
    if (!phonePattern.test(this.user_data.mobile_number)) {
      this.commonService.showToastMessage('Please enter mobile number in correct format.', 'toast-error', 'top', 2000);
      return;
    }
    if (!this.user_data.company_name) {
      this.commonService.showToastMessage('Please enter company name.', 'toast-error','', 2000);
      return;
    }
    if (!this.user_data.password) {
      this.commonService.showToastMessage('Please enter password.', 'toast-error','', 2000);
      return;
    }
    if (!this.user_data.confirm_Password) {
      this.commonService.showToastMessage('Enter the confirm password.', 'toast-error','', 2000);
      return;
    }
    if (this.user_data.password != this.user_data.confirm_Password) {
      this.commonService.showToastMessage('Your password and confirm password should not match.', 'toast-error','', 2000);
      return;
    }
    if (!this.agreeTerms) {
      this.commonService.showToastMessage('Please accept terms & conditions', 'toast-error','', 2000);
      return;
    }
    this.commonService.presentLoading();
    this.disable = true;
    let formData = new FormData();
    formData.append("full_name",this.user_data.full_name),
    formData.append("email_id",this.user_data.email_id),
    formData.append("mobile_number",this.user_data.mobile_number),
    formData.append("company_name",this.user_data.company_name),
    formData.append("password",this.user_data.password),
    formData.append("confirm_Password",this.user_data.confirm_Password),
    this.apiService.add_user(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.commonService.dismissLoading();
      this.disable = false;
      this.router.navigate(['/login']);
    },
    respError => {
      this.disable = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
