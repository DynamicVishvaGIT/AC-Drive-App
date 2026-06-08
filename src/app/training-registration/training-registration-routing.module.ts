import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingRegistrationPage } from './training-registration.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRegistrationPageRoutingModule {}
