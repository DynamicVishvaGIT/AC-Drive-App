import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyQuizDetailsPageRoutingModule } from './my-quiz-details-routing.module';

import { MyQuizDetailsPage } from './my-quiz-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyQuizDetailsPageRoutingModule
  ],
  declarations: [MyQuizDetailsPage]
})
export class MyQuizDetailsPageModule {}
