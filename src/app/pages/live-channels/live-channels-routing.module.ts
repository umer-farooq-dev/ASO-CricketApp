import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveChannelsPage } from './live-channels.page';

const routes: Routes = [
  {
    path: '',
    component: LiveChannelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveChannelsPageRoutingModule {}
