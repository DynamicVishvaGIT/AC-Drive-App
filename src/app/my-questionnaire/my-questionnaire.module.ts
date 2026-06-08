import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyQuestionnairePageRoutingModule } from './my-questionnaire-routing.module';

import { MyQuestionnairePage } from './my-questionnaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyQuestionnairePageRoutingModule
  ],
  declarations: [MyQuestionnairePage]
})
export class MyQuestionnairePageModule {}
