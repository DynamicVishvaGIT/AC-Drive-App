import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyEnquiryPage } from './my-enquiry.page';

const routes: Routes = [
  {
    path: '',
    component: MyEnquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyEnquiryPageRoutingModule {}
