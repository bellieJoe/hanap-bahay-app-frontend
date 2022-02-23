import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RentalHouseDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-editdets',
  templateUrl: './editdets.page.html',
  styleUrls: ['./editdets.page.scss'],
})
export class EditdetsPage {

  RH_Details : RentalHouseDetails = {
    RRP_ID : null,
    RRP_Name : null,
    RRP_Description : null,
    RRP_Capacity : null,
    RRP_Type : null,
    RRP_Address : null,
    RRP_Rent_Rate : null,
    RRP_X_Coordinates : null,
    RRP_Y_Coordinates : null,
    Owner_ID : null,
    Contact_Number : null,
    RRP_Settings: null,
    Photo_Documents:null
  }

  constructor(
    private modalController : ModalController,
    private storage : Storage,
    private dbapi : DbapiService,
    private toastController : ToastController
  ) { }

  async presentToast(con : string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  update(){
    this.dbapi.updateRH(this.RH_Details).subscribe(()=>{
      this.dismiss()
      this.presentToast("Rental House Successfullly updated")
    })
  }

  ionViewDidEnter(){
    this.storage.get("RRP_ID").then((rrpid)=>{
      this.dbapi.getRHDetails_rrpid(rrpid).subscribe((details)=>{
        this.RH_Details  = details
      })
    })
  }

}
