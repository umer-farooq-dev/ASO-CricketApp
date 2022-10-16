import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveChannelPlayPageRoutingModule } from './live-channel-play-routing.module';

import { LiveChannelPlayPage } from './live-channel-play.page';
import { SafePipe } from 'src/app/services/safePipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveChannelPlayPageRoutingModule,
    
  ],
  declarations: [LiveChannelPlayPage,SafePipe]
})
export class LiveChannelPlayPageModule {}
