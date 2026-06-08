import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../user';
import { Api } from '../api';
import { Common } from '../common';

@Component({
  selector: 'app-my-result',
  templateUrl: './my-result.page.html',
  styleUrls: ['./my-result.page.scss'],
  standalone: false,
})
export class MyResultPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  attemptId: any;
  currentUser:any;
  my_results:any;

  totalQuestions = 5;
  correctAnswers = 1;
  incorrectAnswers = 4;
  percentage = 20;
  resultStatus = 'Not Passed';

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private userService: User, private apiService: Api, 
    private commonService: Common, private router: Router) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attemptId = params['attemptId'];
      console.log('Attempt ID:', this.attemptId);
    });
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
      this.quiz_result();
    });
    this.percentage = Math.round(
      (this.correctAnswers / this.totalQuestions) * 100
    );
    this.incorrectAnswers =
    this.totalQuestions - this.correctAnswers;
    this.resultStatus =
      this.percentage >= 70
      ? 'Passed'
      : 'Not Passed';
  }

  quiz_result() {
    let formData = new FormData();
    formData.append('attempt_id', this.attemptId.toString());
    // formData.append('attempt_id', '1');
    this.apiService.quiz_result(formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        console.log(response);
        if (response.status) {
          this.my_results = response.data;
        }
      },
      respError => {
        this.commonService.showToastMessage(respError,'toast-error','',4000);
      });
  }

  retake_quiz() {
    let formData = new FormData();
    formData.append('quiz_id', this.my_results.quiz_id);
    formData.append('user_id', this.currentUser.USER_ID);
    this.apiService.retake_quiz(formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        console.log(response);
        if (response.status) {
          this.commonService.showToastMessage(response.message,'toast-success','',2000);
          // this.navCtrl.navigateBack('/my-questionnaire');
          this.router.navigate(['/my-questionnaire']);
        }
      },
      respError => {
        this.commonService.showToastMessage(respError,'toast-error','',4000);
      });
  }

  /* QUIZ LIST */

  goToQuizList() {
    this.navCtrl.navigateBack('/my-quiz');
  }

  /* RETAKE */

  // retakeQuiz() {
  //   this.navCtrl.navigateBack('/my-questionnaire');
  // }

}
