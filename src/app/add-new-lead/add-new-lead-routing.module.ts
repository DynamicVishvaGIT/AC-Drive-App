import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewLeadPage } from './add-new-lead.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewLeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewLeadPageRoutingModule {}
