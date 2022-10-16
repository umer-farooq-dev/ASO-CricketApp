import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
public iframe="";
  userData = {
    uid: '',
    email: '',
    name: '',
    profile: '',
    isverified: false,
    CreatedOn: '',
    isactive: false,

  };

  constructor(public menu: MenuController) {}




  getTodayDate() {
    var d = moment().format('DD-MM-YYYY hh:mm:ss A').toString();
    return d;
  }

  GetPrimarykey() {
    // return new Date().getTime();
    return Number(
      new Date()
        .getTime()
        .toString()
        .substring(7, new Date().getTime().toString().length)
    );
  }






  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  ShowMenu() {
    this.menu.toggle();
  }
}
