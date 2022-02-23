import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-regtenant',
  templateUrl: './regtenant.page.html',
  styleUrls: ['./regtenant.page.scss'],
})
export class RegtenantPage implements OnInit {

  constructor(
    private dbapi : DbapiService,
    private alertController: AlertController,
    private titlecase : TitleCasePipe,
    private storage : Storage,
    private router : Router,
    private toastController: ToastController,
    private datepipe : DatePipe,
  ) { }

  Email : string
  Type : string
  phase : number = 1
  Firstname : string
  Middlename : string
  Lastname : string
  User_ID : number
  RRP_ID : number
  RH_Details : any
  RRP_Settings : any

  ionViewDidLeave(){
    this.Email = null
    this.phase = 1
    this.Firstname = null
    this.Middlename = null
    this.Lastname = null
    this.User_ID = null
    this.RRP_ID = null
  }


  ngOnInit() {
  }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
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

  checkEmail(){
    if(this.Email && this.Email.trim() != "" && this.Type){
      this.dbapi.checkIfRegistered_email(this.Email).subscribe(res=>{
        if(res){
          let t = this.titlecase
          let message = `This user is already registered with the name ${t.transform(res.Firstname)} ${t.transform(res.Middlename)} ${t.transform(res.Lastname)}.`
          this.presentAlert(message, "Email already used")
        }else{
          this.phase = 2
        }
      })
    }else{
      this.presentAlert("Please complete the form", "Incomplete Data")
    }
  }

  register(){
    
    let t = this.titlecase
    if(this.Firstname && this.Firstname.trim() != ""
    && this.Lastname && this.Lastname.trim() != ""
    && this.Middlename && this.Middlename.trim() != ""){
      let Receiver_Name = `${t.transform(this.Firstname)} ${t.transform(this.Lastname)}`
      console.log(this.Email, t.transform(this.Firstname), t.transform(this.Middlename), t.transform(this.Lastname))

      this.dbapi.registerTenant(this.Email, t.transform(this.Firstname), t.transform(this.Middlename), t.transform(this.Lastname)).subscribe(()=>{
        this.dbapi.getUserDetails_id(this.User_ID).subscribe(udets=>{
          let Owner_Name = `${t.transform(udets[0].Firstname)} ${t.transform(udets[0].Lastname)}`
          this.dbapi.regTenantMail(this.Email, udets[0].Email, Owner_Name, Receiver_Name).subscribe()
          this.presentToast("ok")
          this.dbapi.checkIfRegistered_email(this.Email).subscribe(dets=>{
            this.dbapi.addTenant_rrpid(dets.User_List_ID, this.RRP_ID, this.datepipe.transform(new Date(), "yyyy-MM-dd"), this.datepipe.transform(new Date(), "HH:mm:ss")).subscribe(()=>{
              this.presentToast("The tenant you registered was added to your Rental house")
              this.router.navigate(['/boardinghouse/members'])
            })
            // console.log(dets.User_List_ID)
          })
        })
      })
    }else{
      this.presentAlert("Please fill up the form before  proceeding.", "Incomplete Inputs")
    }
  }

  async cancel(){
    const alert = await this.alertController.create({
      header: "Cancel Registration",
      message: "Are you sure you want to cancel the Registration?",
      buttons: [
        {
          text : "No"
        },
        {
          text : "Yes",
          handler : ()=>{
            this.Email = null
            this.Firstname = null
            this.Lastname = null
            this.Middlename = null
            this.phase = 1
          }
        }
      ]
    });
    await alert.present();
    
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      this.User_ID = uid
      this.storage.get("User_Type").then(utype=>{
        if(utype == "property owner"){
          this.storage.get("RRP_ID").then(rrpid=>{
            if(rrpid){
              this.RRP_ID = rrpid
              this.dbapi.getRHDetails_rrpid(this.RRP_ID).subscribe((rdets) =>{
                this.RH_Details = rdets
                this.RRP_Settings = JSON.parse(rdets.RRP_Settings)
              })
            }else{
              this.router.navigate([''])
            }
          })
        }else{
          this.router.navigate([''])
        }
      })
    })
  }

}
