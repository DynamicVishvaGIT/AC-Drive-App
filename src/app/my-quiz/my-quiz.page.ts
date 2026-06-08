import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../user';
import { Common } from '../common';
import { Api } from '../api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-quiz',
  templateUrl: './my-quiz.page.html',
  styleUrls: ['./my-quiz.page.scss'],
  standalone: false,
})
export class MyQuizPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser: any;
  selectedTab: string = 'All';
  quizes: any =[];
  filteredQuizzes: any[] = [];
  completedCount = 0;
  pendingCount = 0;
  avgScore = 0;
  dataLoaded:boolean = true;

  constructor(private router: Router, private userService: User, private commonService: Common, private apiService: Api) { 
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
      this.load_quiz('All');
    });
  }

  load_quiz(status: string) {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    let formData = new FormData();
    formData.append("user_id",this.currentUser.USER_ID),
    formData.append("status",status),
    this.apiService.load_quiz_home(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      // this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.quizes = response.data;
      this.completedCount = response.stats.completed;
      this.pendingCount = response.stats.pending;
      this.avgScore = response.stats.average_score;
      // this.completedCount = this.quizes.filter(
      //   (q:any) => q.status === 'Completed'
      // ).length;
      // this.pendingCount = this.quizes.filter(
      //   (q:any) => q.status === 'Pending'
      // ).length;
      // const totalScore = this.quizes.reduce(
      //   (sum:any, q:any) => sum + (q.score_percentage || 0),
      //   0
      // );
      // this.avgScore = this.quizes.length
      //   ? Math.round(totalScore / this.quizes.length)
      //   : 0;
      this.selectedTab = status;
      this.filteredQuizzes = [...this.quizes];
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.dataLoaded = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  // selectTab(tab: string) {
  //   this.selectedTab = tab;
  //   if (tab === 'All') {
  //     this.filteredQuizzes = this.quizzes;
  //   }
  //   else if (tab === 'Pending') {
  //     this.filteredQuizzes =
  //     this.quizzes.filter(x => x.status === 'Pending');
  //   }
  //   else {
  //     this.filteredQuizzes =
  //     this.quizzes.filter(x => x.status === 'Completed');
  //   }
  // }

  getLevelClass(level: string) {
    switch (level) {
      case 'Beginner':
        return 'beginner';
      case 'Intermediate':
        return 'intermediate';
      case 'Advanced':
        return 'advanced';
      default:
        return '';
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'Pending':
        return 'pending';
      default:
        return '';
    }
  }

  goToTrainingRegistartion() {
    this.router.navigate(['/training-registration']);
  }

  goToQuizDetails(data:any) {
    const navigationExtras: NavigationExtras = {
      state: {
        quizData: data
      }
    };
    this.router.navigate(['/my-quiz-details'],navigationExtras);
  }

}
