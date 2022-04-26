import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private toast : ToastController,
    private storage : Storage,
    private dbapi : DbapiService,
    private router : Router
  ) { }

  RRP_Name : string = null
  Years : number[] = []
  loading : boolean = false
  Invoices : any = []

  showHandler = async () => {
    try {
      this.loading = true
      const User_ID = await this.storage.get("User_ID")
      
      this.Invoices = await new Promise(
        (resolve, reject) => {
          this.dbapi.getInvoicesByUser_ID(User_ID, this.Filter_Invoice_Form.data.Month, this.Filter_Invoice_Form.data.Year).subscribe(Invoices => {
            resolve(Invoices)
          })
        }
      )

      this.loading = false
    } catch (error) {
      this.loading = false
    }
    
  }

  Filter_Invoice_Form = {
    data: {
      Month: new Date().getUTCMonth() + 1,
      Year: new Date().getFullYear(),
    },
    submit: this.showHandler
  }

  viewInvoice(ID){
    this.router.navigate(
      ['/invoice'],
      {
        queryParams: {
          id: ID
        }
      }
    )
  }


  ngOnInit() {
    const currentYear  = new Date().getFullYear()

    console.log(currentYear)

    for(let i = currentYear; i >= 2021; i--){
      this.Years.push(i)
    }
  }

  async ionViewDidEnter() {

    console.log(this.Filter_Invoice_Form)

    try {
      this.loading = true

      this.RRP_Name = await this.storage.get("RRP_Name")

      await this.Filter_Invoice_Form.submit()

      this.loading = false
    } catch (error) {
      this.loading = false
      const toast = await this.toast.create({
        color: "danger",
        message: error.message,
        animated: true,
        duration: 3000,
        mode: "md",
      })

      await toast.present()

      console.log(error)
    }
  }

}
