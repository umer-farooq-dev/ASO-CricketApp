import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveChannelsPageRoutingModule } from './live-channels-routing.module';

import { LiveChannelsPage } from './live-channels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveChannelsPageRoutingModule
  ],
  declarations: [LiveChannelsPage]
})
export class LiveChannelsPageModule {}
