import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VdfSelectionResultPageRoutingModule } from './vdf-selection-result-routing.module';

import { VdfSelectionResultPage } from './vdf-selection-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VdfSelectionResultPageRoutingModule
  ],
  declarations: [VdfSelectionResultPage]
})
export class VdfSelectionResultPageModule {}
