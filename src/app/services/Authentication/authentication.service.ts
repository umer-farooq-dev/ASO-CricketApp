import { Injectable, NgZone } from '@angular/core';
// import  firebase  from 'firebase/app';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import { userData } from "../../modules/userData";
import "firebase/auth";
import { NavigationService } from '../navigation.service';
import { ToastService } from '../Toast/toast.service';
import { ApiService } from '../Api/api.service';
import { NavController } from '@ionic/angular';
import { HelperService } from '../helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  auth:any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone ,
    public nav:NavigationService,
    public toast:ToastService,
    public api:ApiService,
    public navCtrl:NavController,
    public helper:HelperService
  ) 
  {
    
 
   }

   
  // Login in with email/password
  SignIn(email, password) {
    return new Promise((resolve,reject)=>{
      this.ngFireAuth.signInWithEmailAndPassword(email, password).then((data)=>{
        return resolve(data.user)
      }).catch((error)=>{
        this.AuthenticationError(error.code);
        return resolve(false);
      })
    })

  }





  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userData');

      this.navCtrl.navigateRoot("login",{animationDirection:"back"}).then(()=>{
        this.toast.show("Logout successfully",'s');
      })

    })
  }
  AuthenticationError(code){
    if(code=="auth/invalid-email"){
      return this.toast.show("Invalid email.",'e');
    }
    if(code=="auth/user-disabled"){
      return this.toast.show("Your account has been blocked.",'e');
    }
    if(code=="auth/user-not-found"){
      return this.toast.show("User not registered on this email.",'e');
    }
    if(code=="auth/wrong-password"){
      return this.toast.show("Invalid password.",'e');
    }
    if(code=="auth/email-already-in-use"){
      return this.toast.show("Email already registered.",'e');

    }
    if(code=="auth/network-request-failed"){
      return this.toast.show("Internet disconnected",'e');
    }
   
    
  }


}
