import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonItemOptions, IonItemSliding, LoadingController, ModalController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { ContactDetails } from 'src/app/providers/policy';
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { AddcontactPage } from './addcontact/addcontact.page';
import { ViewcontactPage } from './viewcontact/viewcontact.page';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage {

  constructor(
    private popoverController: PopoverController,
    private storage : Storage,
    private modalController: ModalController,
    private router : Router,
    private dbapi : DbapiService,
    private toastController: ToastController,
    private platform : Platform,
    private call : CallNumber,
    private loader: LoadingController

    ) { }

  BH_Name : string
  rhContacts : ContactDetails[]
  RRP_ID : number
  isInWeb : boolean
  loading : boolean = false

  checkPlatform(){
    if(this.platform.is("desktop") || this.platform.is("mobileweb")){
      this.isInWeb = true
    }else{
      this.isInWeb = false
    }
  }

  async deleteContact(a:number){
    const loader = await this.loader.create({
      spinner: "lines",
      message: "Deleting Contact",
      mode: "ios"
    })
    try{
      await loader.present()

      const RRP_ID = await this.storage.get("RRP_ID")

      const details : ContactDetails[] = await new Promise(
        (resolve, reject) => {
          this.dbapi.deleteContact_cid(a , RRP_ID).subscribe((details : ContactDetails[])=>{
            console.log("dedleted")
            resolve(details)
          })
        }
      )

      this.rhContacts = details
      this.presentToast("A contact has been successfully deleted.")
      await loader.dismiss()
    } 
    catch(error) {
    
      await loader.dismiss()
    }
    
  }

  async presentToast(a : string) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    
    await toast.present();
  }

  async edit(a:number) {
    const modal = await this.modalController.create({
    component: ViewcontactPage,
    componentProps: { contact_id : a }
    });

    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.updated){
        this.getContacts()
      }
    })

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

  getContacts(){
    this.dbapi.getContacts_rrpid(this.RRP_ID).subscribe((contacts : ContactDetails[])=>{
      this.rhContacts = contacts
    })
  }

  callNumber(a:number){
    this.call.callNumber(`+63${a}`, false)
  }

  async presentModalContact() {
    const modal = await this.modalController.create({
    component: AddcontactPage,
    });
  
    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.added){
        this.getContacts()
      }
    })
  
  }

  async ionViewDidEnter(){
    try {
      this.loading = true
      this.checkPlatform()
      const User_ID = await this.storage.get("User_ID")

      const User_Type = await this.storage.get("User_Type")

      const RRP_ID  = await this.storage.get("RRP_ID")
      
      if(User_ID != null && User_Type == "property owner" && RRP_ID != null){
        this.RRP_ID = RRP_ID
        this.getContacts()
      }else{
        this.router.navigate(['/blank'])
      }

      const RRP_Name = await this.storage.get("RRP_Name")
      this.BH_Name = RRP_Name

      this.loading = false
    } catch (error) {
      this.loading = false
    }
    
  }
}
