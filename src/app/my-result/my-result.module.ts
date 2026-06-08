import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyResultPageRoutingModule } from './my-result-routing.module';

import { MyResultPage } from './my-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyResultPageRoutingModule
  ],
  declarations: [MyResultPage]
})
export class MyResultPageModule {}
