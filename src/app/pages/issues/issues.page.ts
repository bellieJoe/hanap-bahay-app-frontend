import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.page.html',
  styleUrls: ['./issues.page.scss'],
})
export class IssuesPage{

  constructor(
    private alertController: AlertController,
    private storage : Storage,
    private dbapi : DbapiService,
    private router : Router,
    private userservice : UserserviceService,
    private datePipe : DatePipe,
    private toastController: ToastController
  ) { }

  errorInput : string
  User_ID : number

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please provide an input',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your report has been successfully submitted',
      duration: 2000
    });
    toast.present();
  }

  submit(){
    if(this.errorInput && this.errorInput.trim() != ""){
      this.dbapi.sendBugs(this.User_ID, this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss"), this.errorInput).subscribe(()=>{
        this.presentToast()
        this.errorInput = ""
      })
    }else{
      this.presentAlert()
    }
  }

  ionViewDidLeave(){
    this.User_ID = null
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      this.userservice.isAuth(uid)
      this.User_ID = uid
      
    })
  }

}
