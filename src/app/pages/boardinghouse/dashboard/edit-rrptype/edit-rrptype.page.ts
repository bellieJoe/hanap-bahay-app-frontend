import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ValidatorModule } from 'src/app/modules/validator/validator.module';
import { DbapiService } from 'src/app/providers/dbapi.service';

interface fee {
  FeeName: string,
  FeeAmount: number,
  clear?() : any
}

// interface RRPTypeForm {
//   RRP_ID?: number,
//   RRP_Type: string,
//   Basic_Rent: number,
//   Capacity: number,
//   Description?: number,
//   Miscellaneous?: fee[],
//   Total_Fee?: number,
//   dbapi?: any,
//   computeTotalFee(): any,
//   init(): any
// }

@Component({
  selector: 'app-edit-rrptype',
  templateUrl: './edit-rrptype.page.html',
  styleUrls: ['./edit-rrptype.page.scss'],
})

export class EditRrptypePage implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private dbapi : DbapiService,
    private validator : ValidatorModule,
    private loader : LoadingController,
    private storage: Storage,
  ) { }

  RRP_Type_Form = {
    RRP_ID: null,
    RRP_Type_ID: null,
    RRP_Type: null,
    Basic_Rent: null,
    Capacity: null,
    Description: null,
    Miscellaneous: [],
    Total_Fee: 0,
    dbapi: this.dbapi,
    computeTotalFee(){
      this.Total_Fee = this.Basic_Rent
      this.Miscellaneous.map((val: fee, i)=>{
        this.Total_Fee += val.FeeAmount
      })
    },
    async init(id){
      const rrpType : any = await new Promise((resolve, reject)=>{
        this.dbapi.getRRPTypeById(id).subscribe(RRP_Type => {
          resolve(RRP_Type)
        })
        
      })
      this.RRP_Type_ID = rrpType.RRP_Type_ID
      this.RRP_ID = rrpType.RRP_ID
      this.RRP_Type = rrpType.RRP_Type
      this.Basic_Rent = rrpType.Basic_Rent
      this.Capacity = rrpType.Capacity
      this.Description = rrpType.Description
      this.Miscellaneous = JSON.parse(rrpType.Miscellaneous)
    }
  }

  errors: any = {}
  phase: number = 1
  totalFee:  number = 0
  feeInput : fee = {
    FeeName: null,
    FeeAmount: null,
    clear(){
      this.FeeName = null,
      this.FeeAmount = null
    }
  }

 

  async ionViewDidEnter(){
    const id = await new Promise((resolve, reject)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        console.log(params.id)
        resolve(params.id)
      })
    })

    await this.RRP_Type_Form.init(id)

    this.RRP_Type_Form.computeTotalFee()

  }

  async addFee(){ 
    let data : any = {}
    data.FeeAmount = this.feeInput.FeeAmount
    data.FeeName= this.feeInput.FeeName
    let validation =  await this.validator.validateOnly(data, ["FeeName", "FeeAmount"])

    if(validation.success){
      this.errors = {}
      let isDuplicate : boolean = false
      await this.RRP_Type_Form.Miscellaneous.map((val, i) => {
        if(val.FeeName == this.feeInput.FeeName){
          isDuplicate = true
        }
      })
      if(!isDuplicate){
        let fee: fee = {
          FeeName : this.feeInput.FeeName,
          FeeAmount : this.feeInput.FeeAmount
        }
        this.RRP_Type_Form.Miscellaneous.push(fee)
        this.feeInput.clear()
      }else{
        this.errors.FeeName = `Already have ${this.feeInput.FeeName}`
      }
    }else{
      this.errors = validation.error
    }

    this.RRP_Type_Form.computeTotalFee()
  }

  removeFee(fee){
    this.RRP_Type_Form.Miscellaneous.splice( this.RRP_Type_Form.Miscellaneous.indexOf(fee) , 1)
    this.RRP_Type_Form.computeTotalFee()
  }

  changePhase(a){
    this.phase = a
  }

  async submit () {
    const loader = await this.loader.create({
      spinner: "lines",
      message: "Saving changes",
      mode: "ios"
    })

    try {
      await loader.present()
      

      const { RRP_Type, Basic_Rent, Capacity, Description, Miscellaneous, RRP_Type_ID } = this.RRP_Type_Form

      const dataToValidate = {RRP_Type, Basic_Rent, Capacity }

      const validation = await this.validator.validateOnly(dataToValidate, ['RRP_Type', 'Basic_Rent', 'Capacity'])

      if(!validation.success){
        this.errors = validation.error
        this.phase = 1
        loader.dismiss()
        throw new Error("Validation Error");
      }

      const data = { 
        RRP_Type, 
        Basic_Rent, 
        Capacity, 
        Description, 
        Miscellaneous: JSON.stringify(Miscellaneous),
        RRP_Type_ID
      }

      await new Promise((resolve, reject)=> {
        this.dbapi.updateRRP_Type(data).subscribe(() => {
          resolve(null)
        })
      })
      
      loader.dismiss()

      location.href = "/boardinghouse/dashboard"

    } catch (error) {
      console.log(error)
      loader.dismiss()
    }
  }

  

  ngOnInit() {
  }

}
