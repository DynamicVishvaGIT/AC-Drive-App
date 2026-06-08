import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.page.html',
  styleUrls: ['./registration-success.page.scss'],
  standalone: false,
})
export class RegistrationSuccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDashboard() {
    this.router.navigate(['/home']);
  }

  continueLearning() {
    this.router.navigate(['/my-quiz']);
  }

}
