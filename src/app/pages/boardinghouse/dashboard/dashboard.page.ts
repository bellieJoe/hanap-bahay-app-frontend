import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RentalHouseDetails } from 'src/app/providers/policy';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit{

  constructor(
    private popoverController: PopoverController,
    private dbapi: DbapiService,
    private storage: Storage,
    private loading: LoadingController
  ) { }

  // states
  rrpDetails : RentalHouseDetails
  isPreparing: boolean = true
  tenantCount: number = 0
  RRPTypesCount: number = 0
  actionScrollPosition: number = 0

  icons: any = {
    faHome: faHome
  }
  
  //  methods
  async ngOnInit(){
    // start loader
    this.isPreparing = true
    let loader = await this.loading.create({
      message: "Loading",
      mode: "ios"
    })

    await loader.present()

    await this.fetchRentalHouseInfo()

    await this.getTenantCount()

    await this.countRentalType()

    // exit loader
    this.isPreparing = false
    await loader.dismiss()

    this.loadHTMLComponents()

  }


  // onInit functions
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BhmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async fetchRentalHouseInfo(){
    let rrpID = await this.storage.get('RRP_ID')
    this.rrpDetails = await new Promise((resolve, reject)=>{
      this.dbapi.getRHDetails_rrpid(rrpID).subscribe(rrpDetails=>{
        resolve(rrpDetails)
      })
    })
    
  }

  async getTenantCount(){
    let rrpid = await this.storage.get('RRP_ID')
    this.tenantCount = await new Promise((resolve, reject)=>{
      this.dbapi.countTenant_rrpid(rrpid).subscribe(totCount=>{
        resolve(totCount)
      })
    });
  }

  loadHTMLComponents(){
    const conActions  = document.getElementById("conActions")
    // const buttonGroup = document.getElementById("button-group")
    const btnLeft = document.getElementById("btnLeft")
    const btnRight = document.getElementById("btnRight")

    btnLeft.style.top = `-${(conActions.clientHeight / 2) + (btnLeft.clientHeight / 2) + 3}px`
    btnRight.style.top = `-${(conActions.clientHeight / 2) + (btnRight.clientHeight / 2) + 3}px`

  }

  async countRentalType(){
    let rrpid = await this.storage.get('RRP_ID')
    this.RRPTypesCount = await new Promise((resolve, reject)=>{
      this.dbapi.countRentalTypes(rrpid).subscribe(totCount=>{
        resolve(totCount)
      })
    })
  }

  //
  actionScrollLeft(){
    const conActions  = document.getElementById("conActions")
    const buttonGroup = document.getElementById("button-group")

    let travel = conActions.clientWidth

    if(this.actionScrollPosition > 0){
      this.actionScrollPosition -= travel
      conActions.scrollTo(this.actionScrollPosition  ,0)
    }
    
  }

  actionScrollRight(){
    const conActions  = document.getElementById("conActions")
    const buttonGroup = document.getElementById("button-group")

    let travel = conActions.clientWidth

    if(this.actionScrollPosition < conActions.scrollWidth){
      this.actionScrollPosition += travel
      conActions.scrollTo(this.actionScrollPosition  ,0)
    }
    

  }

}
