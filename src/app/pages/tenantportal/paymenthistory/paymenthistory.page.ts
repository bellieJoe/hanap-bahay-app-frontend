import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { TpmenuPage } from '../tpmenu/tpmenu.page';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.page.html',
  styleUrls: ['./paymenthistory.page.scss'],
})
export class PaymenthistoryPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private storage : Storage,
    private userservice : UserserviceService,
    private dbapi : DbapiService,
    private router : Router
  ) { }

  years = []
  currentYear : number
  selectedYear : number
  User_ID : number
  RRP_ID : number
  paymentRecords = []
  totalPayment : number = 0
  BH_Name : string
  

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TpmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit() {
  }

  setYears(){
    let yearRelease = 2017
    this.selectedYear = new Date().getFullYear()
    this.currentYear = new Date().getFullYear()
    console.log(this.currentYear)
    for(yearRelease; yearRelease <= this.currentYear; yearRelease++){
      this.years.push(yearRelease)
    }
  }

  filterYear(){
    console.log(`Selected year is ${this.selectedYear}`)
    let date =  `${this.selectedYear}-%%-%%`
    this.dbapi.getPaymentHistory_uid(this.User_ID,this.RRP_ID,date).subscribe(phcare=>{
      this.paymentRecords = phcare
      console.log(this.paymentRecords)
      this.totalPayment = 0
      this.paymentRecords.map((val, i)=>{
        this.totalPayment += parseFloat(val.Amount_Paid)
      })
    })
  }




  ionViewDidEnter(){
    this.setYears()
    this.storage.get("User_ID").then(uid=>{
      this.userservice.isAuth(uid)
      this.userservice.isBoarded(uid)
      this.dbapi.getTenantDetails(uid).subscribe(tdets=>{
        this.User_ID = uid 
        this.RRP_ID = tdets.RRP_ID
        this.dbapi.getRHDetails_rrpid(this.RRP_ID).subscribe(details=>{
          this.BH_Name = details.RRP_Name
        })
        this.filterYear()
      })
    })
    this.storage.get("User_Type").then(type=>{
      this.userservice.isTenant(type)
    })
    
  }

}
