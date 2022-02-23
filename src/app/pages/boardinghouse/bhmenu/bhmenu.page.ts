import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-bhmenu',
  templateUrl: './bhmenu.page.html',
  styleUrls: ['./bhmenu.page.scss'],
})
export class BhmenuPage{

  constructor(
    private popover : PopoverController,
    private storage : Storage,
    private dbapi : DbapiService
  ) { }

  RRP_ID : number
  ReservationCount : number
  HasNewMessage : boolean
  ComplaintNumber : number

  async dismiss(ev: any) {
     await this.popover.dismiss()
  }

  setReservationCount(){
    this.dbapi.countNewReservation(this.RRP_ID).subscribe(count=>{
      this.ReservationCount = count
    })
  }

  setMessageCount(){
    this.dbapi.checkNewMesagges_rrpid(this.RRP_ID).subscribe(status=>{
      this.HasNewMessage = status
    })
  }

  countComplaints(){
    this.dbapi.countComplaints(this.RRP_ID).subscribe(count=>{
      this.ComplaintNumber = count
    })
  }
  
  ionViewDidEnter(){
    this.storage.get("RRP_ID").then(rrpid=>{
      this.RRP_ID = rrpid
      this.setReservationCount()
      this.setMessageCount()
      this.countComplaints()
    })
  }
  

}
