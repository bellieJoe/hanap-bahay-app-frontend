import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AlertController, DomController, IonicModule, IonInput, IonLabel, IonSlides, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AsyncSubject } from 'rxjs';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { activeUser, CreateUserPolicy, UserCredentials, UserProfile, UserUniqueInputs } from 'src/app/providers/policy';
import { SignupdonePage } from './signupdone/signupdone.page';
import { Storage } from '@ionic/storage';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { TitleCasePipe } from '@angular/common';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public dbapi : DbapiService,
    public router: Router,
    public navCtrl : NavController,
    public storage : Storage,
    private userservice : UserserviceService,
    private alertController: AlertController,
    private t : TitleCasePipe,
    private loadingController: LoadingController
    ) { }

  //password hiding
  showPassword1  = false;
  showPassword2  = false;
  passwordToggleIcon1 = "eye-off";
  passwordToggleIcon2 = "eye-off";
  Info_ok : boolean =  false
  Verification_Code : string
  codeInput : string
  phase : number = 1

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



  //slides
  @ViewChild('slides')  slides: IonSlides;

  backDisable = true;
  swipeNext(){
    this.slides.slideNext();
  }
  swipeBack(){
    this.slides.slidePrev();
  }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
  };

  closeSignup(){
    this.dismiss();
  }

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

  
  //user_input_credentials: UserCredentials = { username : null, password : null}

  // //to check if the passwords inputted are desame , validating inputs
  password_retype : string;
  checkMatch(){
    //console.log(this.user_inputs.Password)
    // console.log("Checking if Passwords Match...")
    if(this.user_inputs.Password != this.password_retype){
      document.getElementById("pass_warning").style.display = "flex";
      // console.log("Error: Passwords does'nt Match")
    }
    else{
      document.getElementById("pass_warning").style.display = "none";
      // console.log("Passwords Match")
    }
  }

  gotoVerify(){
    this.phase = 3
    // this.createAcc()
  }

  //checks the inputs that must be unique
  userUniqueIn : UserUniqueInputs []
  validateUniqueInputs(a : string){
    // console.log("Validating ", a, " ...")//temp
      this.dbapi.getUserUniqueInputs().subscribe((policy: UserUniqueInputs[])=>{
        this.userUniqueIn = policy
        if(a == "Username"){
          let isDuplicate = false
          for (let i of this.userUniqueIn) {
            if(this.user_inputs.Username  == i.Username){
              // console.log("Error: The Username is taken, change it!")
              this.user_inputs.Username = null
              isDuplicate = true
            }
          }
          if(isDuplicate == true){
            document.getElementById('username_warning').style.display = "flex"
          }
          else{
            document.getElementById('username_warning').style.display = "none"
          }
        }

        if(a == "Email"){
          let isDuplicate = false
          for (let i of this.userUniqueIn) {
            if(this.user_inputs.Email  == i.Email){
              // console.log("Error: The Email address is already used")
              this.user_inputs.Email = ""
              isDuplicate = true
            }
          }
          if(isDuplicate == true){
            document.getElementById('email_warning').style.display = "flex"
          }
          else{
            document.getElementById('email_warning').style.display = "none"
          }
        }
        if(a == "Contact_number"){
          let isDuplicate = false
          for (let i of this.userUniqueIn) {
            if(this.user_inputs.Contact_Number  == i.Contact_number){
              // console.log("Error: The Contact number is already used")
              this.user_inputs.Contact_Number = ""
              isDuplicate = true
            }
          }
          if(isDuplicate == true){
            document.getElementById('c_number_warning').style.display = "flex"
          }
          else{
            document.getElementById('c_number_warning').style.display = "none"
          }
        }
      })
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

    resend(){
      this.dbapi.sendCode(this.user_inputs.Email, this.Verification_Code, `${this.t.transform(this.user_inputs.Firstname)} ${this.t.transform(this.user_inputs.Lastname)}`).subscribe()
    }

  createAcc(){
    if(this.user_inputs.Firstname != null && this.user_inputs.Username != null &&
      this.user_inputs.Password != null && this.user_inputs.Lastname != null &&
      this.user_inputs.Middlename != null && this.user_inputs.Birthdate != null && this.user_inputs.Email != null &&
      this.user_inputs.Address != null && this.user_inputs.Contact_Number != null && 
      this.user_inputs.User_Type != null){

        if(this.user_inputs.Contact_Number.toString().length == 10){
          this.Info_ok = true
          this.phase = 2
          this.Verification_Code = this.generateCode()
          // console.log(this.Verification_Code)
          this.dbapi.sendCode(this.user_inputs.Email, this.Verification_Code, `${this.t.transform(this.user_inputs.Firstname)} ${this.t.transform(this.user_inputs.Lastname)}`).subscribe()
        }else{
          this.presentAlert("Contact length must me 10 digits", "Alert")
        }  
    }
    else{
      // console.log('Error: Signup Form Incomplete')
      document.getElementById('form_inc_warning').style.display = "flex"
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
    // console.log("code :", this.codeInput)
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
    // validates the users inputs
    if(this.user_inputs.Firstname != null && this.user_inputs.Username != null &&
      this.user_inputs.Password != null && this.user_inputs.Lastname != null &&
      this.user_inputs.Middlename != null && this.user_inputs.Birthdate != null && this.user_inputs.Email != null &&
      this.user_inputs.Address != null && this.user_inputs.Contact_Number != null && 
      this.user_inputs.User_Type != null){
        // console.log(this.user_inputs.Contact_Number.toString().length)
        if(this.user_inputs.Contact_Number.toString().length == 10){
          
          this.dbapi.createUserPolicy(this.user_inputs).subscribe(()=>{
            setTimeout(()=>{
              this.loadingController.dismiss()
            }, 1000)
            // console.log("Creating  User Success");
            this.dbapi.searchUser(this.user_inputs.Username).subscribe((policy: CreateUserPolicy[])=>{
              

              // console.log(policy[0])
  
              //creating the profile of the user
              this.profile.User_ID = policy[0].User_ID
              // console.log(this.profile)
              this.dbapi.creteUserProfile_id(this.profile).subscribe(()=>{
                // console.log("Profile Successfully Created")
              })
  
              //sets the info for active user to the offline storage or ionic storage
              this.userservice.addUserInfo("User_ID", policy[0].User_ID)
              this.userservice.addUserInfo("Username", policy[0].Username)
              this.userservice.addUserInfo("User_Type", policy[0].User_Type)
              // console.log("Eto yung laman ng storage pagka-update",this.storage.get("User_Type"))
              
              //checks the type of user

              // this.loadingController.dismiss()
              if(policy[0].User_Type == 'tenant'){
                // console.log('You are a Tenant')
                this.router.navigate(['/map'])
              }
              else if(policy[0].User_Type == "property owner"){
                console.log('You are a Property Owner')
                // dito naman ako gagawa ng subscription nd user
                this.dbapi.addRHSubscription(policy[0]).subscribe(()=>{
                  // console.log("subscribtion success")
                })
                this.router.navigate(['/subscription'])
              }
              else if(policy[0].User_Type == "admin"){
                // console.log('You are an Admin')
                this.router.navigate(['/admininterface/reports'])
              }
              else{}
            })// dito natapos yung pagcreate ng account
  
            
  
            this.user_inputs.Firstname = null 
            this.user_inputs.Username = null 
            this.user_inputs.Password = null 
            this.user_inputs.Lastname = null 
            this.user_inputs.Middlename = null 
            this.user_inputs.Birthdate = null 
            this.user_inputs.Email = null 
            this.user_inputs.Address = null 
            this.user_inputs.Contact_Number = null 
            this.user_inputs.User_Type = null
            this.password_retype = null
            this.Info_ok =  false
            this.Verification_Code = null
            this.codeInput = null
            this.dismiss()
          })
        }else{
          this.presentAlert("Contact length must me 10 digits", "Alert")
        }  
    }
    else{
      // console.log('Error: Signup Form Incomplete')
      document.getElementById('form_inc_warning').style.display = "flex"
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    try {
      this.slides.update()
    } catch (error) {
      // console.log(error)
    }
  }



}
