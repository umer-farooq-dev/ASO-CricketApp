import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/Api/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.page.html',
  styleUrls: ['./report-modal.page.scss'],
})
export class ReportModalPage implements OnInit {
report={
  too_many_ads:false,
  slow_streaming:false,
  streaming_not_working:false,
  description:"",
  streaming_id:"",
  match:"",
  createdAt:"",
  image:""
}
id=""
  constructor(
    public modal:ModalController,
    private toast:ToastService,
    private alert:AlertController,
    private api:ApiService,
    private navParams:NavParams,
    private helper:HelperService
  ) {

   }

  ngOnInit() {

    let id=this.navParams.get('id');
    let name=this.navParams.get('name');
    let image=this.navParams.get('image');
    if(id==undefined || id==""){
      this.id="0";
    }
    else
    {
      this.report.streaming_id=id
      this.report.match=name
      this.report.image=image
    }
  }

  async  ConfirmSave(){
    if(this.Validation()==true){
    let alert=await this.alert.create({
      header:"Save",
      message:"Do You Want to Report?",
      buttons:[{
        role:"cancel",
        text:"Cancel",
        cssClass:"text-danger",
        handler:(()=>{

        })
      },
      {
        text:"Report",
        cssClass:"text-primary",

        handler:(()=>{

          this.SaveReport();
          
        })
      },
    ]
    })
    alert.present();
    }
  }


  Validation(){
    if(this.report.description=="" && this.report.slow_streaming==false && this.report.streaming_not_working==false && this.report.too_many_ads==false){
      this.toast.show("Please Choose any reason or describe your report with current streaming",'e');
    //  alert(this.report.slow_streaming)
    //  alert(this.report.streaming_id)
    //  alert(this.report.streaming_not_working)
    //  alert(this.report.too_many_ads)
      return false;
    }



    else
    {
      return true;
    }
  }

  SaveReport(){
    this.report.createdAt=this.helper.getTodayDate();
                this.api.saveReport(this.report).then((value)=>{
                 
                    this.toast.show("Reported","e");
                    
                    this.modal.dismiss();
                 
                })
            

  
}

change(e,type){
  let c=e.checked;
  if(c && type=="a"){
    this.report.too_many_ads=true
  }
  if(c && type=="ss"){
    this.report.slow_streaming=true
    
  }
  if(c && type=="nw"){
    this.report.streaming_not_working=true
    
  }
}

}
