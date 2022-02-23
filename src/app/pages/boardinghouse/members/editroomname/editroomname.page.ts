import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editroomname',
  templateUrl: './editroomname.page.html',
  styleUrls: ['./editroomname.page.scss'],
})
export class EditroomnamePage implements OnInit {

  close(){
    this.dismiss()
  }
  changeName(a){
    this.presentToast(a)
  }
  
  constructor(
    public modalCtrl: ModalController,
    public toastController: ToastController
  ) { }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000
    });
    toast.present();
  }
  

  ngOnInit() {
  }

}
