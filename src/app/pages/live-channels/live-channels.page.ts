import { Component, OnInit } from '@angular/core';
import { AdmobService } from 'src/app/services/admob.service'

import { ApiService } from 'src/app/services/Api/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-live-channels',
  templateUrl: './live-channels.page.html',
  styleUrls: ['./live-channels.page.scss'],
})
export class LiveChannelsPage implements OnInit {
  channelsList=[]
  constructor(
    public nav:NavigationService,
    private api:ApiService,
    private helper:HelperService,
    private admobService: AdmobService,
   ) { 
    // const admobOptions: AdmobOptions = {
    //   bannerAdId: 'ca-app-pub-7021784224754209/9493697395',
    //   interstitialAdId: 'ca-app-pub-7021784224754209/9302125708',
    //   rewardedAdId: 'XXX-XXXX-XXXX',
    //   isTesting: true,
    //   autoShowBanner: false,
    //   autoShowInterstitial: false,
    //   autoShowRewarded: false,
    //   adSize: this.admob.AD_SIZE.BANNER
    // };

      
    //    this.admob.setOptions(admobOptions)
    //    .then(() => console.log('Admob options have been successfully set'))
    //    .catch(err => console.error('Error setting admob options:', err));
   }

  ngOnInit() {
    let channel = this.api.getChannelList();
  channel.snapshotChanges().subscribe(res => {
    this.channelsList = [];
    res.forEach(item => {
      let a = item.payload.toJSON();
      a['id'] = item.key;
     this.channelsList.push(a);

    })
  
  })

  this.admobService.createBannerView();
this.admobService.showBannerAd();
   
  }


  liveChannel(iframe){
    this.admobService.requestInterstitialAd();
    this.admobService.showInterstitialAd();
    this.helper.iframe=iframe;
    this.nav.goto_playchannel();
  }



}
