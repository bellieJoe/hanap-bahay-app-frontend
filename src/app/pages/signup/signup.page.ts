import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AlertController, DomController, IonicModule, IonInput, IonLabel, IonSlides, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AsyncSubject } from 'rxjs';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { activeUser, CreateUserPolicy, UserCredentials, UserProfile, UserUniqueInputs } from 'src/app/providers/policy';
import { SignupdonePage } from './signupdone/signupdone.page';
import { Storage } from '@ionic/storage';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { TitleCasePipe } from '@angular/common';
import _ from "lodash"
import { ValidatorModule } from 'src/app/modules/validator/validator.module';
import { resolve } from 'dns';
const validate = require("validate.js")
const moment = require("moment")



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage  {

  constructor(
    public modalController: ModalController,
    public dbapi : DbapiService,
    public router: Router,
    public navCtrl : NavController,
    public storage : Storage,
    private userservice : UserserviceService,
    private alertController: AlertController,
    private t : TitleCasePipe,
    private loadingController: LoadingController,
    private validator: ValidatorModule,
    private toast: ToastController
    ) { }

  //slides
  @ViewChild('slides')  slides: IonSlides;
  backDisable = true;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
  };
  loading: boolean =  false

  //password hiding
  showPassword1  = false;
  showPassword2  = false;
  passwordToggleIcon1 = "eye-off";
  passwordToggleIcon2 = "eye-off";
  Info_ok : boolean =  false
  Verification_Code : string
  codeInput : string
  phase : number = 1
  validating : boolean = false

  //for policies purposes
  profile : UserProfile = {
    User_ID : null,
    Occupation : null,
    Work_Address : null,
    Highest_Education : null,
    School_Name : null,
    School_Address  : null,
    Guardian_Name  : null,
    Contact_Number : null,
    Relationship : null,
    Address : null,
  }
  user_account_info : CreateUserPolicy[]
  //user_account_credentials : UserCredentials[]
  password_retype : string;
  user_inputs : CreateUserPolicy = {
    User_ID: null, 
    Firstname : null,
    Middlename : null,
    Lastname : null,
    Birthdate : null,
    Email : null,
    Address : null,
    Contact_Number : null,
    User_Type : null,
    Username : null,
    Password : null
  }

  // validation
  errors: any = {}

  ionViewDidLeave(){
    this.phase = 1
  }

  togglePassword(a){
    
    if(a == 1){
      this.showPassword1 = !this.showPassword1;
      if(this.passwordToggleIcon1 == "eye" ){
        this.passwordToggleIcon1 = "eye-off";
      }else{
        this.passwordToggleIcon1 = "eye";
      }
    }
    else{
      this.showPassword2 = !this.showPassword2;
      if(this.passwordToggleIcon2 == "eye" ){
        this.passwordToggleIcon2 = "eye-off";
      }else{
        this.passwordToggleIcon2 = "eye";
      }
    }
  }

  async validateInputs(index){
    let cons = []
    let data = {}
    if(index == 0){
      data = {
        Username: this.user_inputs.Username,
        Password: this.user_inputs.Password,
        confirmPassword: this.password_retype
      }
      cons = ['Username', 'Password', 'confirmPassword']
    }else if(index == 1){
      data = {
        Firstname: this.user_inputs.Firstname,
        Middlename: this.user_inputs.Middlename,
        Lastname: this.user_inputs.Lastname,
        Birthdate: this.user_inputs.Birthdate
      }
      cons = ['Firstname', 'Middlename', 'Lastname', 'Birthdate']
    }else if (index == 2){
      data = {
        Email: this.user_inputs.Email,
        Address: this.user_inputs.Address,
        User_Contact_Number: this.user_inputs.Contact_Number
      }
      cons = ['Email', 'Address', 'User_Contact_Number']
    }else if (index == 3){
      data = {
        User_Type: this.user_inputs.User_Type,
      }
      cons = ['User_Type']
    }

    return await this.validator.validateOnly(data, cons)
  }
  
  async swipeNext(){
    let activeIndex = await this.slides.getActiveIndex();
    this.validating = true
    let res = await this.validateInputs(activeIndex)
    this.validating = false
    this.errors = res.error
    if(res.success){
      this.errors = {}
      this.slides.slideNext()
    }
  }

  swipeBack(){
    this.slides.slidePrev();
  }

  closeSignup(){
    this.dismiss();
  }

  gotoVerify(){
    this.phase = 3
    // this.createAcc()
  }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
    await alert.present();
  }

  generateCode(){
    let a : string = ""
    for(let i = 0;i<6;i++){
      // console.log("Randoms", Math.random().toPrecision(9).toString()[9])
      a += Math.random().toPrecision(9).toString()[9]
    }
    return a
  }

  async resend(){
    this.loading = true
    this.Verification_Code = this.generateCode()
    await new Promise((resolve, reject) => {
      this.dbapi.sendCode(this.user_inputs.Email, this.Verification_Code, `${this.t.transform(this.user_inputs.Firstname)} ${this.t.transform(this.user_inputs.Lastname)}`).subscribe(()=>{
        resolve(null)
      })
    })

    this.loading = false

    const toast = await this.toast.create({
      animated: true,
      duration: 3000,
      message: "Verification Code successfully sent",
      mode: "md"
    })

    await toast.present()

  }

  async createAcc(){
    this.loading = true
    let validationResult : any = await this.validateInputs(3)
    this.errors = validationResult.error ? validationResult.error : {}
    if(validationResult.success){
      this.Info_ok = true
      this.Verification_Code = this.generateCode()
      this.dbapi.sendCode(this.user_inputs.Email, this.Verification_Code, `${this.t.transform(this.user_inputs.Firstname)} ${this.t.transform(this.user_inputs.Lastname)}`).subscribe(()=>{
        this.phase = 2
        this.loading = false
      })
    }
    else {
      this.loading = false
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Creating Account',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  verify(){
    this.presentLoading()

    if(this.codeInput == this.Verification_Code){
      this.generateNewUser()
    }else{
      this.codeInput = null
      setTimeout(()=>{
        this.loadingController.dismiss().then(()=>{
         this.presentAlert("Invalid code", "Alert")

        })
      }, 1000)
    }
  }


  generateNewUser(){
    console.log(this.user_inputs)
    this.dbapi.createUserPolicy(this.user_inputs).subscribe(()=>{
      setTimeout(()=>{
        this.loadingController.dismiss()
      }, 1000)

      this.dbapi.searchUser(this.user_inputs.Username).subscribe((policy: CreateUserPolicy[])=>{

        this.profile.User_ID = policy[0].User_ID

        this.dbapi.creteUserProfile_id(this.profile).subscribe(()=>{
          new Promise(async(resolve, reject)=>{
            await this.userservice.addUserInfo("User_ID", policy[0].User_ID)
            await this.userservice.addUserInfo("Username", policy[0].Username)
            await this.userservice.addUserInfo("User_Type", policy[0].User_Type)
            console.log("Login successful")
            if(policy[0].User_Type == 'tenant'){
              location.href = "/map"
            }else if(policy[0].User_Type == "property owner") {
              this.dbapi.addRHSubscription(policy[0]).subscribe(()=>{
                this.router.navigate(['/subscription'])
              })
            }else if(policy[0].User_Type == "admin") {
              this.router.navigate(['/admininterface/reports'])
            }else{

            }
            resolve(null)
          })
        })
      })
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewDidEnter(){
    try {
      this.slides.update()
    } catch (error) {
      // console.log(error)
    }
  }

}
