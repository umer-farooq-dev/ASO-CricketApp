import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';


const routes: Routes = [

  {
    path: 'livematch',
    loadChildren: () => import('./pages/live-match/live-match.module').then( m => m.LiveMatchPageModule)
  },

  {
    path: '',
    redirectTo: 'tabs/livematch',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component:TabsPage,
    children:[
      {
        path: 'livematch',
        loadChildren: () => import('./pages/live-match/live-match.module').then( m => m.LiveMatchPageModule)
      },
      {
        path: 'livechannels',
        loadChildren: () => import('./pages/live-channels/live-channels.module').then( m => m.LiveChannelsPageModule)
      },

      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
     
    ]
  },
  {
    path: 'channelplay',
    loadChildren: () => import('./pages/live-channel-play/live-channel-play.module').then( m => m.LiveChannelPlayPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'manage-match-modal',
    loadChildren: () => import('./pages/admin/manage-match-modal/manage-match-modal.module').then( m => m.ManageMatchModalPageModule)
  },
  {
    path: 'manage-channel-modal',
    loadChildren: () => import('./pages/admin/manage-channel-modal/manage-channel-modal.module').then( m => m.ManageChannelModalPageModule)
  },
  {
    path: 'report-modal',
    loadChildren: () => import('./pages/report-modal/report-modal.module').then( m => m.ReportModalPageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
