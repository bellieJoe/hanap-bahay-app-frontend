import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { CreateUserPolicy } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { LoginPage } from '../login/login.page';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.page.html',
  styleUrls: ['./landingpage.page.scss'],
  providers: [UserserviceService]
})
export class LandingpagePage implements OnInit {

  constructor(
    public modalController: ModalController,
    public userservice : UserserviceService,
    public dbapi : DbapiService,
    private storage : Storage,
    private router : Router
  ) { }

  just_search : boolean = true

  showLogin(){
    // this.presentLoginModal();
    this.router.navigate(['/login'])
  }

  showSignup(){
    this.presentSignupModal();
  }

  
  async presentLoginModal() {
    const loginmodal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'modal-login'
    });
    return await loginmodal.present();
  }

  async presentSignupModal(){
    const signupmodal = await this.modalController.create({
      component: SignupPage,
      cssClass: 'modal-login'
    });

    return await signupmodal.present();
  }
  
  
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      if(uid){
        this.just_search = false
        this.storage.get("User_Type").then(type=>{
          if(type == "property owner"){
            this.router.navigate(['/subscription'])
          }else if(type == "tenant"){
            this.router.navigate(['/map'])
          }else if(type == "admin"){
            this.router.navigate([''])
          }
        })
      }else{
        // console.log("wala")
      }
    })
  }
}
