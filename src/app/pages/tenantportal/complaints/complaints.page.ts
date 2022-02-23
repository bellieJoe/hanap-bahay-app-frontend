import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { TpmenuPage } from '../tpmenu/tpmenu.page';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage : Storage,
    private dbapi : DbapiService,
    private userservice : UserserviceService,
    private datePipe : DatePipe,
    private titleCase : TitleCasePipe
  ) { }

  complaintsInput : string
  User_ID : number
  RRP_ID : number
  BH_Name : string
  yourName : string
  yourCompleteName : string
  Owner_ID : number

  
  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TpmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {

  }

  submitComplaint(){
    let thisDay = new Date()
    let today = this.datePipe.transform(thisDay, "yyyy-MM-dd")
    if(this.complaintsInput != "" && this.complaintsInput && this.complaintsInput.trim() != ""){
      console.log(this.complaintsInput)
      this.dbapi.addComplain(this.User_ID,this.RRP_ID,today,this.complaintsInput.trim()).subscribe(()=>{
        this.dbapi.addNotification(this.Owner_ID, this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss"), "New Complaint", `${this.yourCompleteName} submitted a new complaint to ${this.BH_Name}`, null, this.RRP_ID).subscribe()
        this.presentToast("Your complaint was submitted").then(()=>{
          this.complaintsInput = ""
        })
      })
    }else{
      this.presentAlert("Please fill up the input", "Alert")
    }
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      this.User_ID = uid
      this.userservice.isAuth(uid)
      this.dbapi.getUserDetails_id(uid).subscribe(udets=>{
        this.yourName = this.titleCase.transform(`${udets[0].Firstname}`)
        this.yourCompleteName = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Lastname)}`
      })
      this.dbapi.getTenantDetails(uid).subscribe(tdets=>{
        this.RRP_ID = tdets.RRP_ID
        this.dbapi.getRHDetails_rrpid(this.RRP_ID).subscribe(dets=>{
          this.BH_Name = dets.RRP_Name
          this.Owner_ID = dets.Owner_ID
        })
      })
    })
    this.storage.get("User_Type").then(type=>{
      this.userservice.isTenant(type)
    })
  }


}
