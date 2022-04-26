import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { TpmenuPage } from '../tpmenu/tpmenu.page';

@Component({
  selector: 'app-tpmembers',
  templateUrl: './tpmembers.page.html',
  styleUrls: ['./tpmembers.page.scss'],
})
export class TpmembersPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private textPipe : TitleCasePipe
  ) { }

  members = []
  User_ID : number
  BH_Name : string
  url_image = `${this.dbapi.SERVER}/images/profile/`
  loading: boolean = false
  // image_src : string

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

  isAuth(uid:number){
    if(!uid){
      this.router.navigate([''])
    }
  }

  isTenant(type){
    if(type != "tenant"){
      this.router.navigate([''])
    }
  }

  viewProf(a:number){
    this.members.map(
      (val, i) => {
        if(val.User_ID == a && val.name != null){
          this.storage.set("vst_prof", a).then(()=>{
            this.router.navigate(['/profileview'])
          })
        }
      }
    )
    
  }

  loadProfileImages(){
    this.members.map((val,i)=>{
      this.dbapi.fetchImage(this.members[i].User_ID,"user-profile").subscribe(image=>{
        // console.log(image)
        if(image){
          this.members[i].image_src = `${this.url_image}${image.IMG_Filename}.png?` + new Date().getTime()
        }else{
          this.members[i].image_src = null
        }
      })
    })
  }

  async ionViewDidEnter(){
    try {
      this.loading = true

      const uid = await this.storage.get("User_ID")
      
      const dets : any = await new Promise(
        (resolve, reject) => {
          this.dbapi.getTenantDetails(uid).subscribe(
            dets => {
              resolve(dets)
            }
          )
        }
      )

      const rh : any = await new Promise(
        (resolve, reject) => {
          this.dbapi.getRHDetails_rrpid(dets.RRP_ID).subscribe(
            rh => {
              resolve(rh)
            }
          )
        }
      )
      this.BH_Name = rh.RRP_Name

      const list : any = await new Promise(
        (resolve, reject) => {
          this.dbapi.getTenantList_rrpid(dets.RRP_ID).subscribe(
            list => {
              resolve(list)
            }
          )
        }
      )
      this.members = list
      this.loadProfileImages()

      this.members.map((val,i)=>{
        this.dbapi.getUserDetails_id(this.members[i].User_ID).subscribe(udets=>{
          this.members[i].Email = udets[0].Email
          if(udets[0].Firstname && udets[0].Lastname) {
            this.members[i].name = this.textPipe.transform(udets[0].Firstname + " " + udets[0].Lastname)
          }
          else {
            this.members[i].name = null
          }
          
        })
      })
      

      this.loading = false
    } catch (error) {
      this.loading = false
    }

    // this.storage.get("User_ID").then(uid=>{
    //   this.User_ID = uid
    //   this.isAuth(uid)
    //   this.dbapi.getTenantDetails(uid).subscribe(dets=>{
    //     this.dbapi.getRHDetails_rrpid(dets.RRP_ID).subscribe(rh=>{
    //       this.BH_Name = rh.RRP_Name
    //     })
    //     this.dbapi.getTenantList_rrpid(dets.RRP_ID).subscribe(list=>{
    //       // console.log(list)
    //       this.members = list
    //       this.loadProfileImages()
    //       this.members.map((val,i)=>{
    //         this.dbapi.getUserDetails_id(this.members[i].User_ID).subscribe(udets=>{
    //           this.members[i].name = this.textPipe.transform(udets[0].Firstname + " " + udets[0].Lastname)
    //         })
    //       })
    //     })
    //   })
    // })
    // this.storage.get("User_Type").then(type=>{
    //   this.isTenant(type)
    // })
  }

}
