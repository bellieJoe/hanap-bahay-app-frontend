import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { parse } from 'path';
import { stringify } from 'querystring';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RatingsDetails, RentalHouseDetails } from 'src/app/providers/policy';
import { ImguploaderPage } from '../../imguploader/imguploader.page';
import { BhmenuPage } from '../bhmenu/bhmenu.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

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
  RH_Ratings : RatingsDetails[]
  RH_Rating_Fake :any  = []
  Rating_Summary :any  = [
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
  url_image = `${this.dbapi.SERVER}/images/rh_extra_image/`

  bhImg = []
  profile_img : any = null

  stars = [
    {value: 1, icon: 'star-outline'},
    {value: 2, icon: 'star-outline'},
    {value: 3, icon: 'star-outline'},
    {value: 4, icon: 'star-outline'},
    {value: 5, icon: 'star-outline'}
  ]
  yourRating: any
  

  //methods
  constructor(
    public toastController: ToastController,
    private popoverController: PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: con,
      message: head,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async upload() {
    const modal = await this.modalCtrl.create({
    component: ImguploaderPage,
    componentProps: { "upload_type": "bh-image", "bh_id" : this.RH_Details.RRP_ID }
    });
  
    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.success){
        this.fetchImages()
      }
    })
  
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
  }

  sendRate(){
    this.presentToast('You have rated ' + this.yourRating +  ' to this boarding house');
  }

  addToCheckList(){
    this.presentToast('Boarding House Added to your Checklist');
  }

  sendReview(){
    this.presentToast('Your review was sent')
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BhmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  
  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

  async uploadProf() {
    const modal = await this.modalCtrl.create({
    component: ImguploaderPage,
    componentProps: { "upload_type": "bh-profile", "bh_id" : this.RH_Details.RRP_ID }
    });
  
    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.success){
        if(this.profile_img){
          this.profile_img = `${this.profile_img}?` + new Date().getTime()
        }else{
          this.loadProfilePic()
        }
      }
    })
  
  }

  fetchImages(){
    this.storage.get("RRP_ID").then(rrpid=>{
      this.dbapi.fetchImages_rrpid(rrpid).subscribe(images =>{
        if(images.length == 0){
          this.bhImg = null
        }else{
          this.bhImg = images
          this.bhImg.map((val, i)=>{
            this.bhImg[i].url = `${this.url_image}${this.bhImg[i].IMG_Filename}.png?` + new Date().getTime()
          })
        }
      })
    })
  }

  loadProfilePic(){
    this.storage.get("RRP_ID").then(rrpid=>{
      this.dbapi.fetchImage(rrpid,"bh-profile").subscribe(image=>{
        // console.log(image)
        if(image == null){
          this.profile_img = null
        }else{
          this.profile_img = `http://192.168.43.65/HanapBahay/images/profile/${image.IMG_Filename}.png`
        }
      })
    })
  }

  deletePhoto(id:number, filename : string){
    let load = this.loadingController.create({
      spinner: "bubbles",
      message: "Deleting Image"
    })
    load.then(res=>{
      res.present()
      this.dbapi.deleteImage(id, filename).subscribe(status=>{
        if(status == "OK"){
          res.dismiss()
          this.presentToast("An Image was deleted")
          this.fetchImages()
        }else{
          res.dismiss()
          this.presentAlert("Error occured while deleting the Image", "Error")
        }
      })
    })
  }

  setIcon(){
    if(this.RH_Details.RRP_Type == "house for rent"){
      this.RH_Details.Icon = "house"
    }else if(this.RH_Details.RRP_Type == "room for rent"){
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
  show(){
    if(this.showicon == "chevron-down"){
      this.showicon = "chevron-up"
    }else{
      this.showicon = "chevron-down"
    }
  }


  ionViewDidEnter(){
    this.storage.get("User_ID").then((val)=>{
      if(val != null){
        this.storage.get("RRP_ID").then((val1)=>{
          this.RH_Details.RRP_ID = val1
          this.fetchImages()
          this.loadProfilePic()

          this.dbapi.getRHDetails_rrpid(val1).subscribe((res:RentalHouseDetails)=>{
            this.RH_Details = res
            this.setIcon()
            this.dbapi.getUserDetails_id(val).subscribe((dets)=>{
              this.RH_Owner_Name =  dets[0].Firstname + " " + dets[0].Middlename.slice(0,1) + ". " +dets[0].Lastname
            })
            this.dbapi.computeAvailability_rrpid(val1).subscribe((result)=>{
              this.RH_Availability = result
            })
          })
          this.clearRates()
          this.dbapi.getRatings_rrpid(val1).subscribe((ratings : RatingsDetails[])=>{
            this.RH_Ratings = ratings
            // console.log(this.RH_Ratings)
            if(this.RH_Ratings.length == 0){
              this.RH_Ratings = null
            }else{
              if(ratings.length > 3){
                for(let a=0;a<=2;a++){
                  this.RH_Rating_Fake[a] = ratings[a]
                }
              }else{
                this.RH_Rating_Fake = ratings
              }
              
              for(let i of this.RH_Ratings){
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

            }
            
          })
        })
      }else{
        this.router.navigate([''])
      }
    })
    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })
  }

}
