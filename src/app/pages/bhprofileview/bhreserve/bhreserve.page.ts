import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-bhreserve',
  templateUrl: './bhreserve.page.html',
  styleUrls: ['./bhreserve.page.scss'],
})
export class BhreservePage {
  constructor(
    public modalCtrl: ModalController,
    private dbapi : DbapiService,
    private storage  : Storage,
    private router : Router,
    private datePipe : DatePipe,
    private alertController : AlertController,
    private toastController : ToastController,
    private titleCase : TitleCasePipe
  ) { }

  rrp_name : string
  rrp_unit : string
  amountShit : number
  User_ID : number
 
  close(){
    this.dismiss();
  }
  
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentAlert(con: string , head:string) {
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
  reserve(){
    let dateToday : string
    let todays = new Date()
    dateToday = this.datePipe.transform(todays, "yyyy/MM/dd")
    let datetime : string = this.datePipe.transform(todays, "yyyy/MM/dd hh:mm:ss")
    if(this.amountShit && this.amountShit != 0){
      this.storage.get("User_ID").then((uid)=>{
        this.storage.get("r_to_vst").then((rrpid)=>{
          this.dbapi.reserveRH(rrpid,uid,dateToday,this.amountShit).subscribe(()=>{
            this.dbapi.getRHDetails_rrpid(rrpid).subscribe((dets)=>{
              this.dbapi.getUserDetails_id(this.User_ID).subscribe(udets=>{
                let name = `${udets[0].Firstname} ${udets[0].Lastname}`
                let notif_message = `${dets.RRP_Name} has new Reservation from ${this.titleCase.transform(name)}`
                this.dbapi.addNotification(dets.Owner_ID,datetime,"Reservation",notif_message,`/boardinghouse/bhreservations`,rrpid).subscribe(()=>{
                  this.presentToast("You reservation has been sent to the owner")
                  this.dismiss()
                })

              })
            }) 
          })
        })
      })
    }else{
      this.presentAlert("Please complete the Form", "Alert")
    }
    
  }
 


  ionViewDidEnter(){
    this.storage.get("User_ID").then((uid)=>{
      this.User_ID = uid
      this.storage.get("r_to_vst").then((rrpid)=>{
        if(uid && rrpid){
          this.dbapi.getRHDetails_rrpid(rrpid).subscribe((results)=>{
            this.rrp_name = results.RRP_Name
            if(results.RRP_Type === 'room for rent'){
              this.rrp_unit = 'unit'
            }else if(results.RRP_Type === 'bed space' || results.RRP_Type === 'female bed space' || results.RRP_Type === 'male bed space'){
              this.rrp_unit = 'person'
            }else if(results.RRP_Type === 'house for rent'){
              this.rrp_unit = 'house'
            }else{
              this.rrp_unit = "undefined"
            }
          })
        }else{
          this.router.navigate([''])
        }
      })
    })
  }
  ionViewDidClose(){
    this.storage.remove("r_to_vst").then(()=>{
      console.log("cleared")
    })
  }

}
