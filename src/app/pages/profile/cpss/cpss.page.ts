import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';

@Component({
  selector: 'app-cpss',
  templateUrl: './cpss.page.html',
  styleUrls: ['./cpss.page.scss'],
})
export class CpssPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private storage : Storage,
    private userservice : UserserviceService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  @ViewChild('slider') slider : IonSlides

  eyeIcon : string = "eye-off-outline"
  eyeIcon2 : string = "eye-off-outline"
  passType : string = "password"
  passType2 : string = "password"
  User_ID : number
  passwordInput : string
  newPassword : string
  reenterPassword : string
  

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  changePassword(){
    let load = this.loadingController.create({
      message: "Changing Password",
      spinner: "bubbles"
    })
    if(this.isCorrect()){
      load.then(res=>{
        res.present()
        this.dbapi.changePassword(this.User_ID, this.passwordInput,this.newPassword).subscribe(ok=>{
          if(ok === 1){
            setTimeout(()=>{
              res.dismiss()
              this.presentToast("Password successfully changed")
              this.modalController.dismiss()
             }, 500)
          }else{
            setTimeout(()=>{
              res.dismiss()
              this.presentAlert("Unable to change the password please try again", "Error")
             }, 500)
            
          }
        })
      })
      
    }
    
    
  }
  isCorrect(){
    if(this.newPassword === this.reenterPassword && this.newPassword.trim() != "" && this.reenterPassword.trim() != ""){
      return true
    }else{
      this.presentAlert("The passwords doesnt match", "Alert")
      return false
    }
  }
  dismiss(){
    this.modalController.dismiss()
  }
  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
    alert.present();
  }
  confirm(){
    let load = this.loadingController.create({
      message: "Checking password",
      spinner: "bubbles"
    })
    load.then(res=>{
      res.present()
      this.dbapi.confirmPassword(this.User_ID, this.passwordInput).subscribe(resp=>{
        console.log(resp)
        if(resp == 1){
          setTimeout(()=>{
           res.dismiss()
           this.slider.lockSwipes(false)
            this.slider.slideNext()
            this.slider.lockSwipes(true)
          }, 500)
          
        }else{
          setTimeout(()=>{
            res.dismiss()
            this.presentAlert("Incorrect Password", "Alert")
           }, 500)
          
        }
        
      })
    })
    
    
  }

  seePass(){
    if(this.eyeIcon == "eye-outline"){
      this.eyeIcon = "eye-off-outline"
      this.passType = "password"
    }else{
      this.eyeIcon = "eye-outline"
      this.passType = "text"
    }
  }
  seePass2(){
    if(this.eyeIcon2 == "eye-outline"){
      this.eyeIcon2 = "eye-off-outline"
      this.passType2 = "password"
    }else{
      this.eyeIcon2 = "eye-outline"
      this.passType2 = "text"
    }
  }
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.slider.update()
    this.slider.lockSwipes(true)
    this.storage.get("User_ID").then(uid=>{
      this.User_ID = uid
      this.userservice.isAuth(uid)
    })
  }

}
