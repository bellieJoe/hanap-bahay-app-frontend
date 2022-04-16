import { DatePipe, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { rejects } from 'assert';
import axios, { AxiosError } from 'axios';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { SearchTenantList } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';


@Component({
  selector: 'app-addtenant',
  templateUrl: './addtenant.page.html',
  styleUrls: ['./addtenant.page.scss'],
})
export class AddtenantPage {

  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private userservice : UserserviceService,
    private toast : ToastController,
    private datePipe : DatePipe,
    private router : Router,
    private storage : Storage,
    private alert : AlertController,
    private loader : LoadingController
    ) { }


  dateToday : string
  time : string
  searchResults = []
  url_image = `${this.dbapi.SERVER}/images/profile/`
  RRP_Types : any = []

  Add_Tenant_Form : any = {
    loader: this.loader,
    dbapi: this.dbapi,
    alert: this.alert,
    dateToday: this.datePipe.transform(new Date(), "yyyy/MM/dd"),
    time: null,
    datePipe: this.datePipe,
    modalController: this.modalController,
    data: {
      RRP_ID : null,
      RRP_Type_ID: null,
      Email: null,
      User_ID: null,
      RRP_Name: null
    },
    async submit(){
      this.time = this.datePipe.transform(new Date(), "hh:mm:ss")

      const alert = await this.alert.create({
        message: `We detected that ${this.data.Email} is unregistered. We will send an email to this email address to resume his/her registration.`,
        mode: "md",
        header: "Notice",
        buttons: ["Ok"]
      })

      const User = await new Promise((resolve, reject) => {
        this.dbapi.checkIfRegistered_email(this.data.Email).subscribe(User => {
          resolve(User[0])
        })
      })

      const loader = await this.loader.create({
        spinner: "lines",
        mode: "ios",
        message: "Adding Tenant"
      })

      if(!User){
        await alert.present()

        await alert.onDidDismiss()
      }
      
      await loader.present()
      
      await new Promise((resolve, reject) => {
        this.dbapi.addTenant_rrpid(this.data.Email, this.data.RRP_ID, this.dateToday, this.time, this.data.RRP_Type_ID).subscribe(() => {
          resolve(null)
        })
      })

      await loader.dismiss()

      this.modalController.dismiss({
        'dismissed': true
      });
    }
  }

  async testing() {
    const alert = await this.alert.create({
      message: "We detected that this email is inregistered. We will send an email to this email address to resume his/her registration.",
      mode: "md",
      header: "Notice",
      buttons: ["Ok"]
    })
    await alert.present()

    const loader = await this.loader.create({
      spinner: "lines",
      mode: "ios",
      message: "Adding Tenant"
    })

    await loader.present()



    

  }

  closeAddTenant(){
    this.dismiss();
  }


  async presentToast(cont : string) {
    const toast = await this.toast.create({
      message: cont,
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  register(){
    this.router.navigate(['/boardinghouse/members/regtenant'])
    this.modalController.dismiss()
  }



  async ionViewDidEnter(){
    const RRP_ID = await this.storage.get("RRP_ID")

    this.Add_Tenant_Form.data.RRP_ID = RRP_ID

    await new Promise((resolve, reject) => {
      this.dbapi.getRRPTypesByRRP_ID(RRP_ID).subscribe(RRP_Types => {
        this.RRP_Types = RRP_Types
        console.log(this.RRP_Types)
        resolve(null)
      })
    })

    await new Promise((resolve, reject) => {
      this.userservice.getUserInfo("User_ID").then(User_ID => {
        this.Add_Tenant_Form.data.User_ID = User_ID
        resolve(null)
      })
    })

    this.userservice.getUserInfo("RRP_Name").then(RRP_Name => {
      this.Add_Tenant_Form.data.RRP_Name = RRP_Name
    })

    

    if(location.pathname != "/boardinghouse/members"){
      this.router.navigate([''])
    }


  }

}
