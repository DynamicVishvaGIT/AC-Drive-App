import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VdfSelectToolPageRoutingModule } from './vdf-select-tool-routing.module';

import { VdfSelectToolPage } from './vdf-select-tool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VdfSelectToolPageRoutingModule
  ],
  declarations: [VdfSelectToolPage]
})
export class VdfSelectToolPageModule {}
