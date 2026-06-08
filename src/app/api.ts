import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Common } from './common';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  baseUrl = '';

  constructor(public httpClient: HttpClient, public commonService: Common) { 
    this.baseUrl = this.commonService.getBaseURL();
    // this.headers = this.commonService.getHeaders();
  }

  login(user:any) {
    return this.httpClient.post(this.baseUrl + 'user_login_api', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_user(user:any) {
    return this.httpClient.post(this.baseUrl + 'add_user', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  create_training_registration(user:any) {
    return this.httpClient.post(this.baseUrl + 'create_training_registration', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_technical_support(user:any) {
    return this.httpClient.post(this.baseUrl + 'add_technical_support', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_quiz_home(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'load_quiz_home', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  quiz_details(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'quiz_details', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  start_quiz_attempt(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'start_quiz_attempt', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_quiz_questions(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'load_quiz_questions', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  save_user_answer(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'save_user_answer', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  quiz_result(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'quiz_result', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  retake_quiz(quiz:any) {
    return this.httpClient.post(this.baseUrl + 'retake_quiz', quiz)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  dashboard_count_api(dashboard:any) {
    return this.httpClient.post(this.baseUrl + 'dashboard_count_api', dashboard)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_product() {
    return this.httpClient.get(this.baseUrl + 'load_product')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_leads(lead:any) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('user_id', lead.user_id);
    urlSearchParams.append('status', lead.status);
    return this.httpClient.get(this.baseUrl + 'load_leads?' +urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  add_lead(lead:any) {
    return this.httpClient.post(this.baseUrl + 'add_lead', lead)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_main_supply() {
    return this.httpClient.get(this.baseUrl + 'load_main_supply')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_application_type() {
    return this.httpClient.get(this.baseUrl + 'load_application_type')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_motor_type() {
    return this.httpClient.get(this.baseUrl + 'load_motor_type')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_encoder_feedback() {
    return this.httpClient.get(this.baseUrl + 'load_encoder_feedback')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_communication_protocol() {
    return this.httpClient.get(this.baseUrl + 'load_communication_protocol')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_remote_keypad() {
    return this.httpClient.get(this.baseUrl + 'load_remote_keypad')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_motor_efficiency() {
    return this.httpClient.get(this.baseUrl + 'load_motor_efficiency')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_motor_poles() {
    return this.httpClient.get(this.baseUrl + 'load_motor_poles')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_motor_kw() {
    return this.httpClient.get(this.baseUrl + 'load_motor_kw')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_motor_flc() {
    return this.httpClient.post(this.baseUrl + 'load_motor_flc', {})
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_motor_mapping(data:any) {
    return this.httpClient.post(this.baseUrl + 'get_motor_mapping', data)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_motor_specifications(vdfJson:any) {
    return this.httpClient.post(this.baseUrl + 'get_motor_specifications', vdfJson)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any = Response) {
    console.log(error);
    // Prefer message inside error.error.message if available
    let message = error?.error?.message || error?.error?.error || error?.message || 'Remote server unreachable. Please check your Internet connection.';
    return throwError(() => message);
  }
  
}
