import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { AnnouncementDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-createannouncement',
  templateUrl: './createannouncement.page.html',
  styleUrls: ['./createannouncement.page.scss'],
})
export class CreateannouncementPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public toastController: ToastController,
    private dbapi : DbapiService,
    private storage : Storage,
    private datePipe : DatePipe,
    private loader: LoadingController
  ) { }


  announcementDets : AnnouncementDetails = {
    Announcement_ID : null,
    Announcement_Title : null,
    Date_Created : null,
    Announcement_Content : null,
    RRP_ID : null,
    Announcement_Tag : null,
    Time_Created : null,
    Date_Time : null
  }
  RHName : string
  close(){
    this.dismiss()
  }

  async postAnnouncement(){
    const loader = await this.loader.create({
      spinner: "lines",
      message: "Posting Announcement",
      mode: "ios"
    })

    try {
      await loader.present()

      const RRP_ID = await this.storage.get("RRP_ID")

      let today = new Date()
      this.announcementDets.RRP_ID = RRP_ID
      this.announcementDets.Date_Created = this.datePipe.transform(today, "yyyy/MM/dd")
      this.announcementDets.Time_Created = this.datePipe.transform(today.getTime(), "hh:mm:ss")
      this.announcementDets.Date_Time = this.datePipe.transform(today.getTime(), "yyyy:MM:dd:HH:mm:ss")

      await new Promise((resolve, reject) => {
        this.dbapi.getRHDetails_rrpid(RRP_ID).subscribe(rdet=>{
          this.RHName = rdet.RRP_Name
          resolve(null)
        })
      })

      await new Promise((resolve, reject) => {
        this.dbapi.createAnnouncement_rrpid(this.announcementDets).subscribe(()=>{
          resolve(null)
        })
      })

      await new Promise((resolve, reject) => {
        this.dbapi.getTenantList_rrpid(RRP_ID).subscribe((dets)=>{
          dets.map(
            async (vale, i)=>{
              await new Promise((resolve, reject) => {
                this.dbapi.addNotification(vale.User_ID,this.datePipe.transform(today, "yyyy-MM-dd HH:mm:ss"),"Rental House Announcement", `${this.RHName} has new announcement`, "", null).subscribe(()=>{
                  resolve(null)
                })
              })
            }
          )
          resolve(null)
        })
      })

      
      await this.presentToast("You have created a new Announcement")
      await loader.dismiss()
      this.dismiss()

    } catch (error) {
      await loader.dismiss()
    }
    


    this.storage.get("RRP_ID").then((val)=>{
      let today = new Date()
      this.announcementDets.RRP_ID = val
      this.announcementDets.Date_Created = this.datePipe.transform(today, "yyyy/MM/dd")
      this.announcementDets.Time_Created = this.datePipe.transform(today.getTime(), "hh:mm:ss")
      this.announcementDets.Date_Time = this.datePipe.transform(today.getTime(), "yyyy:MM:dd:HH:mm:ss")
      // console.log(this.announcementDets)
      this.dbapi.getRHDetails_rrpid(val).subscribe(rdet=>{
        this.RHName = rdet.RRP_Name
      })
      this.dbapi.createAnnouncement_rrpid(this.announcementDets).subscribe(()=>{

        // add notification here
        // this.dbapi.addNotification()
        this.dbapi.getTenantList_rrpid(val).subscribe(dets=>{
          dets.map((vale, i)=>{
            this.dbapi.addNotification(vale.User_ID,this.datePipe.transform(today, "yyyy-MM-dd HH:mm:ss"),"Rental House Announcement", `${this.RHName} has new announcement`, "", null).subscribe()
          })
        })
        this.presentToast("You have created a new Announcement")
        this.dismiss()
      })
    })
  }
  

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }
  

  ngOnInit() {
  }

}
