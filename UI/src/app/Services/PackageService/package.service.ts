import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import fetch from 'node-fetch';

@Injectable({
  providedIn: 'root'
})
export class PackagingService {

  constructor() { }
  public urlOrigin = window.location.origin.split(":")[0] + ":" + window.location.origin.split(":")[1] + ":3001/";
  
  async getPackage() {
    let url = this.urlOrigin+'api/packaging/all';
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/packaging/all';
    }
    const response = await fetch(url, {
      method: 'GET',
      headers:{
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    return data
  }

  async createPackage(packageL:any){
    let url= this.urlOrigin+'api/packaging/'
    if(this.urlOrigin.includes("azure")){
      url = 'https://auth57.azurewebsites.net/api/packaging/';
    }
    const data = packageL;
    console.log(data);
    console.log(JSON.stringify(data));
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
 })

 return response;
}
}