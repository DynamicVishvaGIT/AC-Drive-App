import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../user';
import { Common } from '../common';
import { Api } from '../api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  dashboard_data:any;
  quickActions = [
    {
      title: 'AC Drive Selection',
      icon: 'calculator-outline',
      color: 'blue'
    },
    {
      title: 'Manage Leads',
      icon: 'people-outline',
      color: 'orange'
    },
    {
      title: 'Take a Quiz',
      icon: 'book-outline',
      color: 'purple'
    },
    {
      title: 'Training Registration',
      icon: 'school-outline',
      color: 'purple'
    },
    {
      title: 'New Enquiry',
      icon: 'document-text-outline',
      color: 'green'
    },
    {
      title: 'Service Request',
      icon: 'construct-outline',
      color: 'yellow'
    }
  ];

  recentActivities = [
    {
      title: 'Enquiry #1247 Submitted',
      subtitle: 'VFD 5.5kW specification request',
      time: '2 hours ago',
      icon: 'document-text-outline',
      bg: 'green-bg'
    },
    {
      title: 'Quiz Completed',
      subtitle: 'AC Drive Fundamentals - Score: 85%',
      time: '1 day ago',
      icon: 'book-outline',
      bg: 'purple-bg'
    },
    {
      title: 'Drive Calculation Saved',
      subtitle: 'Motor: 7.5kW, 415V, 3-Phase',
      time: '3 days ago',
      icon: 'calculator-outline',
      bg: 'blue-bg'
    }
  ];

  constructor(private toastController: ToastController, private router: Router, private userService: User, private commonService: Common, private apiService: Api) {
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
      this.dashboard_count_api();
    });
  }

  dashboard_count_api() {
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append("user_id",this.currentUser.USER_ID),
    this.apiService.dashboard_count_api(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      // this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.dashboard_data = response.data;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  async openAction(title: string) {
    if(title=='AC Drive Selection'){
      this.router.navigateByUrl('vdf-select-tool');
    }
    else if(title=='Manage Leads') {
      this.router.navigateByUrl('my-leads');
    }
    else if(title=='Take a Quiz') {
      this.router.navigateByUrl('my-quiz');
    }
    else if(title=='Training Registration') {
      this.router.navigateByUrl('training-registration');
    }
    else if(title=='New Enquiry') {
      this.router.navigateByUrl('my-enquiry');
    }
    else if(title=='Service Request') {
      this.router.navigateByUrl('my-service-request');
    }
    // const toast = await this.toastController.create({
    //   message: `${title} clicked`,
    //   duration: 1500,
    //   position: 'bottom'
    // });

    // await toast.present();
  }


}
