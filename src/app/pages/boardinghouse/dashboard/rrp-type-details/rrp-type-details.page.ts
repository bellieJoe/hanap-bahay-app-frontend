import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-rrp-type-details',
  templateUrl: './rrp-type-details.page.html',
  styleUrls: ['./rrp-type-details.page.scss'],
})

export class RrpTypeDetailsPage  {

  constructor(
    private activatedRoute: ActivatedRoute,
    private dbapi: DbapiService,
  ) { }

  loading: boolean = true
  RRP_Type: any = {
    dbapi: this.dbapi,
    data: {},
    totalRent: 0,
    async init(id:number){
      await new Promise((resolve, reject) => {
        this.dbapi.getRRPTypeById(id).subscribe((RRP_Type : any) => {
          this.data = RRP_Type
          this.data.Miscellaneous = JSON.parse(RRP_Type.Miscellaneous) 
          this.totalRent = this.data.Basic_Rent
          this.data.Miscellaneous.map((val, i)=>{
            this.totalRent += val.FeeAmount
          })
          resolve(null)
        })
      }) 
    }
  }



  async ionViewDidEnter() {
    this.loading = true

    const rrpId = await new Promise((resolve, reject)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        resolve(params.id)
      })
    }) 

    await this.RRP_Type.init(rrpId)
        
    this.loading = false
  }

}
