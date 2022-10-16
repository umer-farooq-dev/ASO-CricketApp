import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertCtrl:AlertController,
    public nav:NavigationService,
    
  ) { }

 async Confirm(func,buttontext,message) {
    let alert = await this.alertCtrl.create({
      header:"Confirm?",
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: buttontext,
          handler: () => {
            func
          }
        }
      ]
    });
    alert.present();
  }



    async ExitConfirm() {
      const checkPropmt = await this.alertCtrl.getTop();
if(checkPropmt){
  this.alertCtrl.dismiss();
}

    let alert = await this.alertCtrl.create({
      header:"Exit",
      message: "are you sure to exit app?",
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'EXIT',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}