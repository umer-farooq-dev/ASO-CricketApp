import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private isToastVisible: boolean;
  constructor(
    public toast:ToastController
  ) { }


 async show(message,type){
  if(this.isToastVisible) {
    return;
  }

  this.isToastVisible = true;
    const toast=await this.toast.create({
      duration:1000,
      message:message,
      cssClass:type,
      position:"top"
    }).then((toast: HTMLIonToastElement) => {

      toast.onDidDismiss().then(() => {
        this.isToastVisible = false;
      });

    toast.present();
  })
}


}
