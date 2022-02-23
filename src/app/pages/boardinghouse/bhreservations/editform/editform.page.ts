import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { ReservationDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.page.html',
  styleUrls: ['./editform.page.scss'],
})
export class EditformPage {

  constructor(
    private modalController: ModalController,
    private router : Router,
    private dbapi : DbapiService,
    private alertController: AlertController,
    private datePipe : DatePipe,
    private toastController: ToastController,
    private storage : Storage
  ) { }

  @Input('') reid : number
  Reservation_Details : ReservationDetails = {
    Reservation_ID: null,
    User_ID : null,
    RRP_ID :null,
    Date_Reserve : null,
    Expiry_Date : null,
    Reservation : null,
    Status : null,
    Is_New : null,
    Date_Scheduled : null,
    Confirmation_Note : null,
    Delete_From : null
  }
  meet_date : string
  meet_time : string
  RRP_Name : string

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
  dismiss(status:boolean){
    this.modalController.dismiss({
      "dismissed" : status
    })
  }
  validateInputs(){
    console.log(this.meet_date, this.meet_time)
    if(this.meet_date != undefined  && this.meet_time != undefined){
      return true
    }else{
      this.presentAlert("Please complete the inputs above", "Alert")
      return false
    }
  }

  update(){
    let datetime = `${this.meet_date} ${this.meet_time}:00`
    let today = `${this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")}`

      if(this.validateInputs()){
        this.dbapi.updateReservation(this.reid, datetime, this.Reservation_Details.Confirmation_Note, today).subscribe(()=>{
          
          this.dbapi.addNotification(this.Reservation_Details.User_ID,today,"Reservation",`Your reservation from ${this.RRP_Name} has been changed`,"none",this.reid).subscribe(()=>{
            this.dismiss(true)
            this.presentToast("Reservation was successfully updated")
          })
        })
      }
  }


  ionViewDidEnter(){
    console.log(window.location.pathname)
    this.storage.get("RRP_Name").then(name =>{
      this.RRP_Name = name
    })
    if(window.location.pathname == "/boardinghouse/bhreservations"){
      this.dbapi.getReservationDetails_reid(this.reid).subscribe(dets=>{
        this.Reservation_Details = dets
        this.meet_date = this.Reservation_Details.Date_Scheduled.slice(0,10)
        this.meet_time = this.Reservation_Details.Date_Scheduled.slice(11, 20)
        if(this.Reservation_Details.Confirmation_Note == "undefined"){
          this.Reservation_Details.Confirmation_Note = ""
        }
        
      })
    }else{
      this.router.navigate([''])
    }
  }

}
