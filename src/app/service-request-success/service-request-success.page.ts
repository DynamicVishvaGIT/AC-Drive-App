import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-request-success',
  templateUrl: './service-request-success.page.html',
  styleUrls: ['./service-request-success.page.scss'],
  standalone: false,
})
export class ServiceRequestSuccessPage implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  backToDashboard() {
    this.router.navigate(['/home']);
  }

  submitAnotherRequest() {
    this.router.navigate(['/my-service-request']);
  }

}
