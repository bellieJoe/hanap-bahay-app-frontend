import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { GetTenantList } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { AddroomPage } from './addroom/addroom.page';
import { AddtenantPage } from './addtenant/addtenant.page';
import { EditroomnamePage } from './editroomname/editroomname.page';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage {

  constructor(
    public modalController: ModalController,
    private popoverController: PopoverController,
    private userservice : UserserviceService,
    private alert : AlertController,
    private router : Router,
    private dbapi : DbapiService,
    private toast : ToastController,
    private storage : Storage,
    private datePipe : DatePipe
  ) { }


  BH_Name : string
  isSkeletonOn = true
  memberList : GetTenantList[]
  memberListComplete = []
  url_image = `${this.dbapi.SERVER}/images/profile/`
  RRP_ID : number
  
  editName(){
    this.presentModal()
  }

  async showAddTenant(){ // not needed
    const RRP_ID = await this.storage.get("RRP_ID")

    const typeCount = await new Promise((resolve, reject)=>{
      this.dbapi.countRentalTypes(RRP_ID).subscribe(count=>{
        resolve(count)
      })
    })

    if(typeCount > 0){
      await this.addTenantModal();
    }
    else{
      const alert = await this.alert.create({
        message: "You hav'nt set up your RRP Types yet. RRP Type is needed to know where your tenant belong.",
        animated: true,
        header: "Notice",
        mode: "md",
        buttons: ["Ok"],
        translucent: true
      })
      await alert.present()
    }
  }

  async removeTenant(a:number, f:string, l:string){
    const alert = await this.alert.create({
      header: 'Alert',
      message:'Are you sure you want to remove this Tenant to your Rental House?',
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Yes",
          handler: ()=>{
            let today = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")
            this.dbapi.removeTenant_uid(a).subscribe(()=>{
              this.dbapi.addNotification(a,today,"Rental House Notice", `You have been kicked out from ${this.BH_Name}`,"",null).subscribe(()=>{
                this.ionViewDidEnter()
                this.presentToast("You have remove "+ f.toUpperCase() + " " + l.toUpperCase() + " from your Rental House")
              })
            })
          }
        }
      ]
    });
  
    await alert.present();


    
  }

  async presentToast(a : string) {
    const toast = await this.toast.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(head : string , cont: string) {
    const alert = await this.alert.create({
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
      component: EditroomnamePage,
      cssClass: 'modal-member'
    });
    return await modal.present();
  }

  async addTenantModal() {
    const modal = await this.modalController.create({
      component: AddtenantPage,
      cssClass: 'modal-addtenant',
      backdropDismiss: false
    })
  
    modal.present();
    await modal.onDidDismiss().then(()=>{
      this.ionViewDidEnter()
    })
  }

  loadProfileImages(){
    this.memberListComplete.map((val,i)=>{
      this.dbapi.fetchImage(this.memberListComplete[i].User_ID,"user-profile").subscribe(image=>{
        // console.log(image)
        if(image){
          this.memberListComplete[i].image_src = `${this.url_image}${image.IMG_Filename}.png?` + new Date().getTime()
        }else{
          this.memberListComplete[i].image_src = null
        }
      })
    })
  }

  message(a:number){
    this.storage.set("conv_dets", {type: "tenant to rrp", rrpid: this.RRP_ID, uid:a}).then(()=>{
      this.router.navigate(["message/conversation"])
    })
  }

  visitProfile(a:number){
    this.memberListComplete.map((val, i) => {
      if(val.User_ID == a && val.isUser){
        this.storage.set("vst_prof", a).then(()=>{
          this.router.navigate(['/profileview'])
        })
      }
    })
    
  }

  ionViewDidEnter(){
    this.memberListComplete = []
    this.userservice.getUserInfo("RRP_ID").then((val)=>{
      this.RRP_ID = parseInt(val)
      this.dbapi.getTenantList_rrpid(parseInt(val)).subscribe((list : GetTenantList[])=>{
        if(list.length == 0){
          this.memberListComplete = null
        }else{
          this.memberListComplete = list
          this.memberListComplete.map((val,i)=>{
            this.dbapi.getTenantListInfo_uid(this.memberListComplete[i].User_ID).subscribe(info=>{
              this.memberListComplete[i].Email = info[0].Email
              if(info[0].Firstname && info[0].Middlename && info[0].Lastname){
                this.memberListComplete[i].Firstname = info[0].Firstname
                this.memberListComplete[i].Middlename = info[0].Middlename
                this.memberListComplete[i].Lastname = info[0].Lastname
                this.memberListComplete[i].isUser = true
              }
              else {
                this.memberListComplete[i].isUser = false
              }
              

            })
          })
        this.loadProfileImages()
        }
        this.isSkeletonOn = false

      })
    })
    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val
    })
  }

}
