import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEnquiryDetailsPageRoutingModule } from './my-enquiry-details-routing.module';

import { MyEnquiryDetailsPage } from './my-enquiry-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyEnquiryDetailsPageRoutingModule
  ],
  declarations: [MyEnquiryDetailsPage]
})
export class MyEnquiryDetailsPageModule {}
