import { Component, OnInit } from '@angular/core';
import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
counter=0;
  constructor(
    private ar:AppRate,
    private nav:NavigationService,
    private social:SocialSharing
  ) { }

  ngOnInit() {
  }

  rateApp(){
    // set certain preferences
this.ar.setPreferences({
  storeAppURL: {
    android: 'market://details?id=com.asocricketapp.ibsoft',
  }
});

this.ar.promptForRating(true);
  }


  login(){
    this.counter +=1;

    if(this.counter==5){
      this.nav.goto_login();
      this.counter=0;
    }
  }

  shareApp(){
    this.social.canShareVia("ASO Cricket App","Hey Download this amazing live cricket app and enjoy live sreaming with freinds and family.","","https://play.google.com/store/apps/details?id=com.asocricketapp.ibsoft").then((done)=>{
      console.log(done);
    })
  }



}
