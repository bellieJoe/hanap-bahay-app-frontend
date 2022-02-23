import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-cp',
  templateUrl: './cp.page.html',
  styleUrls: ['./cp.page.scss'],
})
export class CpPage{

  constructor(
    private dbapi : DbapiService,
    private storage : Storage,
    private router : Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  AdminID : number
  isConfirmed : boolean = false
  Password : string
  passwordChecking : boolean = false
  NewPassword : string
  ReNewPassword : string

  async isAuth(){
    await this.storage.get("ad_session").then(res=>{
      if(res){
        this.AdminID = res.uid
      }else{
        this.storage.clear()
        this.router.navigate([''])
      }
    })
  }
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
            this.isConfirmed = true
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
  savePassword(){
    if(this.NewPassword && this.ReNewPassword){
      if(this.NewPassword == this.ReNewPassword){
        this.dbapi.changePasswordAdmin(this.AdminID, this.NewPassword).subscribe(()=>{
          this.presentToast("New Password has been changed")
          this.router.navigate(['/tagapangasiwa/dashboard'])
        },error=>{
          this.presentAlert("Unexpected error occured", "Error")
        })
      }else{
        this.presentAlert("Password Doesn't Match", "Alert")
      }
    }else{
      this.presentAlert("Password cannot be empty", "Alert")
    }
    
  }

  ionViewDidEnter(){
    this.isAuth().then()
  }

  ionViewDidLeave(){
    this.AdminID = null
    this.isConfirmed = false
    this.Password = null
    this.passwordChecking = false
    this.NewPassword = null
    this.ReNewPassword = null
  }

}
