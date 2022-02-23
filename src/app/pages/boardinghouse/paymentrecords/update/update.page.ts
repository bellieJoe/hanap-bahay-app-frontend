import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { PaymentDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  @Input() pid : number

  paymentDetail = {
    Payment_ID : null,
    RRP_ID : null,
    Tenant_ID : null,
    Tenant_Name : null,
    Date_Paid : null,
    Status : null,
    Amount_Paid : null,
  }

  isInputvalid(){
    if(this.paymentDetail.Date_Paid
    && this.paymentDetail.Status
    && this.paymentDetail.Amount_Paid){
      return true
    }else{
      return false
    }
  }

  update(){
    if(this.isInputvalid()){
      this.dbapi.updatePayment(this.paymentDetail).subscribe(()=>{
        this.dismiss()
        this.presentToast("Your List has been updated")
      })
    }else{
      this.presentAlert("Alert", "Please complete the form")
    }
  }


  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async presentToast(id : string) {
    const toast = await this.toastController.create({
      message: id,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(head:string,con:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss()
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log(this.pid)
    if(this.pid){
      this.dbapi.getPayment_pid(this.pid).subscribe((result:PaymentDetails)=>{
        this.paymentDetail = result
      })
    }else{
      this.presentAlert("Error", "An Error has occured")
    }
    
  }

}
