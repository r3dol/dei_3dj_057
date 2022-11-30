import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import fetch from 'node-fetch';

@Injectable({
  providedIn: 'root'
})
export class PackagingService {

  constructor() { }

  async getPackage() {
    const url = 'http://localhost:3001/api/packaging/all';
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
    const url= 'http://localhost:3001/api/packaging/'
    const data = packageL;
    console.log(data)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
 })
}
}