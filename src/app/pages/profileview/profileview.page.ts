import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.page.html',
  styleUrls: ['./profileview.page.scss'],
})
export class ProfileviewPage {

  constructor(
    private storage : Storage,
    private userservice : UserserviceService,
    private dbapi : DbapiService,
    private titleCase : TitleCasePipe,
    private router : Router
  ) { }

  User_ID : number
  UserDetails : any = []
  UserProfile : any = {}
  url_src = `${this.dbapi.SERVER}/images/profile/`
  img_src : string = null
  Privacy  : any = []
  Privacy_Copy : string 

  ionViewDidLeave(){
    this.UserDetails = []
    this.UserProfile = {}
    this.User_ID = null
    this.Privacy_Copy = ""
    this.Privacy = []
  }

  message(){
    this.storage.set("conv_dets", {uid : this.User_ID, uid_B: this.UserDetails.User_ID, type: "user to user"}).then(()=>{
      this.router.navigate(['/message/conversation'])
    })

  }

  reset(){
    this.storage.remove("vst_prof")
    this.User_ID = undefined
    this.UserDetails = {}
    this.UserProfile = {}
    this.img_src = null
  }

  loadProfileImage(){
    this.dbapi.fetchImage(this.UserDetails.User_ID, "user-profile").subscribe(image=>{
      if(image){
        this.img_src = `${this.url_src}${image.IMG_Filename}.png?` + new Date().getTime()
      }else{
        this.img_src = null
      }
    })
  }



  loadProfile(){
    this.dbapi.getUserProfile_id(this.UserDetails.User_ID).subscribe(prof=>{
      let p = prof[0]
      this.UserDetails.School_Went = p.School_Name
      this.UserDetails.Occupation = `${p.Occupation}`
      this.UserDetails.Emergency_Contact = p.Contact_Number
      this.UserDetails.Guardian_Name = p.Guardian_Name
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      this.userservice.isAuth(uid)
      this.User_ID = uid
      this.storage.get("vst_prof").then(id=>{
        if(id){
          this.dbapi.getUserDetails_id(id).subscribe(udets=>{
            let t = this.titleCase
            let u = udets[0]
            this.Privacy_Copy = u.Privacy
            console.log(this.Privacy_Copy)
            for(let i = 0; i<6; i++){
              if(u.Privacy[i] == '1'){
                this.Privacy[i] = true
              }else{
                this.Privacy[i] = false
              }
            }
            this.UserDetails.User_ID = id
            this.UserDetails.Name = `${t.transform(u.Firstname)} ${t.transform(u.Middlename).slice(0,1)} ${t.transform(u.Lastname)}`
            this.UserDetails.Birthdate = u.Birthdate
            this.UserDetails.Email = u.Email
            this.UserDetails.Contact_Number = u.Contact_Number
            this.UserDetails.Address = u.Address
            this.loadProfileImage()
            console.log(this.UserDetails)
            this.loadProfile()
            // let t = this.titleCase
            // this.UserDetails.CompleteName = `${t.transform(this.UserDetails.Firstname)} ${t.transform(this.UserDetails.Middlename.slice(0,1))} ${t.transform(this.UserDetails.Lastname)}`
          })
        }else{
          this.router.navigate([''])
        }
        
      })
      
    })
  }


}
