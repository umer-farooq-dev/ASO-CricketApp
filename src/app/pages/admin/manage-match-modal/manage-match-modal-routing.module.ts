import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageMatchModalPage } from './manage-match-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ManageMatchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMatchModalPageRoutingModule {}
