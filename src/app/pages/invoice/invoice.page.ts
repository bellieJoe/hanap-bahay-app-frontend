import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UpdatePaymentPage } from '../boardinghouse/invoices/update-payment/update-payment.page';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private dbapi : DbapiService,
    private storage : Storage,
    private modal : ModalController
  ) { }

  loading : boolean =  true
  Invoice : any = {}
  RRP : any = {}


  ngOnInit() {
  }

  async checkInvoiceAuthority(User_ID : number, RRP_ID: number) : Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.dbapi.getRHDetails_rrpid(RRP_ID).subscribe(RRP => {
        if(RRP.Owner_ID == User_ID) {
          resolve(true)
        }
        else {
          resolve(false)
        }
      })
    })
  }


  async updatePayment(){
    const modal = await this.modal.create({
      component: UpdatePaymentPage,
      backdropDismiss: false,
      animated: true, 
      mode: 'md',
      componentProps: {
        Invoice: this.Invoice,
      }
    })

    await modal.present()

    const modalData = await modal.onDidDismiss()

    if(modalData.data.Invoice){
      this.Invoice = modalData.data.Invoice
    }
    console.log(modalData.data)
  }

  async ionViewDidEnter() {
    try {
      this.loading = true
      const id : any = await new Promise(
        (resolve, reject) => {
          this.activatedRoute.queryParams.subscribe(params => {
            resolve(params.id)
          })
        }
      )

      
      this.Invoice = await new Promise(
        (resolve, reject) => {
          this.dbapi.getInvoiceByID(encodeURIComponent(id)).subscribe(Invoice => {
            resolve(Invoice)
          })
        }
      )

      const User_ID = await this.storage.get("User_ID")

      this.Invoice.canUpdate = await this.checkInvoiceAuthority(User_ID, this.Invoice.RRP_ID)
      console.log(this.Invoice.canUpdate)
      this.Invoice.Payment_Breakdown = JSON.parse(this.Invoice.Payment_Breakdown)
      this.Invoice.Basic_Rent = this.Invoice.Payment_Breakdown.Basic_Rent
      this.Invoice.Miscellaneous = this.Invoice.Payment_Breakdown.Miscellaneous
      this.Invoice.Total = this.Invoice.Payment_Breakdown.Basic_Rent
      this.Invoice.Miscellaneous.map((val, i) => {
        this.Invoice.Total += val.FeeAmount
      })
      

      this.RRP = await new Promise(
        (resolve, reject) => {
          this.dbapi.getRHDetails_rrpid(this.Invoice.RRP_ID).subscribe(RRP => {
            resolve(RRP)
          })
        }
      )

  

      this.loading = false
    } catch (error) {
      this.loading = false
    }
    

    
  }

}
