import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonToggle, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private titlecase : TitleCasePipe,
    private loadingController: LoadingController,
    private alertController: AlertController,

  ){ }

  User_ID : number
  User_Details : any = []
  Privacy_Input : any = []
  Privacy_Copy : string
  sample : any
  allowSave : boolean = true

  @ViewChild('toggle0')  toggle0 : IonToggle
  @ViewChild('toggle1')  toggle1 : IonToggle
  @ViewChild('toggle2')  toggle2 : IonToggle
  @ViewChild('toggle3')  toggle3 : IonToggle
  @ViewChild('toggle4')  toggle4 : IonToggle
  @ViewChild('toggle5')  toggle5 : IonToggle

  ngOnInit() {
  }

  ionViewDidLeave(){
    this.User_ID = null
    this.User_Details = []
    this.Privacy_Input = []
    this.Privacy_Copy = ""
    this.sample = null
    this.allowSave = true
  }

  convertPrivacy(){
    for(let i = 0; i<6;i++){
      if(this.Privacy_Copy[i] == '1'){
        this.Privacy_Input[i] = true
      }else{
        this.Privacy_Input[i] = false
      }
    }

  }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
    await alert.present();
  }


  toggle(){
    this.Privacy_Input[0] = this.toggle0.checked
    this.Privacy_Input[1] = this.toggle1.checked
    this.Privacy_Input[2] = this.toggle2.checked
    this.Privacy_Input[3] = this.toggle3.checked
    this.Privacy_Input[4] = this.toggle4.checked
    this.Privacy_Input[5] = this.toggle5.checked
    this.allowSave = this.reversePrivacy()
    console.log(this.allowSave)

  }

  reversePrivacy(){
    let temp : string = ""
    for(let i = 0; i<6;i++){
      if(this.Privacy_Input[i] == true){
        temp += "1"
      }else{
        temp += "0"
      }
    }
    console.log(`temp ${temp}, pocpr ${this.Privacy_Copy}`)
    if(temp == this.Privacy_Copy){
      return true
    }else{
      return false
    }
  }


  saving : boolean = false
  saveChanges(){
    this.saving = true
    this.Privacy_Input[0] = this.toggle0.checked
    this.Privacy_Input[1] = this.toggle1.checked
    this.Privacy_Input[2] = this.toggle2.checked
    this.Privacy_Input[3] = this.toggle3.checked
    this.Privacy_Input[4] = this.toggle4.checked
    this.Privacy_Input[5] = this.toggle5.checked
    console.log(this.Privacy_Input)
    let temp : string = ""
    for(let i = 0; i<6;i++){
      if(this.Privacy_Input[i] == true){
        temp += "1"
      }else{
        temp += "0"
      }
    }
    this.dbapi.updatePrivacy(temp, this.User_ID).subscribe(()=>{
      this.dbapi.getUserDetails_id(this.User_ID).subscribe(dets=>{
        this.Privacy_Copy = dets[0].Privacy
        this.convertPrivacy()
        this.saving = false
        this.allowSave = true
        this.presentAlert("Your Privacy Settings was successfully updated", "Update Success")
      })
      
    })
    
    
  }

  getUserDetails(){
    let t = this.titlecase
    this.dbapi.getUserDetails_id(this.User_ID).subscribe(dets=>{
      console.log(dets)
      this.Privacy_Copy = dets[0].Privacy
      this.convertPrivacy()
      console.log(this.Privacy_Input)
      let u = dets[0]
      this.User_Details.Name = `${t.transform(u.Firstname)} ${t.transform(u.Middlename.slice(0,1))}. ${t.transform(u.Lastname)}`
      this.User_Details.Birthdate = u.Birthdate
      this.User_Details.Email = u.Email
      this.User_Details.Contact_Number = u.Contact_Number
      this.User_Details.Address = u.Address
      
      this.dbapi.getUserProfile_id(this.User_ID).subscribe(prof=>{
        let p = prof[0]
        this.User_Details.School_Went = p.School_Name
        this.User_Details.Occupation = p.Occupation
        this.User_Details.Emergency_Contact = p.Contact_Number
      })
    })
  }

  ionViewDidEnter(){
    console.log(this.sample)
    this.storage.get("User_ID").then(uid=>{
      if(uid){
        this.User_ID = uid
        this.getUserDetails()
      }else{
        this.router.navigate([''])
      }
    })
  }

}
