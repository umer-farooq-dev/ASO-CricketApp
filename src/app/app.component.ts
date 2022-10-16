import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  url="";
  constructor(
    private platform:Platform,
    private router:Router,
    private alrt:AlertService,
    private modal:ModalController,
    private navCtrl:NavController
    ) {
  


      this.platform.backButton.subscribeWithPriority(999, async() => {
        if (this.modal.getTop()) {
            const modal = await this.modal.getTop();
            console.log(modal)
            if (modal) { 
                this.modal.dismiss();
                return;
            } else {
                if (this.router.url=="/tabs/livematch" ) {
                // navigator['app'].exitApp();
                this.alrt.ExitConfirm();
            } else {
                this.navCtrl.pop();
            }
        }
        } else {
            if (this.router.url=="/tabs/livematch") {
                // navigator['app'].exitApp();
                this.alrt.ExitConfirm();
            } else {
                this.navCtrl.pop();
            }
        } 
    });
   
  }


}
