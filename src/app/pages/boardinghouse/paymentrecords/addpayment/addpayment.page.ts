import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { PaymentDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.page.html',
  styleUrls: ['./addpayment.page.scss'],
})
export class AddpaymentPage{

  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private storage : Storage,
    private titleCase : TitleCasePipe,
    private alertController: AlertController,
    private datePipe : DatePipe

  ) { }

  paymentInputs : PaymentDetails = {
    Payment_ID : null,
    RRP_ID : null,
    Tenant_ID : null,
    Tenant_Name : null,
    Date_Paid : null,
    Status : null,
    Amount_Paid : null,
  }

  tenantList : any = []
  RRP_Name : string
  Landlord_Name : string


  dismiss(){
    this.modalController.dismiss({
      added : false
    })
  }

  async presentAlert(con: string, head : string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  isInputValid(){
    if(
      this.paymentInputs.Status &&
      this.paymentInputs.Amount_Paid &&
      this.paymentInputs.Tenant_ID &&
      this.paymentInputs.Date_Paid
    ){
      return true
    }else{
      return false
    }
  }

  getSeletedName(){
    return new Promise<any>(resolve=>{
      this.tenantList.map((val,i)=>{
        if(val.User_ID == this.paymentInputs.Tenant_ID){
          resolve(val.Name)
        }
      })
    })
    
  }


  addPayment(){
    let message = `The Rental House Owner ${this.Landlord_Name} updated your Rental house bill payments`
    if(this.isInputValid()){
      this.getSeletedName().then(name =>{
        this.paymentInputs.Tenant_Name = name
        console.log(this.paymentInputs)
        this.dbapi.addPayment(this.paymentInputs).subscribe(()=>{
          this.dbapi.addNotification(this.paymentInputs.Tenant_ID, this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss"), "Rental House Payment", message, "/paymenthistory", null ).subscribe()
          this.modalController.dismiss({
            added : true
          })
        })

      })

    }else{  
      this.presentAlert("Please Complete the form inputs", "Alert")
    }
  }

  getTenants(){
    this.dbapi.getTenantList_rrpid(this.paymentInputs.RRP_ID).subscribe(tlist=>{
      this.tenantList = tlist
      this.tenantList.map((val,i)=>{
        this.dbapi.getUserDetails_id(this.tenantList[i].User_ID).subscribe(udets=>{
          this.tenantList[i].Name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
        })
      })
    })
  }

  ionViewDidEnter(){
    this.storage.get("RRP_ID").then(rrpid=>{
      this.paymentInputs.RRP_ID = rrpid
      this.getTenants()
      this.dbapi.getRHDetails_rrpid(rrpid).subscribe(rdets=>{
        this.RRP_Name = rdets.RRP_Name
        this.dbapi.getUserDetails_id(rdets.Owner_ID).subscribe(udets=>{
          this.Landlord_Name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Lastname)}`
        })
      })
    })
  }

}
