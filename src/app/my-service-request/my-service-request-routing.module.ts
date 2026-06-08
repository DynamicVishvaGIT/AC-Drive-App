import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyServiceRequestPage } from './my-service-request.page';

const routes: Routes = [
  {
    path: '',
    component: MyServiceRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyServiceRequestPageRoutingModule {}
