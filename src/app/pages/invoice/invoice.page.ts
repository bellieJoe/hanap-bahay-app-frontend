import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private dbapi : DbapiService
  ) { }

  loading : boolean =  true
  Invoice : any = {}
  RRP : any = {}

  ngOnInit() {
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
