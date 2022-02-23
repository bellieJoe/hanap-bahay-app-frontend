import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.page.html',
  styleUrls: ['./addroom.page.scss'],
})
export class AddroomPage implements OnInit {

  closeAddRoom(){
    this.dismiss();
  }

  constructor( private modalController: ModalController) { }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
