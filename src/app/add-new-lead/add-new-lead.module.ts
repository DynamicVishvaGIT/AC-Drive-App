import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewLeadPageRoutingModule } from './add-new-lead-routing.module';

import { AddNewLeadPage } from './add-new-lead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewLeadPageRoutingModule
  ],
  declarations: [AddNewLeadPage]
})
export class AddNewLeadPageModule {}
