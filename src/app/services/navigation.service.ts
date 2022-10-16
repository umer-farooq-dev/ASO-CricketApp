import { Injectable } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    public nav:NavController,
    public location:Location,
    public alert:AlertController,
  ) { }



  goto_playchannel(iframe?){
    this.nav.navigateForward("channelplay")
  }

  
  goto_login(){
    this.nav.navigateForward("login")
  }
  goto_dashboard(){
    this.nav.navigateRoot("tabs/livematch",{animationDirection:"forward"})
  }

  goto_notifications(){
    this.nav.navigateForward("notifications",{animationDirection:"forward"})
  }

  goto_adminDash(){
    this.nav.navigateRoot("dashboard",{animationDirection:"forward"})
  }
 


  goto_settings(){
    this.nav.navigateForward("settings",{animationDirection:"forward"})
  }



  go_back(){
    this.location.back();
  }



 async goto_logout(){
    let alert=await this.alert.create({
      header:"Logout",
      message:"Do you want to logout?",
      cssClass:"your-custom-class shad alertHeader",
      buttons:[
      {
        handler:(()=>{

        }),
        text:"Cancel",
        role:"cancel",
        cssClass:"text-danger"
        
      },
      {
        handler:(()=>{
          this.goto_dashboard();
        }),
        text:"Logout",
        cssClass:"colorsFont"

      },
    ]
    })
    alert.present();
  }


}