import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyQuizDetailsPage } from './my-quiz-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyQuizDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQuizDetailsPageRoutingModule {}
