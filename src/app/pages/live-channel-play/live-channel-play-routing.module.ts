import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveChannelPlayPage } from './live-channel-play.page';

const routes: Routes = [
  {
    path: '',
    component: LiveChannelPlayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveChannelPlayPageRoutingModule {}
