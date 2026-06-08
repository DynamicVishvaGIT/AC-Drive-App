import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceRequestSuccessPage } from './service-request-success.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceRequestSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRequestSuccessPageRoutingModule {}
