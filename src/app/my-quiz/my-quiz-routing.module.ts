import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyQuizPage } from './my-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: MyQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQuizPageRoutingModule {}
