import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-approvresform',
  templateUrl: './approvresform.page.html',
  styleUrls: ['./approvresform.page.scss'],
})
export class ApprovresformPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private datePipe : DatePipe,
    private dbapi : DbapiService,
    private toastController: ToastController,
    private storage : Storage,
  ) { }

  meet_date : string
  meet_time : string
  meet_note : string
  RRP_Name : string
  @Input('') reid : number

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

  dismiss(status :boolean) {
    this.modalController.dismiss({
      'dismissed': status
    });
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

  confirm(){
    let datetime = `${this.meet_date} ${this.meet_time}:00`
    let today = `${this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")}`
    // console.log(":today ", today )
    if(this.validateInputs()){
      this.dbapi.confirmReservation(this.reid, datetime, this.meet_note, today).subscribe(()=>{
        this.dbapi.getReservationDetails_reid(this.reid).subscribe(redets=>{
          this.dbapi.addNotification(redets.User_ID,today,"Reservation",`Your Reservation from ${this.RRP_Name} has been approved`,"none",this.reid).subscribe(()=>{
           this.dismiss(true)
           this.presentToast("A reservation was approved by you")
          })
        })
      })
    }
  }

  async approve() {
    const alert = await this.alertController.create({
      header: 'Approve Reservation',
      message: 'Are you sure you want to cancel meet-up process? Continuing this will approved the reservation and skip the meet-up process',
      buttons: [
        {
          text : "Cancel"
        },
        {
          text : "Yes",
          handler: ()=>{
            this.dbapi.confirmReservation(this.reid, null, null, this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")).subscribe(()=>{
              this.dbapi.getReservationDetails_reid(this.reid).subscribe(redets=>{
                this.dbapi.addNotification(redets.User_ID,this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss"),"Reservation",`Your Reservation from ${this.RRP_Name} has been approved`,"none",this.reid).subscribe(()=>{
                 this.dismiss(true)
                 this.presentToast("A reservation was approved by you")
                })
              })
              this.presentToast("A reservation was approved")
            }, err=>{
              this.presentAlert("Unexpected error occured", "Error")
            })
          }
        }
      ]
    });
  
    await alert.present();
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get("RRP_Name").then(name=>{
      this.RRP_Name = name
    })
  }

}
