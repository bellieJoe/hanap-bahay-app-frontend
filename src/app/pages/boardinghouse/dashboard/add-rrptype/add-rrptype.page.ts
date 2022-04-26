import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ValidatorModule } from 'src/app/modules/validator/validator.module';
import { DbapiService } from 'src/app/providers/dbapi.service';

interface fee {
  FeeName: string,
  FeeAmount: number,
  clear?() : any
}

interface RRPTypeForm {
  RRP_ID?: number,
  RRP_Type: string,
  Basic_Rent: number,
  Capacity: number,
  Description?: number,
  Miscellaneous?: fee[],
  Total_Fee?: number,
  computeTotalFee(): any
}

@Component({
  selector: 'app-add-rrptype',
  templateUrl: './add-rrptype.page.html',
  styleUrls: ['./add-rrptype.page.scss'],
})
export class AddRRPTypePage implements OnInit {

  constructor(
    private validator : ValidatorModule,
    private dbapi : DbapiService,
    private loader : LoadingController,
    private storage: Storage,
  ) { }
  
  
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

  RRP_Type_Form: RRPTypeForm = {
    RRP_ID: null,
    RRP_Type: null,
    Basic_Rent: null,
    Capacity: null,
    Description: null,
    Miscellaneous: [],
    Total_Fee: 0,
    computeTotalFee(){
      this.Total_Fee = this.Basic_Rent
      this.Miscellaneous.map((val: fee, i)=>{
        this.Total_Fee += val.FeeAmount
      })
    }
  }


  ngOnInit() {
    this.storage.get("RRP_ID").then(res=>{
      this.RRP_Type_Form.RRP_ID = res
    })
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
      message: "Adding RRP Type",
      mode: "ios"
    })

    try {
      await loader.present()
      

      const { RRP_Type, Basic_Rent, Capacity, Description, Miscellaneous, RRP_ID } = this.RRP_Type_Form

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
        RRP_ID
      }

      await new Promise((resolve, reject)=> {
        this.dbapi.addRRPType(data).subscribe(() => {
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

}
