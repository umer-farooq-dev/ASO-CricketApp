import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { TabsPage } from './pages/tabs/tabs.page';
import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';



import { AdmobService } from './services/admob.service';
import { Admob } from '@awesome-cordova-plugins/admob/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';





@NgModule({
  declarations: [AppComponent,TabsPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
 AppRate,
 Camera,
 Admob,
 AdmobService,
 SocialSharing



  ],
exports:[],
  bootstrap: [AppComponent],
})
export class AppModule {}
