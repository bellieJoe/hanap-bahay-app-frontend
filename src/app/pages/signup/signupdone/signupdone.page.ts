import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signupdone',
  templateUrl: './signupdone.page.html',
  styleUrls: ['./signupdone.page.scss'],
})
export class SignupdonePage implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
