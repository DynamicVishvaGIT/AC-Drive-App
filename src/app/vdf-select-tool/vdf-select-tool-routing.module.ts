import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VdfSelectToolPage } from './vdf-select-tool.page';

const routes: Routes = [
  {
    path: '',
    component: VdfSelectToolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VdfSelectToolPageRoutingModule {}
