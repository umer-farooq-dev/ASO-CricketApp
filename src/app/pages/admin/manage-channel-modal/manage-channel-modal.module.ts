import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageChannelModalPageRoutingModule } from './manage-channel-modal-routing.module';

import { ManageChannelModalPage } from './manage-channel-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageChannelModalPageRoutingModule
  ],
  declarations: [ManageChannelModalPage]
})
export class ManageChannelModalPageModule {}
