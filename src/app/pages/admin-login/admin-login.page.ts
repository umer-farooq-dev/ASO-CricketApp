import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { HelperService } from 'src/app/services/helper.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
user={
  email:"",
  pass:""
}
  constructor(
    private auth:AuthenticationService,
    private toast:ToastService,
    private helper:HelperService,
    private nav:NavigationService
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.user.email=="" || this.user.pass==""){
       this.toast.show("Please enter email and password",'e');

    }
    else{
   this.auth.SignIn(this.user.email,this.user.pass).then((v:any)=>{
    if(v==false){
       this.toast.show("Invalid email or password",'e');
    }
    else{
      this.toast.show("success",'s');
      this.helper.userData.email=v.email;
      this.helper.userData.uid=v.uid;
      this.nav.goto_adminDash();

    }

   })
  }
}

}
