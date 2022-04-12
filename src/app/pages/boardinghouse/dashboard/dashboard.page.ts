import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { BhmenuPage } from '../bhmenu/bhmenu.page';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RentalHouseDetails, RentalHouseTypes } from 'src/app/providers/policy';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { runInThisContext } from 'vm';
import { AddRRPTypePage } from './add-rrptype/add-rrptype.page';


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
    private loading: LoadingController,
    private modal: ModalController
  ) { }

  // states
  rrpDetails : RentalHouseDetails
  isPreparing: boolean = true
  tenantCount: number = 0
  RRPTypesCount: number = 0
  actionScrollPosition: number = 0
  RRPTypes: any = {
    data: [],
    dbapi: this.dbapi,
    async init(rrpId:number){
      await new Promise((resolve, reject) => {
        this.dbapi.getRRPTypesByRRP_ID(rrpId).subscribe((res : any)=>{
          console.log(res)
          this.data = res
          resolve(null)
        })
      })
    }
  }

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

    try {
      await loader.present()

      await this.fetchRentalHouseInfo()

      await this.getTenantCount()

      await this.countRentalType()

      await this.RRPTypes.init(this.rrpDetails.RRP_ID)

      // exit loader
      this.isPreparing = false
      await loader.dismiss()

      this.loadHTMLComponents()

    } catch (error) {

      console.log(error)
      await loader.dismiss()

    }

    

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

  // async showAddRRPTypeModal(){
  //   const modal = await this.modal.create({
  //     component: AddRRPTypePage,
  //     // cssClass: 
  //   })
  //   return await  modal.present()
  // }

}
