import { Component, OnInit, ViewChild } from '@angular/core';
import { toSegments } from '@ionic/angular/directives/navigation/stack-utils';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { CreateannouncementPage } from './createannouncement/createannouncement.page';
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { AnnouncementDetails } from 'src/app/providers/policy';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  @ViewChild('segment') segment : HTMLIonSegmentElement;
  
  BH_Name : string
  announceDets : AnnouncementDetails[]
  announcement_count = 0
  segmentValue = 'all';
  filter(a:any){
   this.segmentValue = a
  }

  createAnnouncement(){
    this.presentModal()
  }

  async deleteAnnouncement(id : number){
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete this announcement?',
      buttons: [
        {
          text: "Cancel",
          
        },
        {
        text : "Yes",
        handler: ()=>{
          this.dbapi.deleteAnnouncement_aid(id).subscribe(()=>{
            this.ionViewDidEnter()
            this.presentToast("Announcement successfully deleted")
          })
        }
      }
      
      ]});

    alert.present()

  }
 

  constructor(
    public modalController: ModalController,
    public popoverController: PopoverController,
    private storage : Storage,
    private dbapi : DbapiService,
    private router : Router,
    private alertController : AlertController,
    private toastController: ToastController

  ) { }
  
  async presentToast(a:string) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }
  async presentAlert(head:string, cont:string) {
    const alert = await this.alertController.create({
      header: head,
      message: cont,
      buttons: ['OK']
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateannouncementPage,
      cssClass: 'modal-announcement'
    });
    await modal.present();
    await modal.onDidDismiss()
    this.ionViewDidEnter()
  }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then((val)=>{
      if(val != null){
        this.storage.get("User_Type").then((res)=>{
          if(res == "property owner"){
            this.storage.get("RRP_ID").then((id)=>{
              this.dbapi.getAnnouncements_rrpid(id).subscribe((details : AnnouncementDetails[])=>{
                this.announceDets = details
                this.announcement_count = this.announceDets.length
              })
            })
            
          }else{
            this.presentAlert("Unauthorized Usage", "You are not auothorized to use this page!")
            this.router.navigate(['/blank'])
          }
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

