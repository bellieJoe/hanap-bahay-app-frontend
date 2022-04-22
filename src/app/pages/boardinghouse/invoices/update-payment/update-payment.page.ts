import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.page.html',
  styleUrls: ['./update-payment.page.scss'],
})
export class UpdatePaymentPage implements OnInit {

  constructor(
    private modal : ModalController,
    private alert : AlertController,
    private dbapi : DbapiService,
    private loader : LoadingController
  ) { }

  @Input() Invoice : any
  Amount_Paid: number 

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.Amount_Paid = this.Invoice.Amount_Paid
  }

  async closeModal(){
    await this.modal.dismiss({
      'updated' : true
    })
  }

  async updatePayment(){
    if(this.Amount_Paid && this.Amount_Paid >= 0 && this.Amount_Paid <= this.Invoice.Total){
      const loader = await this.loader.create({
        spinner: "lines",
        message: 'Updating Payment',
        mode: "ios",
        backdropDismiss: false
      })

      try {
        await loader.present()

        if (this.Invoice.Total == this.Amount_Paid) {
          this.Invoice.Status = "Paid"
        }
        else if (this.Amount_Paid > 0 && this.Amount_Paid < this.Invoice.Total) {
          this.Invoice.Status = "Incomplete"
        } 
        else {
          this.Invoice.Status = "Unpaid"
        }

        await new Promise(
          (resolve, reject) => {
            this.dbapi.updateInvoicePayment(this.Invoice.Bill_ID, this.Amount_Paid, this.Invoice.Status).subscribe(()=>{
              resolve(null)
            })
          }
        )

        this.Invoice.Amount_Paid = this.Amount_Paid

        await loader.dismiss()

        await this.modal.dismiss({
          'updated' : true,
          Invoice: this.Invoice
        })
      } catch (error) {
        await loader.dismiss()
        await this.modal.dismiss({
          'updated' : true,
          Invoice: null
        })
      }
    }
    else{
      const alert = await this.alert.create({
        header: "Invalid Input",
        message: "Amount paid is invalid",
        buttons: ['Ok']
      })

      await alert.present()
    }
  }

}
