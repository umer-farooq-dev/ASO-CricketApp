import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/Api/api.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { HelperService } from 'src/app/services/helper.service';
import { LocalService } from 'src/app/services/Local/local.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/Toast/toast.service';
import { ManageChannelModalPage } from '../manage-channel-modal/manage-channel-modal.page';
import { ManageMatchModalPage } from '../manage-match-modal/manage-match-modal.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
segmentModel="matches"

channel={
  name:"",
  image:"",
  iframe:"",
  createdAt:"",
  updatedAt:"",
  isVisible:true
}
match={
  title:"",
  date:"",
  time:"",
  description:"",
  stadium:"",
  image:"",
  iframe:"",
  createdAt:"",
  updatedAt:"",
  isVisible:true
}
constructor(
  public local:LocalService,
  public nav:NavigationService,
  private auth:AuthenticationService,
  public actionsheet:ActionSheetController,
  public camera:Camera,
  private storage: AngularFireStorage,
  public helper:HelperService,
  private toast:ToastService,
  private api:ApiService,
  private alert:AlertController,
  private modal:ModalController
) { }
machesList=[]
channelsList=[]
reportlist=[]
allOrder=[]
userType="";
ngOnInit() {

  let rooms = this.api.getMatchesList();
  rooms.snapshotChanges().subscribe(res => {
    this.machesList = [];
    res.forEach(item => {
      let a = item.payload.toJSON();
      a['id'] = item.key;
     this.machesList.push(a);

    })
  
  })

  let channel = this.api.getChannelList();
  channel.snapshotChanges().subscribe(res => {
    this.channelsList = [];
    res.forEach(item => {
      let a = item.payload.toJSON();
      a['id'] = item.key;
     this.channelsList.push(a);

    })
  
  })

  let r = this.api.getReportList();
  r.snapshotChanges().subscribe(res => {
    this.reportlist = [];
    res.forEach(item => {
      let a = item.payload.toJSON();
      a['id'] = item.key;
     this.reportlist.push(a);

    })
  
  })
}


  async openMatchModal(id?) {
    const modal = await this.modal.create({
      component: ManageMatchModalPage,
      componentProps: {
        'id': id
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

  async openChannelModal(id?) {
    const modal = await this.modal.create({
      component: ManageChannelModalPage,
      componentProps: {
        'id': id
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

  deleteMatch(id){
    this.api.deleteMatch(id);
  }

  deleteChannel(id){
    this.api.deleteChannel(id);
  }

  deleteReport(id){
    this.api.deleteReport(id);
  }

  async  ConfirmMatchDelete(id){
   
    let alert=await this.alert.create({
      header:"Delete",
      message:"Do You Want to Delete?",
      buttons:[{
        role:"cancel",
        text:"Cancel",
        cssClass:"text-danger",
        handler:(()=>{

        })
      },
      {
        text:"Delete",
        cssClass:"text-primary",

        handler:(()=>{

          this.deleteMatch(id);
          
        })
      },
    ]
    })
    alert.present();
    }

    async  ConfirmChannelDelete(id){
   
      let alert=await this.alert.create({
        header:"Delete",
        message:"Do You Want to Delete?",
        buttons:[{
          role:"cancel",
          text:"Cancel",
          cssClass:"text-danger",
          handler:(()=>{
  
          })
        },
        {
          text:"Delete",
          cssClass:"text-primary",
  
          handler:(()=>{
  
            this.deleteChannel(id);
            
          })
        },
      ]
      })
      alert.present();
      }


      async  ConfirmReportDelete(id){
        let alert=await this.alert.create({
          header:"Delete",
          message:"Do You Want to Delete?",
          buttons:[{
            role:"cancel",
            text:"Cancel",
            cssClass:"text-danger",
            handler:(()=>{
    
            })
          },
          {
            text:"Delete",
            cssClass:"text-primary",
    
            handler:(()=>{
    
              this.deleteReport(id);
              
            })
          },
        ]
        })
        alert.present();
        }


 
        async  comingSoonAlert(){
          let alert=await this.alert.create({
            
            message:"Coming soon...",
            buttons:[{
              role:"cancel",
              text:"OK",
              cssClass:"text-danger",
              handler:(()=>{
      
              })
            },

          ]
          })
          alert.present();
          }
   

}
