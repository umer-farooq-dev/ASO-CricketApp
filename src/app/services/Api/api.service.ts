import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { HelperService } from '../helper.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  dbList: AngularFireList<any>;
  dbObject: AngularFireObject<any>;
  bookingListRef: AngularFireList<any>;
  constructor(
    private database: AngularFireDatabase,
    public helper:HelperService  ) {}

  saveMatches(data) {
    return new Promise((resolve) => {
   let u= this.database.list('/matches')
    
    u.push(data).then(()=>{
      return resolve(true)
    }) 
  })
  }

  saveChannel(data) {
    return new Promise((resolve) => {
   let u= this.database.list('/channels')
    
    u.push(data).then(()=>{
      return resolve(true)
    }) 
  })
  }

  saveReport(data) {
    return new Promise((resolve) => {
   let u= this.database.list('/reports')
    
    u.push(data).then(()=>{
      return resolve(true)
    }) 
  })
  }

 


  getMatchByIDs(uid): Promise<any> {
    return new Promise((resolve) => {
      // let uid=firebase.auth().currentUser.uid;
      this.dbObject = this.database.object("/matches/" + uid);
      this.dbObject.valueChanges().subscribe((user) => {
        return resolve(user);
      });
    });
  }



 
 


  // Get List
  getMatchesList() {
    this.dbList = this.database.list("/matches");
    return this.dbList;
  }

    // Get List
    getChannelList() {
      this.dbList = this.database.list("/channels");
      return this.dbList;
    }

    getReportList() {
      this.dbList = this.database.list("/reports");
      return this.dbList;
    }

  // Delete
  deleteMatch(id) {
    this.dbObject = this.database.object("/matches/" + id);
    this.dbObject.remove();
  }

  deleteChannel(id) {
    this.dbObject = this.database.object("/channels/" + id);
    this.dbObject.remove();
  }

  deleteReport(id) {
    this.dbObject = this.database.object("/reports/" + id);
    this.dbObject.remove();
  }

  updateMatch(id: string,obj): Promise<any> {
    return new Promise((resolve) => {
      this.database.list("/matches").update(id, obj).then(()=>{
        return resolve(true);
      });
    });
  }

  updateChannel(id: string,obj): Promise<any> {
    return new Promise((resolve) => {
      this.database.list("/channels").update(id, obj).then(()=>{
        return resolve(true);
      });
    });
  }




  getMatchByID(id:any) {
    let product = this.database.object("/matches/" + id);
    return product;
  }

  getChannelByID(id:any) {
    let product = this.database.object("/channels/" + id);
    return product;
  }
}
