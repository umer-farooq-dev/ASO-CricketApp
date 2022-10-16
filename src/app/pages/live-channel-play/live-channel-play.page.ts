import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmobService } from 'src/app/services/admob.service';
import { HelperService } from 'src/app/services/helper.service';



import { SafePipe } from "src/app/services/safePipe";

@Component({
  selector: 'app-live-channel-play',
  templateUrl: './live-channel-play.page.html',
  styleUrls: ['./live-channel-play.page.scss'],
})
export class LiveChannelPlayPage implements OnInit {
   iframe="";
  constructor(
 private helper:HelperService,
 public admob:AdmobService
  ) { 
    this.iframe=this.helper.iframe;
  }

  ngOnInit() {
this.ri();
  }

  ris(){
    this.admob.requestInterstitialAd();
    this.admob.showInterstitialAd();
  }


ri() {
setInterval(()=>{
  this.ris();
},600000)
  }

}


