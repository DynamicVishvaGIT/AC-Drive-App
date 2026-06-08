import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../user';
import { Common } from '../common';
import { Api } from '../api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-lead',
  templateUrl: './add-new-lead.page.html',
  styleUrls: ['./add-new-lead.page.scss'],
  standalone: false,
})
export class AddNewLeadPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  product_data:any=[];
  leadJson: any={product_id:'', lead_name:'', phone_number:''};

  nameFocused = false;
  phoneFocused = false;
  productFocused = false;

  disable: boolean = false;

  constructor(private navCtrl: NavController, private toastController: ToastController, private userService: User, private commonService: Common,
     private apiService: Api, private router: Router) { 
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
      this.load_product();
    });
  }

  load_product() {
    this.commonService.presentLoading();
    this.apiService.load_product()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.product_data = response.data;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  goBack() {
    this.navCtrl.back();
  }

  add_lead() {
    if (!this.leadJson.lead_name) {
      this.commonService.showToastMessage('Please enter lead name.', 'toast-error','', 2000);
      return;
    }
    if (!this.leadJson.phone_number) {
      this.commonService.showToastMessage('Please enter phone number.', 'toast-error','', 2000);
      return;
    }
    let phonePattern = /(^\d{10}$)/;
    if (!phonePattern.test(this.leadJson.phone_number)) {
      this.commonService.showToastMessage('Please enter mobile number in correct format.', 'toast-error', 'top', 2000);
      return;
    }
    if (!this.leadJson.product_id) {
      this.commonService.showToastMessage('Please enter product name.', 'toast-error','', 2000);
      return;
    }
    this.commonService.presentLoading();
    this.disable = true;
    let formData = new FormData();
    formData.append("lead_name",this.leadJson.lead_name),
    formData.append("phone_number",this.leadJson.phone_number),
    formData.append("product_id",this.leadJson.product_id),
    formData.append("user_id", this.currentUser.USER_ID)
    this.apiService.add_lead(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.commonService.dismissLoading();
      this.disable = false;
      this.router.navigate(['/my-leads']);
    },
    respError => {
      this.disable = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })

  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();

  }

}
