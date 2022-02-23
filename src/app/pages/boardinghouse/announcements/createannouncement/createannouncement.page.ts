import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { AnnouncementDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-createannouncement',
  templateUrl: './createannouncement.page.html',
  styleUrls: ['./createannouncement.page.scss'],
})
export class CreateannouncementPage implements OnInit {


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
  postAnnouncement(){
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
  constructor(
    public modalCtrl: ModalController,
    public toastController: ToastController,
    private dbapi : DbapiService,
    private storage : Storage,
    private datePipe : DatePipe
  ) { }

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
