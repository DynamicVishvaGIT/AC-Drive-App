import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyNewEnquiryPageRoutingModule } from './my-new-enquiry-routing.module';

import { MyNewEnquiryPage } from './my-new-enquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyNewEnquiryPageRoutingModule
  ],
  declarations: [MyNewEnquiryPage]
})
export class MyNewEnquiryPageModule {}
