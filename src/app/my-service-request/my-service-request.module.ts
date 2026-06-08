import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyServiceRequestPageRoutingModule } from './my-service-request-routing.module';

import { MyServiceRequestPage } from './my-service-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyServiceRequestPageRoutingModule
  ],
  declarations: [MyServiceRequestPage]
})
export class MyServiceRequestPageModule {}
