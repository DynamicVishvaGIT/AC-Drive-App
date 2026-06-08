import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyQuestionnairePage } from './my-questionnaire.page';

const routes: Routes = [
  {
    path: '',
    component: MyQuestionnairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQuestionnairePageRoutingModule {}
