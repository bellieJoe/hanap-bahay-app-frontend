import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-add-a',
  templateUrl: './add-a.page.html',
  styleUrls: ['./add-a.page.scss'],
})
export class AddAPage{

  constructor(
    private storage : Storage,
    private router : Router,
    private alertController: AlertController,
    private dbapi : DbapiService,
    private tcase : TitleCasePipe,
    private toastController: ToastController
  ) { }

  adminParam = {
    firstname:null,
    middlename:null,
    lastname:null,
    username:null,
    password:null,
    reenter:null
  }

  async presentAlert(con: string, head : string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentToast( con :string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  addAdmin(){
    let a = this.adminParam
    let t = this.tcase
    if(a.firstname && a.firstname.trim() != ""
    && a.middlename && a.middlename.trim() !=  ""
    && a.lastname && a.lastname.trim() !=  ""
    && a.password && a.reenter){
      if(a.password == a.reenter){
        this.dbapi.addAdmin(t.transform(a.firstname.trim()) ,a.password, t.transform(a.middlename.trim()), t.transform(a.lastname.trim()), a.username.trim()).subscribe(()=>{
          this.presentToast("New Admin successfully registered")
          this.router.navigate(['tagapangasiwa/dashboard'])
        },()=>{this.presentAlert("Unexpected Error Occured", "Error")})
      }else{
        this.presentAlert("Password doesnt match", "Alert")
      }
    }else{
      this.presentAlert("Please complete the form", "Alert")
    }
  }

  isAuth(){
    this.storage.get("ad_session").then(res=>{
      if(res.role == "master admin"){
        
      }else{
        this.router.navigate([''])
      }
    })
  }

  ionViewDidEnter(){
    this.isAuth()
  }

  ionViewDidLeave(){
    this.adminParam = null
  }



}
