import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { User } from '../user';
import { Api } from '../api';
import { Common } from '../common';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-registration',
  templateUrl: './training-registration.page.html',
  styleUrls: ['./training-registration.page.scss'],
  standalone: false,
})
export class TrainingRegistrationPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  training_data:any={full_name:'',email_id:'',mobile_no:'',description:''};
  disable: boolean= false;

  constructor(private navCtrl: NavController, private toastController: ToastController, private userService: User, private apiService: Api, private commonService: Common,
    private router: Router
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('39',this.currentUser);
      } 
      else {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          this.currentUser = JSON.parse(storedUser);
          console.log('44',this.currentUser);
        }
      }
    });
  }

  submitRegistration() {
    if (!this.training_data.full_name) {
      this.commonService.showToastMessage('Please enter full name.', 'toast-error','', 2000);
      return;
    }
    if (!this.training_data.email_id) {
      this.commonService.showToastMessage('Please enter email id.', 'toast-error','', 2000);
      return;
    }
    if (this.training_data.email_id) {
      let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
      if (!epattern.test(this.training_data.email_id)) {
        this.commonService.showToastMessage('Please enter email in correct format.', 'toast-error', 'top', 2000);
        return;
      }
    }
    if (!this.training_data.mobile_no) {
      this.commonService.showToastMessage('Please enter mobile number.', 'toast-error','', 2000);
      return;
    }
    let phonePattern = /(^\d{10}$)/;
    if (!phonePattern.test(this.training_data.mobile_no)) {
      this.commonService.showToastMessage('Please enter mobile number in correct format.', 'toast-error', 'top', 2000);
      return;
    }
    this.commonService.presentLoading();
    this.disable = true;
    let formData = new FormData();
    formData.append("user_id",this.currentUser.USER_ID),  
    formData.append("full_name",this.training_data.full_name),
    formData.append("email_id",this.training_data.email_id),
    formData.append("mobile_no",this.training_data.mobile_no),
    formData.append("description",this.training_data.description),
    this.apiService.create_training_registration(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.commonService.dismissLoading();
      this.disable = false;
      this.training_data={full_name:'',email_id:'',mobile_no:'',description:''};
      this.router.navigate(['/registration-success']);
    },
    respError => {
      this.disable = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  // submit() {
  //   this.router.navigate(['/registration-success']);
  // }

  /* BACK */
  goBack() {
    this.navCtrl.navigateBack('/my-quiz');
  }

}
