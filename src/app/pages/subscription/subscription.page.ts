import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { activeUser, RentalHouseDetails, SubscriptionData } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { SubscribePage } from './subscribe/subscribe.page';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit{

  id : string
  name : string
  type : string
  yourHouses = []
  url_image = `${this.dbapi.SERVER}/images/profile/`

  constructor(
    private modalController: ModalController,
    private userservice : UserserviceService,
    private storage : Storage,
    private dbapi : DbapiService,
    private alert : AlertController,
    private router : Router,
    private toastController : ToastController
    ) { }

    loading: boolean = true

    showRegisterForm(){
      this.router.navigate(['subscription/subscribe'])
      // this.presentModal()
    }


    deleteRH(a : number){
      this.presentAlertDel("This action will permanently delete the Rental House and its data from the system. Are you sure you want to proceed?","Warning", a)
    }

    assignStoreValue(a : string){
      this.id = a  
    }

    manageRH(id : number, name : string){
      this.storage.set("RRP_ID", id).then((val)=>{
        this.storage.set("RRP_Name", name).then((val2)=>{
          location.href = "/boardinghouse/dashboard"
        })
      })
      
    }

  async presentToast(con:string) {
      const toast = await this.toastController.create({
        message: con,
        duration: 2000
      });
      toast.present();
    }
  
  async presentAlert(con : string, head : string) {
    const alert = await this.alert.create({
      header: head,
      message: con,
      buttons: ['Ok']
    });
  
    await alert.present();
  }
  
  async presentAlertDel(con : string, head : string, rrpid:number) {
    let choice : string
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: head,
      message: con,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            choice = "cancel"

          }
        }, {
          text: 'Yes',
          handler: () => {
            choice = "okay"
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
    if(choice === "okay"){
      this.dbapi.unboardTenants_rrpid(rrpid).subscribe(()=>{
        console.log("tenants undoarded");
        this.dbapi.deleteRHData_rrpid(rrpid).subscribe(()=>{
          console.log("RRP deleted")
          this.presentToast("Rental house successfully deleted")
          this.ngOnInit()
        })
      })
      console.log("Go on then delete it!")
    }else if(choice === "cancel"){
      console.log("Im sorry it was a mistake!")
    }else{

    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
    component: SubscribePage,
    cssClass: 'modal-login',
    });
    await modal.present();
    await modal.onDidDismiss();
    this.ngOnInit()
  }

  loadProfileImage(){
    this.yourHouses.map((val,i)=>{
      // console.log(val)
      this.dbapi.fetchImage(this.yourHouses[i].RRP_ID,"bh-profile").subscribe(image=>{
        // console.log(image)
        if(image){
         this.yourHouses[i].image_src = `${this.url_image}${image.IMG_Filename}.png?` + new Date().getTime()
        }else{
          this.yourHouses[i].image_src = null
        }
      })
    })
  }


  ngOnInit(){
    this.loading = true
    this.userservice.getUserInfo("User_Type").then((val)=>{
      if(val === "property owner"){
        this.userservice.getUserInfo("User_ID").then((val)=>{
          this.dbapi.getOwnersRH_id(parseInt(val)).subscribe((policy : RentalHouseDetails[])=>{
            this.yourHouses = policy
            this.yourHouses.map((val,i)=>{
              this.yourHouses[i].RRP_Settings= JSON.parse(val.RRP_Settings)
              this.dbapi.countTenant_rrpid(val.RRP_ID).subscribe((count)=>{
                for(let a = this.yourHouses.length-1;a>=0;a--){
                  if(this.yourHouses[a].RRP_ID === val.RRP_ID){
                    this.yourHouses[a].Tenant_Count = count
                    this.loadProfileImage()

                  }
                }
                this.loading = false
              })
            })
            
          })
        })
      }else{
        this.presentAlert("Access Denied!", "Unauthorized Usage")
        this.router.navigate([""]);
      }
    })
    this.storage.remove("RRP_ID").then(()=>{
      this.storage.remove("RRP_Name").then(()=>{
      })
    })
    
  }

}
