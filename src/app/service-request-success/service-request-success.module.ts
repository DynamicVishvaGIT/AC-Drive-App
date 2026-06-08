import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceRequestSuccessPageRoutingModule } from './service-request-success-routing.module';

import { ServiceRequestSuccessPage } from './service-request-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceRequestSuccessPageRoutingModule
  ],
  declarations: [ServiceRequestSuccessPage]
})
export class ServiceRequestSuccessPageModule {}
