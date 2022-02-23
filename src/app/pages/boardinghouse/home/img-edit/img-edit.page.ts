import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-img-edit',
  templateUrl: './img-edit.page.html',
  styleUrls: ['./img-edit.page.scss'],
})
export class ImgEditPage implements OnInit {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  imageDetails : any = []
  url_image = `${this.dbapi.SERVER}/images/rh_extra_image/`

  ngOnInit() {
  }

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  updateDetails(){
    this.dbapi.updateImageDetails(this.imageDetails.IMG_ID, this.imageDetails.Title, this.imageDetails.Description).subscribe(()=>{
      this.presentToast("Image successfully updated")
      this.router.navigate(['boardinghouse/home/imgvw'])
    },err=>{
      this.presentAlert("An error occured while updating the details.", "Update Error")
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_Type").then(type=>{
      if(type == "property owner"){
        this.storage.get("edit_image").then(res=>{
          this.imageDetails = res
          this.imageDetails.url = `${this.url_image}${res.IMG_Filename}.png?` + new Date().getTime()
        })
      }else{
        this.router.navigate([''])
      }
    })
  }

  ionViewDidLeave(){
    this.storage.remove("edit_image")
    this.imageDetails = []
  }

}
