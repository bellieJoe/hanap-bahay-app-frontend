import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserProfile } from 'src/app/providers/policy';

@Component({
  selector: 'app-regtenant',
  templateUrl: './regtenant.page.html',
  styleUrls: ['./regtenant.page.scss'],
})
export class RegtenantPage implements OnInit {

  constructor(
    private storage : Storage,
    private route : ActivatedRoute,
    private router : Router,
    private dbapi : DbapiService,
    private alertController: AlertController,
    private toastController: ToastController,

  ) { }

  Email : string
  phase : number = 1
  Verification_Code : string 
  codeInput : string 
  Username : string
  Password : string
  RePassword :string
  Birthdate : string
  Contact_Number : string
  Address : string
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

  ionViewDidLeave(){
    this.storage.remove("emeyl")
    this.Email = null
    this.phase = 1
    this.Verification_Code = null
    this.codeInput = null
    this.pass1 = "password"
    this.pass1_icon = "eye-off"
    this.pass2 = "password"
    this.pass2_icon = "password"
  }

  ngOnInit() {
  }

  back(){
    this.phase--
  }

  checkLoginInfo(){
    this.Username = this.Username.trim()
    if(this.Username && this.Username.trim() != "" && this.Password && this.RePassword){
      this.dbapi.checkUsername(this.Username).subscribe(stat=>{
        console.log(stat)
        if(stat == "TAKEN"){
          this.presentAlert("The Username you entered is already taken", "Invalid Username")
        }else if(stat == "NOT TAKEN"){
          if(this.Password == this.RePassword){
            this.phase = 4
          }else{
            this.presentAlert("The passwords you entered do not match.", "Unmatched Password")
          }
        }
      })
    }else{
      this.presentAlert("Please complete the form before proceeding", "Incomplete form")
    }
  }

  finish(){
    if(this.Address){
      this.Address = this.Address.trim()
    }
    if(this.Contact_Number  && this.Birthdate && this.Address){
      if(this.Contact_Number.length == 10){
        this.dbapi.updateUserDetails_walkin(this.Email,this.Username,this.Password,this.Contact_Number,this.Birthdate,this.Address).subscribe(()=>{
          // console.log(how)
          this.presentToast("Registration Finish")
          this.dbapi.checkIfRegistered_email(this.Email).subscribe(dets=>{
            this.storage.set("User_ID", dets.User_List_ID).then(()=>{
              this.storage.set("User_Type", "tenant").then(()=>{
                this.profile.User_ID = dets.User_List_ID
                this.dbapi.creteUserProfile_id(this.profile).subscribe(()=>{
                  // console.log("Profile Successfully Created")
                  location.href = "/profile"

                })
              })
            })
          })
        })
      }else{
        this.presentAlert("The Contact Number must ne 10 digits", "Contact Number")
      }
    }else{
      this.presentAlert("Please complete thte form before clicking Finsh Button", "Incomplete Form")
    }
      
  }

  pass1 : string = "password"
  pass2 : string = "password"
  pass1_icon : string = "eye-off"
  pass2_icon : string = "eye-off"
  eye_toggle(a:string){
    if(a == "Password"){
      if(this.pass1 == "password"){
        this.pass1 = "text"
        this.pass1_icon = "eye"
      }else{
        this.pass1 = "password"
        this.pass1_icon = "eye-off"
      }
    }else if(a == "RePassword"){
      if(this.pass2 == "password"){
        this.pass2 = "text"
        this.pass2_icon = "eye"
      }else{
        this.pass2 = "password"
        this.pass2_icon = "eye-off"
      }
    }
  }

  async alertNoEmail() {
    const alert = await this.alertController.create({
      header: 'Unregistered Email',
      message: `This email ${this.Email} is not yet registered. Please Enter the email that is registered by your property owner.`,
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
  
  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  verify(){
    if(this.Verification_Code == this.codeInput){
      this.presentToast("Your Account is verified")
      this.phase = 3
    }else{
      this.presentAlert("The Verification code you entered is incorrect", "Incorrect code")
    }
  }

  generateCode(){
    let a : string = ""
    for(let i = 0;i<6;i++){
      // console.log("Randoms", Math.random().toPrecision(9).toString()[9])
      a += Math.random().toPrecision(9).toString()[9]
    }
    return a
  }

  sendCode(){
    this.dbapi.checkIfRegistered_email(this.Email).subscribe(dets=>{
      this.Verification_Code = this.generateCode()
      this.dbapi.sendCode(this.Email, this.Verification_Code, `${dets.Firstname} ${dets.Lastname}`).subscribe()
    })
  }

  checkEmail(){
    this.dbapi.checkIfRegistered_email(this.Email).subscribe(dets=>{
      if(dets){
        if(dets.Registered_By == "property owner"){
          this.sendCode()
          this.phase = 2
        }else{
          this.presentAlert("This Email is already registered." ,"Alert")
        }
      }else{
        this.alertNoEmail()
      }
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      if(uid){
        this.router.navigate([''])

        
      }else{
        console.log("Ok")
        this.route.queryParams.subscribe(params=>{
          if(params.email){
            this.storage.set("emeyl", params.email).then(()=>{
              this.router.navigate(['/login/regtenant'])
            })
          }else{
            this.storage.get("emeyl").then(email=>{
              if(email){
                //semd verification code
                this.Email = email
                this.sendCode()
                this.phase = 2
              }else{
                console.log("wala")
              }
            })
          }
        })
      }
    }, ()=>{
      console.log("Ok")
        this.route.queryParams.subscribe(params=>{
          if(params.email){
            this.storage.set("emeyl", params.email).then(()=>{
              this.router.navigate(['/login/regtenant'])
            })
          }
        })
    })
    
    
  }

}
