import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }


  res = "/reservation"
  NotifDetails : any 
  User_ID : number
  User_Type : string


  ngOnInit() {
  }
  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(con:string, head: string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  markRead(notif_id : number){

    this.dbapi.markReadNotif(notif_id).subscribe(()=>{
      this.NotifDetails.map((val,i)=>{
        if(this.NotifDetails[i].Notification_ID == notif_id){
          this.NotifDetails[i].Is_Read = 1
          if(this.NotifDetails[i].Type == "Reservation" && this.User_Type == "property owner"){
            this.router.navigate(['/boardinghouse/bhreservations'],{queryParams: {rrpid:this.NotifDetails[i].Extra_ID}})
          }else if(this.NotifDetails[i].Type == "Reservation" && this.User_Type == "tenant"){
            this.router.navigate(["/reservation/resview"], {
              queryParams: {reid: this.NotifDetails[i].Extra_ID}
            })
          }else if(this.NotifDetails[i].Type == "New Tenant"){
            this.dbapi.getTenantDetails(this.User_ID).subscribe(tdets=>{
              if(tdets){
                this.router.navigate(["/tpmembers"])
              }else{
                this.presentAlert("You are not a member of this Rental House.", "Rental House Notice")
              }
            })
          }else if(this.NotifDetails[i].Type == "Rental House Contact"){
            this.dbapi.getUserDetails_id(this.User_ID).subscribe(dets=>{
              if(dets[0].Is_Boarded == 1){
                this.router.navigate(["/rhcontacts"])
              }else{
                this.presentToast("You are do not rent a Rental House right now")
              }
            })
          }else if(this.NotifDetails[i].Type == "Rental House Payment"){
            this.dbapi.getUserDetails_id(this.User_ID).subscribe(dets=>{
              if(dets[0].Is_Boarded == 1){
                this.router.navigate(["/paymenthistory"])
              }else{
                this.presentToast("You are do not rent a Rental House right now")
              }
            })
          }else if(this.NotifDetails[i].Type == "New Complaint"){
            this.storage.set("RRP_ID", this.NotifDetails[i].Extra_ID).then(()=>{
              this.router.navigate(["/boardinghouse/tcomplaints"])
            })

          }else if(this.NotifDetails[i].Type == "Rental House Announcement"){
            this.dbapi.getUserDetails_id(this.User_ID).subscribe(dets=>{
              if(dets[0].Is_Boarded == 1){
                this.router.navigate(["/tenantannouncement"])
              }else{
                this.presentToast("You are do not rent a Rental House right now")
              }
            })
          }
          

        }
      })
    })
  }
  delete(notif_ID : number){
    this.dbapi.deleteNotification(notif_ID).subscribe(()=>{
      this.presentToast("Notification was successfully deleted")
      this.dbapi.getNotifications_uid(this.User_ID).subscribe(results=>{
        if(results.length == 0){
          this.NotifDetails = null
        }else{
          this.NotifDetails = results
        }
      })
    })
  }

  loadNotif(){
    this.dbapi.getNotifications_uid(this.User_ID).subscribe((results)=>{
      if(results.length == 0){
        this.NotifDetails = null
      }else{
        this.NotifDetails = results
      }
      // console.log(this.NotifDetails)
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then((uid)=>{
      if(uid){
        this.storage.get("User_Type").then(type=>{
          this.User_Type = type
        })
        this.User_ID = uid
        this.loadNotif()
        setInterval(()=>{
          if(this.router.url == "/notification"){
            this.loadNotif()
          }
        }, 3000)
        
      }else{
        this.router.navigate([''])
      }
    })
  }

}
