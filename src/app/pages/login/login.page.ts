import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { CreateUserPolicy, UserCredentials } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserserviceService]
})
export class LoginPage implements OnInit {
  
  showPassword  = false;
  passwordToggleIcon = "eye-off-outline";

  uname: string = '';
  pass: string = '';
 


  
  constructor(public modalCtrl: ModalController,
    public userservice : UserserviceService,
    public navCtrl: NavController,
    private dbapi : DbapiService,
    private router : Router,
    private alert : AlertController,
    private storage : Storage
    ) { }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == "eye-outline"){
      this.passwordToggleIcon = "eye-off-outline";
    }else{
      this.passwordToggleIcon = "eye-outline";
    }
  }

  async verifyLogin(){
    try {
      let policy =  await new Promise((resolve, reject)=>{
        this.dbapi.searchUser_username(this.uname).subscribe((policy: CreateUserPolicy[])=>{
          resolve(policy)
        })
      })

      if (policy[0]){
        if (this.uname === policy[0].Username && policy[0].Password === this.pass){
          await this.userservice.addUserInfo("User_ID", policy[0].User_ID)
          await this.userservice.addUserInfo("Username", policy[0].Username)
          await this.userservice.addUserInfo("User_Type", policy[0].User_Type)

          if(policy[0].User_Type == 'tenant'){
            location.href = "/map"
            this.dismiss();
          }
          else if(policy[0].User_Type == "property owner"){
            location.href = "/subscription"
            this.dismiss();
          }
          else if(policy[0].User_Type == "admin"){
            this.router.navigate(['/admininterface/reports'])
            this.dismiss();
          }
        } else {
          this.presentAlert("The username and password is incorrect")
          this.uname = ""
          this.pass = ""
        }
      } else {
        // console.log("Unregistered Username")
        this.presentAlert("The username and password is incorrect")
        this.uname = ""
        this.pass = ""
      }

      // await this.dbapi.searchUser_username(this.uname).subscribe((policy: CreateUserPolicy[]) => {
      //   // this.presentAlert("nagana yung db")
      //   console.log("gumana yung db api")
      //   if(policy[0]){
      //     //console.log(policy[0])
      //     if(this.uname === policy[0].Username && policy[0].Password === this.pass){
      //       this.userservice.addUserInfo("User_ID", policy[0].User_ID)
      //       this.userservice.addUserInfo("Username", policy[0].Username)
      //       this.userservice.addUserInfo("User_Type", policy[0].User_Type)
      //       // this.presentAlert("nagana yung storage")
      //       // console.log(policy[0].User_Type)
            
      //       if(policy[0].User_Type == 'tenant'){
      //         // console.log('You are a Tenant')
      //         location.href = "/map"
      //         // this.router.navigate(['/map'])
      //         this.dismiss();
      //       }
      //       else if(policy[0].User_Type == "property owner"){
      //         // console.log('You are a Property Owner')
      //         location.href = "/subscription"
      //         // this.router.navigate(['/subscription'])
      //         this.dismiss();
      //       }
      //       else if(policy[0].User_Type == "admin"){
      //         // console.log('You are an Admin')
      //         this.router.navigate(['/admininterface/reports'])
      //         this.dismiss();
      //       }
      //       else{
      //         // console.log("di nagmatch")
      //       }
            
      //     }else{
      //       // console.log("di nagmatch")
      //       this.presentAlert("The username and password is incorrect")
      //       this.uname = ""
      //       this.pass = ""
      //     }
      //   }
      //   else{
      //     // console.log("Unregistered Username")
      //     this.presentAlert("The username and password is incorrect")
      //     this.uname = ""
      //     this.pass = ""
      //   }
       
      // })
    } catch (error) {

      console.log(error)

    }
  }


  closeLogin(){
    this.dismiss();
  }

  async presentAlert(content: string) {
    const alert = await this.alert.create({
      cssClass: '',
      header: 'Alert',
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }


  ngOnInit() {
  }

  

}
