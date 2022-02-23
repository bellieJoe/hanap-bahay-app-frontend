import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { __values } from 'tslib';
import { DbapiService } from './dbapi.service';



@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(
    private storage: Storage,
    private router: Router,
    private dbapi : DbapiService
  ) { }

  User_Type : string
  menulink : any

  addUserInfo(key: string, value: any){
    if(value == 'tenant'){
      // this.menulink = this.TenantMenuLinks
      // console.log("Tenants Link assigned: " , this.menulink)
      this.User_Type = 'tenant'
      return this.storage.set(key , value)
    }
    else if(value == 'property owner'){
      // this.menulink = this.OwnerMenuLinks
      // console.log("Property Owners Link assigned: ", this.menulink)
      this.User_Type = 'property owner'
      return this.storage.set(key , value)
    }
    else if(value == 'admin'){
      // this.menulink = this.AdminMenuLinks
      // console.log("Admins Link assigned")
      this.User_Type = 'admin'
      return this.storage.set(key , value)
    }else{
      return this.storage.set(key , value)
    }
  }

  getUserInfo(key: string): Promise<string>{
    return this.storage.get(key)
  }

  isAuth(uid:number){
    if(!uid){
      this.router.navigate([''])
    }
  }
  isTenant(type:string){
    if(type != "tenant"){
      this.router.navigate([''])
    }
  }
  isOwner(type:string){
    if(type != "property owner"){
      this.router.navigate([''])
    }
  }
  isAdmin(type : string){
    if(type != "admin"){
      this.router.navigate([''])
    }
  }
  isBoarded(uid:number){
    this.dbapi.getUserDetails_id(uid).subscribe(dets=>{
      if(dets[0].Is_Boarded == 0){
        this.router.navigate([''])
      }
    })
  }

  enc(inn:string){
    return inn;
  }

}
