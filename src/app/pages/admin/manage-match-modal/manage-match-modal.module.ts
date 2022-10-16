import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMatchModalPageRoutingModule } from './manage-match-modal-routing.module';

import { ManageMatchModalPage } from './manage-match-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageMatchModalPageRoutingModule
  ],
  declarations: [ManageMatchModalPage]
})
export class ManageMatchModalPageModule {}
