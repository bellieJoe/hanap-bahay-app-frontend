import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Handle } from 'ngx-img-cropper';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { ApprovresformPage } from './approvresform/approvresform.page';
import { EditformPage } from './editform/editform.page';
// import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

@Component({
  selector: 'app-bhreservations',
  templateUrl: './bhreservations.page.html',
  styleUrls: ['./bhreservations.page.scss'],
})
export class BhreservationsPage {
  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private titlecase : TitleCasePipe,
    private alertController: AlertController,
    private datePipe : DatePipe,
    private toastController: ToastController,
    private ActivatedRoute : ActivatedRoute
  ) { }

  BH_Name : string
  User_ID : string
  Reservations = []
  RRP_ID : number
  segmentValue = "all"
  badge_values = {
    all : 0,
    pending : 0,
    approved : 0,
    declined : 0,
    canceled : 0
  }

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  filter(val : string){
    this.segmentValue = val
  }

  setBadges(){
    this.badge_values.pending = 0
    this.badge_values.approved = 0
    this.badge_values.declined =0
    this.badge_values.canceled =0
    this.badge_values.all = this.Reservations.length 
    this.Reservations.map((val,i)=>{
      if(this.Reservations[i].Status == "pending"){
        this.badge_values.pending++
      }else if(this.Reservations[i].Status == "approved"){
        this.badge_values.approved++
      }else if(this.Reservations[i].Status == "declined"){
        this.badge_values.declined++
      }else if(this.Reservations[i].Status == "canceled"){
        this.badge_values.canceled++
      }
    })
  }

  async decline(reid : number) {
    let today = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to decline this reservation?',
      buttons: [
        {
          text : "Cancel",
          handler: ()=>{
            // console.log("cancel")
          }
        },
        {
          text : "Yes",
          handler: ()=>{
            this.dbapi.declineReservation(reid, today).subscribe(()=>{
              this.presentToast("A reservation was declined")
              this.dbapi.getReservations_rrpid(this.RRP_ID).subscribe((details)=>{
                this.Reservations = details
                this.completeDetails()
                this.setBadges()
              })
            })
          }
        }
      ]
    });
  
    await alert.present();
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

  async showApprovresForm(reid) {
    const modal = await this.modalController.create({
    component: ApprovresformPage,
    componentProps: {"reid" : reid}
    });
    await modal.present();
    await modal.onDidDismiss().then(data=>{
      if(data.data.dismissed){
        this.storage.get("RRP_ID").then(rrpid=>{
          this.dbapi.getReservations_rrpid(rrpid).subscribe(details=>{
            this.RRP_ID = rrpid
            this.Reservations = details
            this.completeDetails()
            this.setBadges()
  
          })
        })
      }
    })
  }

  async showEditForm(reid) {
    const modal = await this.modalController.create({
    component: EditformPage,
    componentProps: {"reid" : reid}
    });
    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.dismissed){
        this.dbapi.getReservations_rrpid(this.RRP_ID).subscribe(details=>{
          this.Reservations = details
          this.completeDetails()
          this.setBadges()
        })
      }
    })
  }

  completeDetails(){
    this.Reservations.map((val,i)=>{
      this.dbapi.getUserDetails_id(this.Reservations[i].User_ID).subscribe((udets : any) =>{
        // console.log(udets)
        this.Reservations[i].name = `${this.titlecase.transform(udets[0].Firstname)} ${this.titlecase.transform(udets[0].Middlename.slice(0,1))}. ${this.titlecase.transform(udets[0].Lastname)}`
        if(udets[0].Contact_Number.toString().slice(0,1) == "6"){
          this.Reservations[i].Contact_Number =  `+${udets[0].Contact_Number}`
        }else if(udets[0].Contact_Number.toString().slice(0,1) == "9"){
          this.Reservations[i].Contact_Number =  `0${udets[0].Contact_Number}`
        }else{
          this.Reservations[i].Contact_Number = udets[0].Contact_Number
        }
      })
    })
  }

  isOwner(){
    return new Promise<boolean>(resolve=>{
      this.storage.get("User_ID").then(uid=>{
        this.User_ID = uid
        if(uid){
          this.storage.get("User_Type").then(type=>{
            if(type == "property owner"){
              resolve(true)
            }else{
              resolve(false)
              this.router.navigate([''])
            }
          })
        }else{
          this.router.navigate([''])
        }
      })
    })
  }

  async presentAlert(con:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async delete(a:number) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to delete this Reservation?',
      buttons: [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: ()=>{
            this.Reservations.map((val,i)=>{
              if(this.Reservations[i].Reservation_ID == a){
                if(this.Reservations[i].Status == 'approved'){
                  let today = new Date()
                  let ds = new Date()
                  let dateSched  = this.Reservations[i].Date_Scheduled
                  ds.setFullYear(parseInt(this.datePipe.transform(dateSched, "yyyy")), parseInt(this.datePipe.transform(dateSched, "MM"))-1, parseInt(this.datePipe.transform(dateSched, "dd")))
                  ds.setHours(parseInt(this.datePipe.transform(dateSched, "HH")), parseInt(this.datePipe.transform(dateSched, "mm")), parseInt(this.datePipe.transform(dateSched, "ss")))
                 
                  if(ds.valueOf() > today.valueOf()){
                    this.presentAlert("Oops! You cannot delete or cancel the Approved reservation until the meeting has been accomplished")
                  }else{
                    this.dbapi.deleteReservation(a, this.RRP_ID).subscribe(()=>{
                      this.dbapi.getReservations_rrpid(this.RRP_ID).subscribe(details=>{
                        this.Reservations = details
                        this.completeDetails()
                        this.setBadges()
                        this.presentToast("A Reservation was deleted")
                      })
                    })
                  }
                }else{
                  this.dbapi.deleteReservation(a, this.RRP_ID).subscribe(()=>{
                    this.dbapi.getReservations_rrpid(this.RRP_ID).subscribe(details=>{
                      this.Reservations = details
                      this.completeDetails()
                      this.setBadges()
                      this.presentToast("A Reservation was deleted")
                    })
                  })
                  
                }
              }
            })
            
          }
        }
      ]
    });
  
    await alert.present();
  }

  reveal_icon = "chevron-down"
  reveal(){
    if(this.reveal_icon == "chevron-down"){
      this.reveal_icon = "chevron-up"
    }else if(this.reveal_icon == "chevron-up"){
      this.reveal_icon = "chevron-down"
    }
  }

  getParamData(){
    return new Promise<any>(resolve=>{
      this.ActivatedRoute.queryParams.subscribe(data=>{
        resolve(data.rrpid)
      })
    })
    
  }

  ionViewDidEnter(){
    
    this.isOwner().then(auth=>{
      if(auth){
        this.getParamData().then(rrpid=>{

          if(rrpid){
            this.dbapi.getRHDetails_rrpid(rrpid).subscribe(dets=>{
              this.storage.set("RRP_ID", rrpid)
              this.storage.set("RRP_Name", dets.RRP_Name).then(()=>{
                this.BH_Name = dets.RRP_Name
              })
            })
            this.dbapi.getReservations_rrpid(rrpid).subscribe(details=>{
              this.RRP_ID = rrpid
              this.Reservations = details
              this.completeDetails()
              this.setBadges()
    
            })
          }else{
            this.storage.get("RRP_ID").then(rrpid=>{
              this.dbapi.getReservations_rrpid(rrpid).subscribe(details=>{
                this.RRP_ID = rrpid
                this.Reservations = details
                this.completeDetails()
                this.setBadges()
              })
            })
          }
        })

      }
    })
    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })
    
  }

}
