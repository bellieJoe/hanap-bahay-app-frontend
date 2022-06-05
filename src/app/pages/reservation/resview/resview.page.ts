import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-resview',
  templateUrl: './resview.page.html',
  styleUrls: ['./resview.page.scss'],
})
export class ResviewPage {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private route : ActivatedRoute,
    private callNumber : CallNumber,
    private platform : Platform
  ) { }

  updates : any
  RH_Name : string
  Contact_Number : string
  callFunc : boolean  = false
  Reservation_det : any = []

  call(a: string){
    this.callNumber.callNumber(a,true)
  }

  ionViewWillEnter(){
    if(this.platform.is("pwa")){
      this.callFunc = false
    }else{
      // true
    }
    this.storage.get("User_ID").then(uid =>{
      this.storage.get("User_Type").then(utype =>{
        if(uid && utype == "tenant"){
          this.route.queryParams.subscribe((data)=>{
            
            this.dbapi.getReservationDetails_reid(data.reid).subscribe(redets=>{
              console.log(redets)

              if(uid == redets.User_ID){
                if(redets.Confirmation_Note == "undefined"){
                  redets.Confirmation_Note = ""
                }else{
                  redets.Confirmation_Note = redets.Confirmation_Note ? redets.Confirmation_Note.trim() : null
                }
                this.Reservation_det = redets
                this.dbapi.getRHDetails_rrpid(redets.RRP_ID).subscribe((res)=>{
                  this.RH_Name = res.RRP_Name
                  this.Contact_Number = res.Contact_Number
                })
                this.dbapi.getReseveUpdates_reid(data.reid).subscribe((res)=>{
                  if(res.length == 0){
                    this.updates = null
                  }else{
                    
                    this.updates = res
                  }
                  // console.log(this.updates)
                })
              }else{
                console.log("sda")
                // this.router.navigate([''])
              }
            })
            
          })
        }else{
          // this.router.navigate([''])
        }
      })
     
    })
   
  }

}
