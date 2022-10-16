import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CameraOptions,Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/Api/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-manage-match-modal',
  templateUrl: './manage-match-modal.page.html',
  styleUrls: ['./manage-match-modal.page.scss'],
})
export class ManageMatchModalPage implements OnInit {
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
    let id=this.navParams.get('id');
    if(id==undefined || id==""){
      this.id=0;
    }
    else
    {
      this.id=id;
      
      this.api.getMatchByID(this.id).valueChanges().subscribe((result:any)=>{
        if(result){
          this.match=result
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
      this.match.image=base64Image;
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
      if(this.match.image.startsWith('data')){
      this.UploadToFirebase(this.match.image,"Match_Banner_"+new Date().getFullYear(),this.match.title.replace(" ","_")).then((imagepath:any)=>{
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
      return resolve(this.match.image);
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

          this.SaveMatch();
          
        })
      },
    ]
    })
    alert.present();
    }
  }


  Validation(){
    if(this.match.title==""){
      this.toast.show("Title is Required",'e');
      return false;
    }
    if(this.match.iframe==""){
      this.toast.show("iframe is Required",'e');
      return false;
    }
    if(this.match.date==""){
      this.toast.show("Date is Required",'e');
      return false;
    }
    if(this.match.time==""){
      this.toast.show("Time is Required",'e');
      return false;
    }
    if(this.match.description==""){
      this.toast.show("Description is Required",'e');
      return false;
    }
    if(this.match.image==""){
      this.toast.show("Image is Required",'e');
      return false;
    }
    if(this.match.stadium==""){
      this.toast.show("Stadium is Required",'e');
      return false;
    }


    else
    {
      return true;
    }
  }

  SaveMatch(){

   
    this.UploadBanner().then((road:any)=>{
              this.match.createdAt=this.helper.getTodayDate();
              this.match.updatedAt="-";
              this.match.isVisible=true;
      this.match.image=road;
                this.api.saveMatches(this.match).then((value)=>{
                 
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

        this.UpdateMatch();
        
      })
    },
  ]
  })
  alert.present();
  }
}

UpdateMatch(){
  
              this.match.updatedAt=this.helper.getTodayDate();
              this.match.isVisible=true;
                this.api.updateMatch(this.id.toString(),this.match).then((value)=>{
                 
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
