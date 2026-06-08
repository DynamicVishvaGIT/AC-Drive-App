import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingRegistrationPageRoutingModule } from './training-registration-routing.module';

import { TrainingRegistrationPage } from './training-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingRegistrationPageRoutingModule
  ],
  declarations: [TrainingRegistrationPage]
})
export class TrainingRegistrationPageModule {}
