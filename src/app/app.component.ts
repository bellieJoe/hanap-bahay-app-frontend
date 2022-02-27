import { Component, OnInit } from '@angular/core';

import { AlertController, IonApp, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserserviceService } from './providers/userservice.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { DbapiService } from './providers/dbapi.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UserserviceService]
})
export class AppComponent implements OnInit{

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userservice: UserserviceService,
    private http: HttpClient,
    private storage : Storage,
    private dbapi : DbapiService,
    private router : Router,
    private alertController: AlertController
  ) {

    this.initializeApp();
  }

  async ngOnInit() {
      // this.dbapi.getCSRFToken()
      // console.log(this.dbapi.CSRF_TOKEN)
      // this.dbapi.authSanctum()
  }
 
  
  menuLinks : any
  User_Type : string
  UserDets = {
    User_ID : null,
    Firstname : null,
    Middlename : null,
    Lastname : null,
    Birthdate : null,
    Email : null,
    Address : null,
    Contact_Number : null,
    User_Type : null,
  }
  image_src = ""
  url_src = `${this.dbapi.SERVER}/images/profile/`
  RRP_Name : string
  Notification_Count : number
  HasNewMessage  : number

  checkUserType(){
    if(this.userservice.menulink){
      this.menuLinks = this.userservice.menulink
    }
    else{
      this.checkUserType()
    }
  }

  async logout(){
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to logout',
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Yes",
          handler: ()=>{
            this.storage.clear().then(()=>{
              window.location.href = ""
            })
          }
        }
      ]
    });
  
    await alert.present();
    
  }

  updateMenulinks(){

    this.menuLinks = this.userservice.menulink
  }

  reportIssues(){
    this.router.navigate(['/issues'])
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loadMenu(){
    //console.log("nagana yune menu trigeer")
    this.storage.get("User_ID").then((uid)=>{
      this.dbapi.countNewNotification(uid).subscribe(count=>{
        this.Notification_Count = count
      })
      this.dbapi.checkNewMesagges(uid).subscribe(status=>{
        this.HasNewMessage = status
      })
      
      this.storage.get("User_Type").then((val)=>{
        this.User_Type = val
        if(this.User_Type == "tenant"){
          this.dbapi.getTenantDetails(uid).subscribe(tdets=>{
            if(tdets){
              this.dbapi.getRHDetails_rrpid(tdets.RRP_ID).subscribe(rhdets=>{
                this.RRP_Name = rhdets.RRP_Name
              })
            }else{
              this.RRP_Name = null
            }
          })
        }
        
      })
      this.dbapi.getUserDetails_id(uid).subscribe((details)=>{
        this.UserDets = details[0]
        this.dbapi.fetchImage(uid, "user-profile").subscribe(image=>{
          if(image){
            this.image_src = `${this.url_src}${image.IMG_Filename}.png?` + new Date().getTime()
          }else{
            this.image_src = null
          }
        })
      })
    })
  }

  ionViewDidEnter(){
    
  }
}
