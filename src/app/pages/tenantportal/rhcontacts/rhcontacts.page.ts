import { Component, OnInit } from '@angular/core';
// import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { TpmenuPage } from '../tpmenu/tpmenu.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-rhcontacts',
  templateUrl: './rhcontacts.page.html',
  styleUrls: ['./rhcontacts.page.scss'],
})
export class RhcontactsPage implements OnInit {

  

  constructor(
    private popoverController: PopoverController,
    private userservice : UserserviceService,
    private storage : Storage,
    private dbapi : DbapiService,
    private clipboard : Clipboard,
    private platform : Platform,
    private callNumber : CallNumber,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  BH_Name : string
  Contacts = []
  isMobile : boolean

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(con:string,head : string) {
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

  ngOnInit() {
  }

  call(number :string){
    if(this.callNumber.isCallSupported){
      this.callNumber.callNumber(number,true).catch(err=>{
        this.presentAlert(err, "Error")
      })
    }else{
      this.presentAlert("Unable to use access the native call", "Error")
    }
  }

  checkPlatform(){
    if(this.platform.is("mobileweb") || this.platform.is("desktop") ){
      this.isMobile = false
    }else{
      this.isMobile = true
    }
  }

 

  ionViewDidEnter(){
    this.checkPlatform()
    this.storage.get("User_ID").then(uid=>{
      this.userservice.isAuth(uid)
      this.dbapi.getTenantDetails(uid).subscribe(tdets=>{
        this.dbapi.getRHDetails_rrpid(tdets.RRP_ID).subscribe(rh=>{
          this.BH_Name = rh.RRP_Name
        })
        this.dbapi.getContacts_rrpid(tdets.RRP_ID).subscribe(contacts=>{
          this.Contacts = contacts
          console.log(this.Contacts)
        })
      })
    })
    this.storage.get("User_Type").then(type=>{
      this.userservice.isTenant(type)
    })
  }

}
