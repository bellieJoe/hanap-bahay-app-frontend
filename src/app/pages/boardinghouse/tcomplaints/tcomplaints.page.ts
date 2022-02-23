import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { ComplaintsDetails } from 'src/app/providers/policy';
import { BhmenuPage } from '../bhmenu/bhmenu.page';

@Component({
  selector: 'app-tcomplaints',
  templateUrl: './tcomplaints.page.html',
  styleUrls: ['./tcomplaints.page.scss'],
})
export class TcomplaintsPage {

  BH_Name : string
  Complaints_Dets : any = []

  delete(comid : number){
    this.storage.get("RRP_ID").then((rrpid)=>{
      this.dbapi.deleteComplaint_comid(comid,rrpid).subscribe((complaints)=>{
        this.Complaints_Dets = complaints                      
        for(let a = this.Complaints_Dets.length-1; a>=0; a--){
          this.dbapi.getName_uid(this.Complaints_Dets[a].User_ID).subscribe((name)=>{
            this.Complaints_Dets[a].Fullname = name 
          })
        }     
      })
    })
    
  }
  

  constructor(
    private popoverController : PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService
  ) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BhmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ionViewDidLeave(){
    this.Complaints_Dets.map((val,i)=>{
      if(this.Complaints_Dets[i].Is_New == 1){
       this.dbapi.setComplainOld(val.Complaint_ID).subscribe()
      }
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then((uid)=>{
      if(uid){
        this.storage.get("RRP_ID").then((rrpid)=>{
          if(rrpid){
            this.dbapi.getComplaints_rrpid(rrpid).subscribe((complaints)=>{
              console.log(complaints.length)
              if(complaints.length > 0){
                this.Complaints_Dets = complaints   
                // console.log(this.Complaints_Dets) 
                for(let a = this.Complaints_Dets.length-1; a>=0; a--){
                  this.dbapi.getName_uid(this.Complaints_Dets[a].User_ID).subscribe((name)=>{
                    this.Complaints_Dets[a].Fullname = name 
                  })
                }
              }else{
                this.Complaints_Dets = null
              }      
              
              // console.log(this.Complaints_Dets)
            })
          }else{
            this.router.navigate([''])
          }
        })
      }else{
        this.router.navigate([''])
      }
    })

    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })
  }



}
