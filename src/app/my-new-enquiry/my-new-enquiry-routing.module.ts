import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyNewEnquiryPage } from './my-new-enquiry.page';

const routes: Routes = [
  {
    path: '',
    component: MyNewEnquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyNewEnquiryPageRoutingModule {}
