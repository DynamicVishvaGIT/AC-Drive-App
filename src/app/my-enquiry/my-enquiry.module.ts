import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEnquiryPageRoutingModule } from './my-enquiry-routing.module';

import { MyEnquiryPage } from './my-enquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyEnquiryPageRoutingModule
  ],
  declarations: [MyEnquiryPage]
})
export class MyEnquiryPageModule {}
