import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CameraOptions } from '@awesome-cordova-plugins/camera';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ModalController, NavParams, ActionSheetController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/Api/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-manage-channel-modal',
  templateUrl: './manage-channel-modal.page.html',
  styleUrls: ['./manage-channel-modal.page.scss'],
})
export class ManageChannelModalPage implements OnInit {
  channel={
    name:"",
    image:"",
    iframe:"",
    createdAt:"",
    updatedAt:"",
    isVisible:true
  }
  id=0;
  constructor(
    public modal:ModalController,
    private navParams:NavParams,
    private actionsheet:ActionSheetController,
    private camera:Camera,
    private storage: AngularFireStorage,
    private helper:HelperService,
    private toast:ToastService,
    private alert:AlertController,
    private api:ApiService
  ) { 
    let id=navParams.get('id');
    if(id==undefined || id==""){
      this.id=0;
    }
    else
    {
      this.id=id;
      
      this.api.getChannelByID(this.id).valueChanges().subscribe((result:any)=>{
        if(result){
          this.channel=result
        }
         })
    }
  }

  ngOnInit() {
  }

  async AddImage() {

    let action = await this.actionsheet.create({
      header: "Choose",
      buttons: [
      {

        icon: "image-outline",
        text: "Choose From Gallery",
        handler: () => {
        this.ChoosePicture()
        }
      }
      ]
    })
    action.present();
  }

  ChoosePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation: true,
      saveToPhotoAlbum: false,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.channel.image=base64Image;
    }, (err) => {
      console.log(err);

    });
  }

  UploadToFirebase(base64img: any,folder,ImageName) {
    return new Promise((resolve, reject) => {
      if(base64img==""){
        return resolve("");
      }
      else
      {
      fetch(base64img).then(res => res.blob().then(data=>{
        this.storage.ref("/"+folder+"/").child(ImageName + this.helper.GetPrimarykey().toString()+ ".jpg").put(data).then(function(snapshot) {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            if (downloadURL != undefined) {
                       return resolve(downloadURL);
                      } else {
                        alert("image Not Uploaded");
                     }
          });
          })
      }))
    }
    })
    
  }

  async UploadBanner(){   
    return new Promise((resolve,reject)=>{
      if(this.channel.image.startsWith('data')){
      this.UploadToFirebase(this.channel.image,"Channel_Banner_"+new Date().getFullYear(),this.channel.name.replace(" ","_")).then((imagepath:any)=>{
        if(imagepath !=undefined){
          return resolve(imagepath);
        }
        else
        {        
          console.log("Not Uploaded")
        }
      },(error)=>{
        return reject(error);
      })
    }
    else
    {
      return resolve(this.channel.image);
    }
    })
  }

  async  ConfirmSave(){
    if(this.Validation()==true){
    let alert=await this.alert.create({
      header:"Save",
      message:"Do You Want to Save?",
      buttons:[{
        role:"cancel",
        text:"Cancel",
        cssClass:"text-danger",
        handler:(()=>{

        })
      },
      {
        text:"Save",
        cssClass:"text-primary",

        handler:(()=>{

          this.SaveChannel();
          
        })
      },
    ]
    })
    alert.present();
    }
  }


  Validation(){
    if(this.channel.name==""){
      this.toast.show("Title is Required",'e');
      return false;
    }
    if(this.channel.iframe==""){
      this.toast.show("iframe is Required",'e');
      return false;
    }
    if(this.channel.image==""){
      this.toast.show("Image is Required",'e');
      return false;
    }



    else
    {
      return true;
    }
  }

  SaveChannel(){

   
    this.UploadBanner().then((road:any)=>{
              this.channel.createdAt=this.helper.getTodayDate();
              this.channel.updatedAt="-";
              this.channel.isVisible=true;
      this.channel.image=road;
                this.api.saveChannel(this.channel).then((value)=>{
                 
                    this.toast.show("Saved","e");
                    this.id=0;
                    this.modal.dismiss();
                 
                })
              })

  
}

async  ConfirmUpdate(){
  if(this.Validation()==true){
  let alert=await this.alert.create({
    header:"Update",
    message:"Do You Want to Update?",
    buttons:[{
      role:"cancel",
      text:"Cancel",
      cssClass:"text-danger",
      handler:(()=>{

      })
    },
    {
      text:"Update",
      cssClass:"text-primary",

      handler:(()=>{

        this.UpdateChannel();
        
      })
    },
  ]
  })
  alert.present();
  }
}

UpdateChannel(){
  
              this.channel.updatedAt=this.helper.getTodayDate();
              this.channel.isVisible=true;
                this.api.updateMatch(this.id.toString(),this.channel).then((value)=>{
                 
                    this.toast.show("Updated","e");
                    this.modal.dismiss();
                 
                })
}

checkboxClick(e){
  var statement = true;
  if(statement){
    e.checked = true;
  }
}

}
