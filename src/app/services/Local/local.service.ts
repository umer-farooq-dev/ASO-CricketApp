import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() {
    console.log('Hello SessionHelperProvider Provider');
  }

  GetSessionValue(Key) {

    let Value = localStorage.getItem(Key);
    if (Value != "null" && Value != null) {
      if (Value.includes("{"))
        return JSON.parse(Value);
      else
        return Value;
    }
    else
      return "ND";//No Data
  }

  SetSessionValue(Key,Value): Promise<Boolean> {

    return new Promise((resolve, error) => {
      localStorage.setItem(Key,JSON.stringify(Value));
      return resolve(true);
    })

  }

  ClearSession(Key): Promise<Boolean> {
    return new Promise((resolve, error) => {
      localStorage.setItem(Key, null);
      return resolve(true);
    }
    )
  }
 

  Clear(): Promise<Boolean> {
    return new Promise((resolve, error) => {
      localStorage.clear();
      return resolve(true);
    }
    )
  }

  get(key):Promise<any>{
    return new Promise((res,err)=>{
    let Value = localStorage.getItem(key);
    if (Value != "null" && Value != null) {
        return res(JSON.parse(Value));
    }
    else
    {
      return res(null)
    }
    })
  }


}
