import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageChannelModalPage } from './manage-channel-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ManageChannelModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageChannelModalPageRoutingModule {}
