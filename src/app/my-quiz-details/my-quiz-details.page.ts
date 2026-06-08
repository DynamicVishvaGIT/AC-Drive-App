import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Api } from '../api';
import { Common } from '../common';
import { User } from '../user';

@Component({
  selector: 'app-my-quiz-details',
  templateUrl: './my-quiz-details.page.html',
  styleUrls: ['./my-quiz-details.page.scss'],
  standalone: false,
})
export class MyQuizDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;
  quizData: any;
  currentUser:any;
  quiz_details_data: any;

  constructor(private router: Router, private navCtrl: NavController, private toastController: ToastController, private userService: User, private commonService: Common, private apiService: Api) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.quizData = nav.extras.state['quizData'];
      console.log(this.quizData);
    }
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
      this.quiz_details();
    });
  }

  quiz_details() {
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append("user_id",this.currentUser.USER_ID),
    formData.append("quiz_id",this.quizData.quiz_id),
    this.apiService.quiz_details(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.quiz_details_data = response.data;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  startQuiz() {
    this.router.navigate(
      ['/my-questionnaire'],
      {
        state: {
          quiz_id: this.quizData.quiz_id,
          duration: this.quizData.duration_minutes
        }
      }
    );
  
    // this.navCtrl.navigateBack('/my-questionnaire');
  }

  goBack() {
    this.navCtrl.navigateBack('/my-quiz');
  }

}
