import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { ContactDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-viewcontact',
  templateUrl: './viewcontact.page.html',
  styleUrls: ['./viewcontact.page.scss'],
})
export class ViewcontactPage implements OnInit {

  @Input() contact_id : number
  line : string = "none"
  contactDetails : ContactDetails = {
    Contact_ID : null,
    Contact_Number :  null,
    Contact_Name : null,
    Contact_Type : null,
    RRP_ID : null,
  }


  updateContact(){
    let a = this.contactDetails
    this.dbapi.updateContact_cid(a.Contact_ID, a.Contact_Name, a.Contact_Number, a.Contact_Type).subscribe((res : ContactDetails)=>{
      this.contactDetails = res
      this.presentToast("Contact Successfully updated")
      this.modalController.dismiss({
        updated : true
      })
    })
  }


  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private toastController: ToastController
  ) { }

  async presentToast(a:string) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }

  async dismiss() {
    this.modalController.dismiss({
      updated : false
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.dbapi.getContact_cid(this.contact_id).subscribe((res : ContactDetails)=>{
      this.contactDetails = res
    })
  }
}
