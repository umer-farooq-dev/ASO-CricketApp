import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingCtrl:LoadingController
  ) { }

  async showLoading(message) {
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'circles',
    });
  
    loading.present();
  }
  
  async hide(){
    this.loadingCtrl.dismiss();
   }
}
