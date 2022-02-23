import { DatePipe, formatDate } from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { SearchTenantList } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';


@Component({
  selector: 'app-addtenant',
  templateUrl: './addtenant.page.html',
  styleUrls: ['./addtenant.page.scss'],
})
export class AddtenantPage {

  hasResult = false
  isSkeletonOn = false
  userSearchIn : string
  searchInput : any
  dateToday : string
  time : string
  searchResults = []
  url_image = `${this.dbapi.SERVER}/images/profile/`

  closeAddTenant(){
    this.dismiss();
  }

  canceled(){
    this.isSkeletonOn = false;
  }

  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private userservice : UserserviceService,
    private toast : ToastController,
    private datePipe : DatePipe,
    private router : Router,
    private storage : Storage
    ) { }

    async presentToast(cont : string) {
      const toast = await this.toast.create({
        message: cont,
        duration: 2000
      });
      toast.present();
    }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addTenant(a : number, fname:string, lname:string){
   var todays = new Date()
   this.dateToday = this.datePipe.transform(todays, "yyyy/MM/dd")
   this.time = this.datePipe.transform(todays, "hh:mm:ss")
    this.userservice.getUserInfo("RRP_ID").then((val)=>{
      this.dbapi.addTenant_rrpid(a, parseInt(val), this.dateToday, this.time ).subscribe(()=>{
        this.dbapi.isBoarded(a, parseInt(val)).subscribe((res:any) =>{
          if(!res){
            this.dbapi.addBoarderRRP(a, parseInt(val)).subscribe()
          }
        })
        
        this.storage.get("RRP_Name").then(rrpname=>{
          this.dbapi.addNotification(a,this.datePipe.transform(todays, "yyyy-MM-dd HH:mm:ss"), "New Tenant", `You have been added as a Tenant to ${rrpname}`,"/tpmembers",null).subscribe(()=>{
            this.presentToast(fname.toUpperCase() +" "+lname.toUpperCase() +" has been added as you Tenant")
            this.dismiss()
          })
        })
      })
    })

  }

  register(){
    this.router.navigate(['/boardinghouse/members/regtenant'])
    this.modalController.dismiss()
  }

  search_Tenant(){
    if(this.userSearchIn === " "){
      this.userSearchIn = null
      this.searchResults = null
    }else{
      this.searchInput = this.userSearchIn.split(" ", 4)
      if(this.searchInput.length == 1 ){
        if(this.searchInput != ""){
          this.isSkeletonOn = true
          this.hasResult = false
          this.dbapi.searchTenant_fistname(this.searchInput).subscribe((res : SearchTenantList[])=>{
            this.searchResults = res
            this.loadProfileImage()
            // console.log(this.searchResults.length)
            
            if(this.searchResults.length == 0)
            {
              this.hasResult = true
              this.isSkeletonOn = false
            }
            else{
              this.hasResult = false
              this.isSkeletonOn = false
            }
          })
        }else{
          this.searchResults = null
        }
      }else if(this.searchInput.length == 2 ){
        // console.log(this.searchInput)
        if(this.searchInput[1] != ""){
          this.dbapi.searchTenant_2name(this.searchInput[0],this.searchInput[1]).subscribe((res : SearchTenantList[])=>{
            // console.log(res)
            this.searchResults = res
            this.loadProfileImage()
          })
        }else{}

      }else if(this.searchInput.length == 3 ){
        // console.log(this.searchInput)
        if(this.searchInput[2] != ""){
          this.dbapi.searchTenant_3name(this.searchInput[0],this.searchInput[1],this.searchInput[2]).subscribe((res : SearchTenantList[])=>{
            // console.log(res)
            this.searchResults = res
            this.loadProfileImage()
          })
        }else{}

      }else if(this.searchInput.length == 4 ){
        // console.log(this.searchInput)
        if(this.searchInput[3] != ""){
          this.dbapi.searchTenant_4name(this.searchInput[0],this.searchInput[1],this.searchInput[2], this.searchInput[3]).subscribe((res : SearchTenantList[])=>{
            // console.log(res)
            this.searchResults = res
            this.loadProfileImage()
          })
        }else{}
      }else {
      }
      // this.loadProfileImage()
    }
    
  }

  loadProfileImage(){
    // console.log(this.searchResults)
    this.searchResults.map((val, i)=>{
      this.dbapi.fetchImage(this.searchResults[i].User_ID, "user-profile").subscribe(image=>{
        if(image){
          this.searchResults[i].image_src = `${this.url_image}${image.IMG_Filename}.png?`+ new Date().getTime()
        }else{
          this.searchResults[i].image_src = null
        }
      })
    })
  }


  ionViewDidEnter(){
    if(location.pathname != "/boardinghouse/members"){
      this.router.navigate([''])
    }
  }

}
