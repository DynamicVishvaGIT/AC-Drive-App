import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyQuizPageRoutingModule } from './my-quiz-routing.module';

import { MyQuizPage } from './my-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyQuizPageRoutingModule
  ],
  declarations: [MyQuizPage]
})
export class MyQuizPageModule {}
