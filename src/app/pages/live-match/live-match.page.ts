import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdmobService } from 'src/app/services/admob.service';
import { ApiService } from 'src/app/services/Api/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ReportModalPage } from '../report-modal/report-modal.page';


@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.page.html',
  styleUrls: ['./live-match.page.scss'],
})
export class LiveMatchPage implements OnInit {
  matchesList=[]
  constructor(
    private api:ApiService,
    private helper:HelperService,
    public nav:NavigationService,
    private admobService: AdmobService,
    private modal:ModalController

  ) { }

  ngOnInit() {

    let rooms = this.api.getMatchesList();
    rooms.snapshotChanges().subscribe(res => {
      this.matchesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['id'] = item.key;
       this.matchesList.push(a);
  
      })
    
    })

this.admobService.createBannerView();
this.admobService.showBannerAd();
  }

  liveChannel(iframe){

  }

  goToliveChannel(iframe) {
   this.admobService.requestInterstitialAd();
   this.admobService.showInterstitialAd();
    this.helper.iframe=iframe;
    this.nav.goto_playchannel();
  }


  async openReportModal(id,name,image) {
    const modal = await this.modal.create({
      component: ReportModalPage,
      componentProps: {
        'id': id,
        "name":name,
        "image":image
      }
    });
    modal.onDidDismiss().then((modelData) => {
      // if (modelData !== null) {
      //   this. = modelData.data;
      //   console.log('Modal Data : ' + modelData.data);
      // }
    });
    return await modal.present();
  }



  


}
