import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RentalHouseDetails } from 'src/app/providers/policy';
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { CcPage } from './cc/cc.page';
import { EditdetsPage } from './editdets/editdets.page';
import { ResexpPage } from './resexp/resexp.page';

@Component({
  selector: 'app-bhsettings',
  templateUrl: './bhsettings.page.html',
  styleUrls: ['./bhsettings.page.scss'],
})
export class BhsettingsPage{

  BH_Name : string
  RH_Details : RentalHouseDetails = {
    RRP_ID : null,
    RRP_Name : null,
    RRP_Description : null,
    RRP_Capacity : null,
    RRP_Type : null,
    RRP_Address : null,
    RRP_Rent_Rate : null,
    RRP_X_Coordinates : null,
    RRP_Y_Coordinates : null,
    Owner_ID : null,
    Contact_Number : null,
    RRP_Settings: null,
    Photo_Documents: null,
    Business_Registration_No: null
  }
  RH_Owner_Name : string

  

  constructor(
    private popoverController: PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private modalController : ModalController
    ) { }

    // async presentModal() {
    //   console.log("Gumanasai")
    //   const modal = await this.modalController.create({
    //   component: CcPage,
    //   });
    //   await modal.present();
    // }
    

    async presentModal() {
      const modal = await this.modalController.create({
      component: CcPage
      });
      await modal.present();
      await modal.onDidDismiss();
      this.ionViewDidEnter()
    }    

    async edit() {
      const modal = await this.modalController.create({
      component: EditdetsPage
      });
      await modal.present();
      await modal.onDidDismiss();
      this.ionViewDidEnter()
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

  async editExpiry() {
    const modal = await this.modalController.create({
    component: ResexpPage,
    // componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then((val)=>{
      if(val != null){
        this.storage.get("RRP_ID").then((val1)=>{
          this.RH_Details.RRP_ID = val1

          this.dbapi.getRHDetails_rrpid(val1).subscribe((res:RentalHouseDetails)=>{
            this.RH_Details = res
            this.dbapi.getUserDetails_id(val).subscribe((dets)=>{
              this.RH_Owner_Name =  dets[0].Firstname + " " + dets[0].Middlename.slice(0,1) + ". " +dets[0].Lastname
            })
          })
        })
      }
      else{
        this.router.navigate([''])
      }
    })

    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })
  }


}
