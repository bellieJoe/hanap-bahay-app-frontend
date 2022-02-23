import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { TpmenuPage } from '../tpmenu/tpmenu.page';

@Component({
  selector: 'app-tenantannouncement',
  templateUrl: './tenantannouncement.page.html',
  styleUrls: ['./tenantannouncement.page.scss'],
})
export class TenantannouncementPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService
  ) { }

  announcements = []
  BH_Name : string

  @ViewChild('segment') segment : HTMLIonSegmentElement;
  segmentValue = 'all';

  filter(a:any){
  //  console.log(this.segmentValue = a) 
  }
  tenantDetails : any = {}


  
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
      this.router.navigate[('')]
    }
  }
  isTenant(type:string){
    if(type != "tenant"){
      this.router.navigate([''])
    }
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      this.isAuth(uid)
      this.storage.get("User_Type").then(type=>{
        this.isTenant(type)
        this.dbapi.getTenantDetails(uid).subscribe(tenantDets =>{
          this.tenantDetails = tenantDets
          // console.log(tenantDets)
          this.dbapi.getAnnouncements_rrpid(this.tenantDetails.RRP_ID).subscribe(annDets=>{
            this.announcements = annDets
            // console.log(annDets)
          })
          this.dbapi.getRHDetails_rrpid(this.tenantDetails.RRP_ID).subscribe(dets=>{
            this.BH_Name = dets.RRP_Name
          })
        })
        
        // console.log(this.tenantDetails)
      })
    })
  }

}
