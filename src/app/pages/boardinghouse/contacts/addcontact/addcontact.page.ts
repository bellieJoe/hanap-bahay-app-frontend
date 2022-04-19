import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { ContactDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.page.html',
  styleUrls: ['./addcontact.page.scss'],
})
export class AddcontactPage{

  contactInput : ContactDetails = {
    Contact_ID : null,
    Contact_Number :  null,
    Contact_Name : null,
    Contact_Type : null,
    RRP_ID : null,
  }
  RRP_Name : string
  Landlord_Name : string

  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private storage : Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private datePipe : DatePipe,
    private titleCase : TitleCasePipe,
    private loader: LoadingController
  ) { }

  async presentAlert(a:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: a,
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

  dismiss() {
    this.modalController.dismiss({
      added : false
    });
  }

  isValid(){
    if(this.contactInput.Contact_Name && this.contactInput.Contact_Number){
      return true
    }else{
      return false
    }
  }

  sendNotification(){
    let message = `The property owner ${this.Landlord_Name} added a new contact to ${this.RRP_Name}`
    this.dbapi.getTenantList_rrpid(this.contactInput.RRP_ID).subscribe(results=>{
      results.map((val,i)=>{
        this.dbapi.addNotification(val.User_ID, this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss"), "Rental House Contacts", message, "/rhcontacts", null).subscribe()
      })
    })
  }

  async addContact(){
    const loader = await this.loader.create({
      spinner: "lines",
      message: "Adding Contact",
      mode: "ios"
    })
    
    if(this.isValid()){
      try {
        await loader.present()
  
        const RRP_ID = await this.storage.get("RRP_ID")
        this.contactInput.RRP_ID = RRP_ID
  
        await new Promise(
          (resolve, reject) => {
            this.dbapi.addContact(this.contactInput).subscribe(
              () => {
                resolve(null)
              }
            )
          }
        )
  
        await this.presentToast("A new contact has been added to your contact list.")
  
        this.sendNotification()
  
        await this.modalController.dismiss({
          added : true
        })
  
        loader.dismiss()
  
      } catch (error) {
        loader.dismiss()
      }
    }
    else{
      this.presentAlert("The inputs are empty", "Alert")
    }
  }

  ionViewDidEnter(){
    this.storage.get("RRP_ID").then(rrpid=>{
      this.contactInput.RRP_ID = rrpid
      this.dbapi.getRHDetails_rrpid(this.contactInput.RRP_ID).subscribe(rdets=>{
        this.RRP_Name = rdets.RRP_Name
        this.dbapi.getUserDetails_id(rdets.Owner_ID).subscribe(udets=>{
          this.Landlord_Name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Lastname)}`
        })
      })
    })
    
  }

}
