import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { User } from '../user';
import { Api } from '../api';
import { filter, Subject, takeUntil } from 'rxjs';
import { Common } from '../common';

@Component({
  selector: 'app-my-questionnaire',
  templateUrl: './my-questionnaire.page.html',
  styleUrls: ['./my-questionnaire.page.scss'],
  standalone: false,
})
export class MyQuestionnairePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  attemptId: number = 0;
  quizId: number = 1; // change according to selected quiz

  currentQuestionIndex: number = 0;
  totalSeconds: number = 765;
  timerInterval: any;
  formattedTime: string = '12:45';
  my_questions: any=[];

  constructor(private navCtrl: NavController,private toastController: ToastController, private router: Router, private userService: User, 
    private apiService: Api, private commonService: Common) { 
    this._unsubscribeAll = new Subject();
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.quizId = navigation.extras.state['quiz_id'];
      this.totalSeconds =navigation.extras.state['duration'] * 60;
    }
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
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url.includes('/my-questionnaire')){ // Check if user navigated back to a specific URL
          this.currentQuestionIndex = 0;
          this.my_questions = [];
          this.startQuizAttempt();
        }
    });
    // this.startTimer();
  }

  startQuizAttempt() {
    let formData = new FormData();
    formData.append('user_id', this.currentUser.USER_ID);
    formData.append('quiz_id', this.quizId.toString());
    this.apiService.start_quiz_attempt(formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        console.log(response);
        if (response.status) {
          this.attemptId = response.attempt_id;
          this.startTimer();
          this.load_quiz_questions();
        }
      },
      respError => {
        this.commonService.showToastMessage(respError,'toast-error','',4000);
      });
  }

  load_quiz_questions() {
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append('attempt_id', this.attemptId.toString());
    // formData.append('attempt_id', '1');
    this.apiService.load_quiz_questions(formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        console.log(response);
        if (response.status) {
          this.my_questions = response.data;
          this.commonService.dismissLoading();
        }
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError,'toast-error','',4000);
      });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  get currentQuestion() {
    return this.my_questions[this.currentQuestionIndex];
  }

  get progressPercentage() {
    return Math.round(
      ((this.currentQuestionIndex + 1)
      / this.my_questions.length) * 100
    );
  }

  /* TIMER */
  startTimer() {
    this.updateFormattedTime();
    this.timerInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.updateFormattedTime();
      }
      else {
        clearInterval(this.timerInterval);
        this.submitQuiz();
      }
    }, 1000);
  }

  updateFormattedTime() {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.formattedTime =
      `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  /* SELECT OPTION */

  // selectOption(option: string) {
  //   this.currentQuestion.selectedAnswer = option;
  // }

  // selectOption(option: string) {
  //   this.currentQuestion.selectedAnswer = option;
  //   this.saveAnswer(option);
  // }

  selectOption(option: any) {
    this.currentQuestion.selected_option_id = option.option_id;
    this.saveAnswer(option.option_id);
  }

  saveAnswer(option_id: string) {
    // let selectedOptionId = this.getOptionId(option);
    // console.log(selectedOptionId);
    let formData = new FormData();
    formData.append('attempt_id',this.attemptId.toString());
    formData.append('question_id',this.currentQuestion.question_id.toString());
    formData.append('selected_option_id',option_id);
    this.apiService.save_user_answer(formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        console.log('Answer Saved', response);
      },
      respError => {
        this.commonService.showToastMessage(respError,'toast-error','',4000);
      });
  }

  getOptionId(option: string): number {
    const index = this.currentQuestion.options.indexOf(option);
    console.log(index);
    return index + 1;
  }

  /* NEXT */

  nextQuestion() {
    if (
      this.currentQuestionIndex <
      this.my_questions.length - 1
    ) {
      this.currentQuestionIndex++;
    }
  }

  /* PREVIOUS */

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  /* SUBMIT */

  submitQuiz() {
    this.router.navigate(['/my-result'], {
      queryParams: {
        attemptId: this.attemptId
      }
    });
  }

  /* BACK */

  goBack() {
    // this.navCtrl.back();
    this.router.navigate(['/my-quiz-details']);
  }

}
