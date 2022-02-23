import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resexp',
  templateUrl: './resexp.page.html',
  styleUrls: ['./resexp.page.scss'],
})
export class ResexpPage implements OnInit {

  constructor(
    private modalController: ModalController,

  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss()
  }

}
