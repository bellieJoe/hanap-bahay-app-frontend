import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { parse } from 'path';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { GetTenantList, PaymentDetails } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { AddpaymentPage } from './addpayment/addpayment.page';
import { UpdatePage } from './update/update.page';

@Component({
  selector: 'app-paymentrecords',
  templateUrl: './paymentrecords.page.html',
  styleUrls: ['./paymentrecords.page.scss'],
})
export class PaymentrecordsPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private storage : Storage,
    private dbapi : DbapiService,
    private userservice : UserserviceService,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  epal : any
  BH_Name : string
  memberListComplete = []
  memberList : GetTenantList[]
  today = new Date()
  yearLoop = []
  total: number 
  yearDeployed  = 2019
  filterInput = {
    month: this.today.getMonth()+1,
    year : this.today.getFullYear()
  }

  filter(){
    this.storage.get("RRP_ID").then((val)=>{
      // console.log("ins :", val, this.filterInput.month ,  this.filterInput.year)
      this.dbapi.getPayments(parseInt(val), this.filterInput.month , this.filterInput.year).subscribe((result :PaymentDetails[])=>{
        this.updatedPayments = result
        this.computeTotal()
        // console.log("results: ",this.updatedPayments)
      })
    })
   
  }

  updatedPayments : PaymentDetails[]
  paymentDetails = {
    Payment_ID : null,
    RRP_ID : null,
    Tenant_ID : null,
    Tenant_Name : null,
    Date_Paid : null,
    Status : null,
    Amount_Paid  : null
  }

  clearInputs(){
    this.paymentDetails.Amount_Paid = null
      this.paymentDetails.Date_Paid = null
      this.paymentDetails.Payment_ID = null
      this.paymentDetails.RRP_ID = null
      this.paymentDetails.Status = null
      this.paymentDetails.Tenant_ID = null
      this.paymentDetails.Tenant_Name = null
  }

  async addPayment() {
    const modal = await this.modalController.create({
    component: AddpaymentPage,
    });
  
    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.added){
        this.filter()
      }
    })
  
  }

  computeTotal(){
    this.total = 0
    this.updatedPayments.map((val,i)=>{
      this.total += parseFloat(val.Amount_Paid.toString())
    })
  }

  async deletePayment(id:number) {
    const alert = await this.alertController.create({
      header: 'Warnong',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: "Yes",
          handler: ()=>{
            this.dbapi.deletePayment_pid(id).subscribe(()=>{
              this.presentToast("A payment record was deleted")
              this.filter()
            })
          }
        },
        {
          text: "Cancel"
        }
      ]
    });
  
    await alert.present();
  }

  isInputValid(){
    if(this.paymentDetails.Date_Paid 
      && this.paymentDetails.Amount_Paid
       && this.paymentDetails.Tenant_ID 
       && this.paymentDetails.Status){
        return true
       }
       else{
         return false
       }
  }



  async presentModal(id:number) {
    const modal = await this.modalController.create({
    component: UpdatePage,
    componentProps: { pid: id }
    });
  
    await modal.present();
    await modal.onDidDismiss()
    this.filter()
  
  }

  async presentAlert(head: string, con:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async presentToast(a:string) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BhmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // for getting the full list of tenants
    this.memberListComplete = []
    this.userservice.getUserInfo("RRP_ID").then((val)=>{
      this.paymentDetails.RRP_ID = val
      this.dbapi.getTenantList_rrpid(parseInt(val)).subscribe((list : GetTenantList[])=>{
        this.memberList = list
        for(let i of this.memberList){
          this.dbapi.getTenantListInfo_uid(i.User_ID).subscribe((info : GetTenantList[])=>{
            if(i.User_ID == info[0].User_ID){
              let newList = {
                User_ID: i.User_ID,
                Firstname : info[0].Firstname,
                Middlename : info[0].Middlename,
                Lastname : info[0].Lastname,
                Date_Added: i.Date_Added,
                Payment_Day : i.Payment_Day,
                Room_Name : i.Room_Name
              }
              this.memberListComplete.push(newList)
            }
          })
        }
        // console.log("The members are: ", this.memberList)// to delete
      })
      this.dbapi.getPayments(parseInt(val), this.today.getMonth()+1 , this.today.getFullYear()).subscribe((result :PaymentDetails[])=>{
        this.updatedPayments = result
        this.computeTotal()
        // console.log("results: ",this.updatedPayments)
      })
    })
    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })

    for(let i = this.yearDeployed; i <= this.today.getFullYear(); i++){
      this.yearLoop.push(i)
    }

  }

}
