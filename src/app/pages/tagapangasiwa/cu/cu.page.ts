import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-cu',
  templateUrl: './cu.page.html',
  styleUrls: ['./cu.page.scss'],
})
export class CuPage{

  constructor(
    private dbapi : DbapiService,
    private storage : Storage,
    private router : Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  confirmed : boolean = false
  passwordChecking :boolean = false
  AdminID: number
  Username : string
  Password : string

  async presentAlert(con:string, Head: string) {
    const alert = await this.alertController.create({
      header: Head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  confirmPassword(){
    if(this.Password != "" && this.Password){
      this.passwordChecking = true
      this.dbapi.checkPassword(this.AdminID, this.Password).subscribe(res=>{
        if(res == "OK"){
          setTimeout(()=>{
            this.passwordChecking = false
            this.confirmed = true
          },500)
        }else{
          setTimeout(()=>{
            this.passwordChecking = false
            this.presentAlert("Incorrect Password", "Alert")

          },500)
        }
      })
    }
  }

  isAuth(){
    this.storage.get("ad_session").then(res=>{
      if(res){
        this.AdminID = res.uid
      }else{
        this.storage.clear()
        this.router.navigate([''])
      }
    })
  }

  changeUsername(){
    if(this.Username && this.Username.trim() != ""){
      this.dbapi.changeUsername(this.AdminID, this.Username).subscribe(()=>{
        this.presentToast("Username successfully Changed")
        this.router.navigate(['tagapangasiwa/dashboard'])
      },error=>{
        console.log(error)
        this.presentAlert("Unexpected Error Occured", "Error")
      })
    }else{
      this.presentAlert("Please Provide Input", "Alert")

    }
    
  }

  ionViewDidLeave(){
    this.confirmed = false
    this.Password = null
    this.passwordChecking  = false
    this.AdminID = null
    this.Username = null
  }

  ionViewDidEnter(){
    this.isAuth()
  }



}
