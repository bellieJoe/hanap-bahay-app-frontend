import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonItemOptions, IonItemSliding, ModalController, Platform, PopoverController, ToastController } from '@ionic/angular';
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
    private call : CallNumber

    ) { }

  BH_Name : string
  rhContacts : ContactDetails[]
  RRP_ID : number
  isInWeb : boolean

  checkPlatform(){
    if(this.platform.is("desktop") || this.platform.is("mobileweb")){
      this.isInWeb = true
    }else{
      this.isInWeb = false
    }
  }

  deleteContact(a:number){
    this.storage.get("RRP_ID").then((id)=>{
      this.dbapi.deleteContact_cid(a , id).subscribe((details : ContactDetails[])=>{
        this.rhContacts = details
        this.presentToast("A contact has been successfully deleted.")
        console.log(details)
      })
    })
  }

  async presentToast(a : string) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
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


  ionViewDidEnter(){
    this.checkPlatform()
    this.storage.get("User_ID").then((val)=>{
      this.storage.get("User_Type").then((val1)=>{
        this.storage.get("RRP_ID").then((id)=>{
          if(val != null && val1 == "property owner" && id != null){
            this.RRP_ID = id
            this.getContacts()
          }else{
            this.router.navigate(['/blank'])
          }
        })
      })
    })



    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })
  }
}
