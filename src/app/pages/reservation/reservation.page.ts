import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { scheduled } from 'rxjs';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { deflateSync } from 'zlib';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage {

  constructor(
    private dbapi : DbapiService,
    private storage : Storage,
    private router : Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private navCtrl : NavController,
    private route : ActivatedRoute,
    private datePipe : DatePipe
  ) { }

  ReservationDets : any
  User_ID : number
  // RRP_ID : number
  segmentValue : string = "all"
  badge_values : any = {
    all : 0,
    pending : 0,
    approved : 0,
    declined : 0,
    canceled : 0
  }

  setBadgeValue(){
    this.badge_values.all = this.ReservationDets.length
    this.badge_values.pending = 0
    this.badge_values.approved = 0
    this.badge_values.declined = 0
    this.badge_values.canceled = 0
    this.ReservationDets.map((val, i)=>{
      if(val.Status == "approved"){
        this.badge_values.approved++
      }else if(val.Status == "pending"){
        this.badge_values.pending++
      }else if(val.Status == "declined"){
        this.badge_values.declined++
      }else if(val.Status == "canceled"){
        this.badge_values.canceled++
      }
    })
  }

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertDel() {
    let choice : string
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Warning",
      message: "Are you sure you want to cancel this reservation?",
      // mode: "ios",
      animated: true,
      buttons: [
        {
          text: 'No',
          handler: () => {
            choice = "cancel"

          }
        }, {
          text: 'Yes',
          handler: () => {
            choice = "okay"
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
    if(choice === "okay"){
      // console.log("ge delete mo haha")
      return true
      
    }else if(choice === "cancel"){
      // console.log("joke lang hehe")
      return false
    }else{

    }
  }

  view(a:number, id : number){
    // this.storage.set("resid", a).then(()=>{
    //   this.router.navigate(['/reservation/resview'])
    // })
    this.router.navigate(['/reservation/resview'], {queryParams: {
      reid : a
    }})

  }

  async presentAlert(con:string, head: string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async cancel(a:number) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to cancel this Reservation?',
      buttons: [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: ()=>{
            this.dbapi.cancelReservertion(a).subscribe(()=>{
              this.presentToast("Reservation was successfully cancelled")
              this.getReservations()
            })
          }
        }
        
      ]
    });
  
    await alert.present();
  }

  filter(a:string){
    this.segmentValue = a
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
            this.ReservationDets.map((val,i)=>{
              if(this.ReservationDets[i].Reservation_ID == a){
                if(this.ReservationDets[i].Status == 'approved'){
                  let today = new Date()
                  let ds = new Date()
                  let dateSched  = this.ReservationDets[i].Date_Scheduled
                  ds.setFullYear(parseInt(this.datePipe.transform(dateSched, "yyyy")), parseInt(this.datePipe.transform(dateSched, "MM"))-1, parseInt(this.datePipe.transform(dateSched, "dd")))
                  ds.setHours(parseInt(this.datePipe.transform(dateSched, "HH")), parseInt(this.datePipe.transform(dateSched, "mm")), parseInt(this.datePipe.transform(dateSched, "ss")))
                 
                  if(ds.valueOf() > today.valueOf()){
                    this.presentAlert("Oops! You cannot delete or cancel this reservation until the meeting has been accomplished", "Alert")
                  }else{
                    this.dbapi.deleteReservation(a, this.User_ID).subscribe(()=>{
                      this.getReservations()
                      this.presentToast("A Reservation was deleted")
                    })
                  }
                }else{
                  this.dbapi.deleteReservation(a, this.User_ID).subscribe(()=>{
                    this.getReservations()
                    this.presentToast("A Reservation was deleted")
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

  completeDetails(){
    this.ReservationDets.map((val, i)=>{
      this.dbapi.getRHDetails_rrpid(val.RRP_ID).subscribe((rhdets)=>{
        if (!rhdets) {
          this.ReservationDets[i].error = "This Property might be close or shutdown by the owner"
        } else {
          this.ReservationDets[i].RRP_Name = rhdets.RRP_Name
          if(rhdets.RRP_Type == "house for rent"){
            this.ReservationDets[i].unit = "house/s"
          }else if(rhdets.RRP_Type == "room for rent"){
            this.ReservationDets[i].unit = "room/s"
          }else if(rhdets.RRP_Type == "bed space"){
            this.ReservationDets[i].unit = "person/s"
          }else if(rhdets.RRP_Type == "male bed space"){
            this.ReservationDets[i].unit = "person/s"
          }else if(rhdets.RRP_Type == "female bed space"){
            this.ReservationDets[i].unit = "person/s"
          }
        }
      })
    })
  }

  getReservations(){
    this.dbapi.getReservations_uid(this.User_ID).subscribe(reservations=>{
      if(reservations.length == 0){
        this.ReservationDets = null
      }else{
        this.ReservationDets = reservations
        this.setBadgeValue()
        this.completeDetails()
      }
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then((uid)=>{
      this.User_ID = uid
      this.storage.get("User_Type").then(utype=>{
        if(uid && utype == "tenant"){
          this.getReservations()
        }else{
          this.router.navigate([''])
        }
      })
      
    })
  }

}
