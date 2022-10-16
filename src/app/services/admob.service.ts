import { Injectable } from '@angular/core';
import { Admob, AdmobOptions } from '@awesome-cordova-plugins/admob/ngx';



@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  constructor( 
    private admob: Admob
  ) {

   // Admob options config
   const admobOptions: AdmobOptions = {
    bannerAdId: 'ca-app-pub-7021784224754209/2928289040',
    interstitialAdId: 'ca-app-pub-7021784224754209/9302125708',
    rewardedAdId: 'XXX-XXXX-XXXX',
    isTesting: false,
    autoShowBanner: false,
    autoShowInterstitial: false,
    autoShowRewarded: false,
    adSize: this.admob.AD_SIZE.BANNER,
    publisherId:"ca-app-pub-7021784224754209~4432942400"
  };

  // Set admob options
  this.admob.setOptions(admobOptions)
    .then(() => console.log('Admob options have been successfully set'))
    .catch(err => console.error('Error setting admob options:', err));
  }

  createBannerView(){
  // (Optionally) Load banner ad, in order to have it ready to show
  this.admob.createBannerView()
  .then(() => console.log('Banner ad loaded'))
  .catch(err => console.error('Error loading banner ad:', err));
  
  }

  showBannerAd(){
// Show banner ad (createBannerView must be called before and onAdLoaded() event raised)
this.admob.onAdLoaded().subscribe((ad) => {
  if (ad.adType === this.admob.AD_TYPE.BANNER) {
    this.admob.showBannerAd()
      .then(() => console.log('Banner ad shown'))
      .catch(err => console.error('Error showing banner ad:', err));
  }
  });
  }


  HideBannerAd(){
// Hide banner ad, but do not destroy it, so it can be shown later on
// See destroyBannerView in order to hide and destroy banner ad
this.admob.showBannerAd(false)
.then(() => console.log('Banner ad hidden'))
.catch(err => console.error('Error hiding banner ad:', err));


  }

  requestInterstitialAd(){
// Request an interstitial ad, in order to be shown later on
// It is possible to autoshow it via options parameter, see docs
this.admob.requestInterstitialAd()
.then(() => console.log('Interstitial ad loaded'))
.catch(err => console.error('Error loading interstitial ad:', err));

  }

  showInterstitialAd(){
// Show an interstitial ad (requestInterstitialAd must be called before)
this.admob.onAdLoaded().subscribe((ad) => {
  if (ad.adType === this.admob.AD_TYPE.INTERSTITIAL) {
    this.admob.showInterstitialAd()
      .then(() => console.log('Interstitial ad shown'))
      .catch(err => console.error('Error showing interstitial ad:', err));
  }
  });
  }


  requestRewardedAd(){
// Request a rewarded ad
this.admob.requestRewardedAd()
.then(() => console.log('Rewarded ad loaded'))
.catch(err => console.error('Error loading rewarded ad:', err));
    
  }

  showRewardedAd(){
// Show rewarded ad (requestRewardedAd must be called before)
this.admob.onAdLoaded().subscribe((ad) => {
  if (ad.adType === this.admob.AD_TYPE.REWARDED) {
    this.admob.showRewardedAd()
      .then(() => console.log('Rewarded ad shown'))
      .catch(err => console.error('Error showing rewarded ad:', err));
  }
  });
  }


  destroyBannerView(){
// Hide and destroy banner or interstitial ad
this.admob.destroyBannerView();

  }

ShowAdsRandomly(){
  // On Ad loaded event
this.admob.onAdLoaded().subscribe((ad) => {
  if (ad.adType === this.admob.AD_TYPE.BANNER) {
    console.log('Banner ad is loaded');
    this.admob.showBannerAd();
  } else if (ad.adType === this.admob.AD_TYPE.INTERSTITIAL) {
    console.log('Interstitial ad is loaded');
    this.admob.showInterstitialAd();
  } else if (ad.adType === this.admob.AD_TYPE.REWARDED) {
    console.log('Rewarded ad is loaded');
    this.admob.showRewardedAd();
  }
  });
}





// // On ad failed to load
// this.admob.onAdFailedToLoad().subscribe(err => console.log('Error loading ad:', err));



// // On interstitial ad opened
// this.admob.onAdOpened().subscribe(() => console.log('Interstitial ad opened'));



// // On interstitial ad closed
// this.admob.onAdClosed().subscribe(() => console.log('Interstitial ad closed'));



// // On ad clicked and left application
// this.admob.onAdLeftApplication().subscribe(() => console.log('Ad lefted application'));



// // On user ad rewarded
// this.admob.onRewardedAd().subscribe(() => console.log('The user has been rewarded'));



// // On rewarded ad video started
// this.admob.onRewardedAdVideoStarted().subscribe(() => console.log('Rewarded ad vieo started'));



// // On rewarded ad video completed
// this.admob.onRewardedAdVideoCompleted().subscribe(() => console.log('Rewarded ad video completed'));


  }