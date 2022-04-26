import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, ModalController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RatingsDetails, RentalHouseDetails } from 'src/app/providers/policy';
import { BhreservePage } from '../../bhprofileview/bhreserve/bhreserve.page';
import { BhmenuPage } from '../../boardinghouse/bhmenu/bhmenu.page';
import { TpmenuPage } from '../tpmenu/tpmenu.page';

@Component({
  selector: 'app-rhprofile',
  templateUrl: './rhprofile.page.html',
  styleUrls: ['./rhprofile.page.scss'],
})
export class RhprofilePage {
 
  profile_img: any =  null

  constructor(
    public toastController: ToastController,
    private popoverController: PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private datePipe : DatePipe,
    private modalController : ModalController,
    private callNumber : CallNumber,
    private clipboard: Clipboard,
    private platform : Platform,
    private alertController : AlertController
  ) { }

  // boarding house details
  BH_Name : string
  RH_Details : any = {
    RRP_ID : null,
    RRP_Name : null,
    RRP_Description : null,
    RRP_Capacity : null,
    RRP_Type : null,
    RRP_Address : null,
    RRP_Rent_Rate : null,
    RRP_X_Coordinates : null,
    RRP_Y_Coordinates : null,
    Owner_ID : null,
    Contact_Number : null,
    Icon : null
  }
  RH_Owner_Name:string
  RH_Availability  : number
  yourRating: any
  modalCtrl: any;
  yourReview : string
  userType : string
  RH_Ratings : any = []
  RH_Rating_Fake  = []
  Rating_Summary = [
    {name : '5' , value : 0, noRated : 0},
    {name : '4' , value : 0, noRated : 0},
    {name : '3' , value : 0, noRated : 0},
    {name : '2' , value : 0, noRated : 0},
    {name : '1' , value : 0, noRated : 0},
  ]
  Rating_Temp = [
    {name : '5' , value : 0},
    {name : '4' , value : 0},
    {name : '3' , value : 0},
    {name : '2' , value : 0},
    {name : '1' , value : 0},
  ]
  Rating_Counter : number = 0
  Average_Rating : number = 0 
  User_ID : number

  bhImg = []

  stars = [
    {value: 1, icon: 'star-outline'},
    {value: 2, icon: 'star-outline'},
    {value: 3, icon: 'star-outline'},
    {value: 4, icon: 'star-outline'},
    {value: 5, icon: 'star-outline'}
  ]
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TpmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  rate(a){
    this.yourRating = a
    for(let i = 4; i >= 0; i--){
      if(i < a){
        this.stars[i].icon = 'star'
      }
      else{
        this.stars[i].icon = 'star-outline'
      }
    }  
  }

  clearRates(){
    this.RH_Ratings = [null]
    this.Rating_Summary[0].noRated = 0
    this.Rating_Summary[0].value = 0
    this.Rating_Summary[1].noRated = 0
    this.Rating_Summary[1].value = 0
    this.Rating_Summary[2].noRated = 0
    this.Rating_Summary[2].value = 0
    this.Rating_Summary[3].noRated = 0
    this.Rating_Summary[3].value = 0
    this.Rating_Summary[4].noRated = 0
    this.Rating_Summary[4].value = 0
    this.Rating_Temp[0].value = 0
    this.Rating_Temp[1].value = 0
    this.Rating_Temp[2].value = 0
    this.Rating_Temp[3].value = 0
    this.Rating_Temp[4].value = 0
    this.Rating_Counter  = 0
    this.Average_Rating  = 0 
    this.yourReview = ""
    for(let i = 4; i >= 0; i--){
      this.stars[i].icon = 'star-outline'
    }  
  }

  sendRate(){
    let dateToday : string
    var todays = new Date()
    dateToday = this.datePipe.transform(todays, "yyyy/MM/dd")
    this.storage.get("User_ID").then((tid)=>{
      this.dbapi.addRating(tid,this.RH_Details.RRP_ID,this.yourRating,dateToday).subscribe(()=>{
        this.loadRates(this.RH_Details.RRP_ID)
        this.presentToast('You have rated ' + this.yourRating +  ' to this boarding house');
        this.clearRates()
      })
    })
    
  }

  async loadRates(rrpid:number){
    this.Rating_Counter = 0
    this.Rating_Temp.map((val,i)=>{
      this.Rating_Temp[i].value = 0
    })
    this.yourRating = 0
    this.clearRates()

    await this.dbapi.getRatings_rrpid(rrpid).subscribe((ratings : RatingsDetails[])=>{
      this.RH_Ratings = ratings
      console.log(this.RH_Ratings)
      this.checkIfHasRated()
      if(ratings.length > 3){   // setting the initial reviews
        for(let a=0;a<=2;a++){
          this.RH_Rating_Fake[a] = ratings[a]
        }
        console.log("len > 3")
      }else{
        console.log("len < 3")
        this.RH_Rating_Fake = []
        ratings.map((val,i)=>{
          if(val.User_ID !=  this.User_ID){
            this.RH_Rating_Fake.push(val)
          }
        })
      }
      
      for(let i of this.RH_Ratings){ // computes the average rating i guess
        this.Rating_Counter++
        for(let o of this.Rating_Temp){
          if(o.name === i.Rating_Value.toString()){
            this.Rating_Temp[5 - i.Rating_Value].value++
            
          }
        }
      }

      this.Average_Rating = this.Average_Rating/this.Rating_Counter

      for(let i of this.Rating_Temp){
        for(let a = 5; a>=1 ;a--){
          if(i.name === a.toString()){
            this.Rating_Summary[5-a].value =  i.value/this.Rating_Counter
            this.Rating_Summary[5-a].noRated = i.value
          }
        }
      }
      for(let i of this.RH_Ratings){
        this.Average_Rating += parseInt(i.Rating_Value.toString())
      }
      this.Average_Rating /= this.Rating_Counter
    })
    // this.checkIfHasRated()

  }

  sendReview(){
    let dateToday : string
    var todays = new Date()
    dateToday = this.datePipe.transform(todays, "yyyy/MM/dd")
    this.storage.get("User_ID").then((tid)=>{
      this.dbapi.addReview(tid,this.RH_Details.RRP_ID,this.yourReview,dateToday).subscribe(()=>{
        this.loadRates(this.RH_Details.RRP_ID)
        this.presentToast('Your review was sent')
        this.clearRates()
      })
    })
    
  }

  async presentAlert(con:string, head: string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  inMobile : boolean = true
  checkPlatform(){
    // console.log(this.platform.platforms())
    if(!this.platform.is("mobileweb") && !this.platform.is("desktop")){
      this.inMobile = true
    }else{
      this.inMobile = false
    }
  }

  call(){
    this.callNumber.callNumber(this.RH_Details.Contact_Number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => alert( err) );
  }

  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

  url_image = `${this.dbapi.SERVER}/images/rh_extra_image/`
  fetchImages(){
    this.dbapi.fetchImages_rrpid(this.RH_Details.RRP_ID).subscribe(images =>{
      if(images.length == 0){
        this.bhImg = null
      }else{
        this.bhImg = images
        this.bhImg.map((val, i)=>{
          this.bhImg[i].url = `${this.url_image}${this.bhImg[i].IMG_Filename}.png?` + new Date().getTime()
        })
      }
    })
  }

  loadProfilePic(){
    this.storage.get("r_to_vst").then(rrpid=>{
      this.dbapi.fetchImage(rrpid,"bh-profile").subscribe(image=>{
        // console.log(image)
        if(image == null){
          this.profile_img = null
        }else{
          this.profile_img = `${this.dbapi.SERVER_NAME}/images/profile/${image.IMG_Filename}.png?` + new Date().getTime()
        }
      })
    })
  }

  setIcon(){
    if(this.RH_Details.RRP_Type == "house for rent" || this.RH_Details.RRP_Type == "room for rent"){
      this.RH_Details.Icon = "house"
    }else if(this.RH_Details.RRP_Type == "bed space"){
      this.RH_Details.Icon = "bed"
    }else if(this.RH_Details.RRP_Type == "female bed space"){
      this.RH_Details.Icon = "woman"
    }else if(this.RH_Details.RRP_Type == "male bed space"){
      this.RH_Details.Icon = "man"
    }
  }

  showicon : string = "chevron-down"
  showDes(){
    if(this.showicon == "chevron-down"){
      this.showicon = "chevron-up"
    }else{
      this.showicon = "chevron-down"
    }
  }

  alreadyRated : boolean = false
  prevRating : number
  checkIfHasRated(){
    this.RH_Ratings.map((val, i)=>{
      if(this.RH_Ratings[i].User_ID == this.User_ID){
        this.yourReview = val.Review_Content
        this.rate(val.Rating_Value)
        this.prevRating = val.Rating_Value
        this.alreadyRated = true
      }
    })
  }

  gotoReviews(){
    this.storage.set("r_to_vst", this.RH_Details.RRP_ID).then(()=>{

    })
  }

  ionViewDidEnter(){
    this.checkPlatform()
    this.storage.get("User_Type").then((utype)=>{
      this.userType = utype
    })
    
    this.storage.get("User_ID").then((val)=>{
      if(val){//check if legit user
        this.User_ID = val
        this.dbapi.getTenantDetails(val).subscribe(tdets=>{
          this.RH_Details.RRP_ID = tdets.RRP_ID
          if(tdets.RRP_ID != null){//ckeck if basta ganun
            this.dbapi.getRHDetails_rrpid(tdets.RRP_ID).subscribe((res:RentalHouseDetails)=>{
              this.RH_Details = res
              this.setIcon()
              this.fetchImages()
              this.loadProfilePic()
              this.dbapi.getUserDetails_id(res.Owner_ID).subscribe((dets)=>{
                this.RH_Owner_Name =  dets[0].Firstname + " " + dets[0].Middlename.slice(0,1) + ". " +dets[0].Lastname
              })
              this.dbapi.computeAvailability_rrpid(tdets.RRP_ID).subscribe((result)=>{
                this.RH_Availability = result
              })
            })
            this.loadRates(tdets.RRP_ID)
          }
        })

      }else{
        this.router.navigate([''])
      }
    })

  }


}
