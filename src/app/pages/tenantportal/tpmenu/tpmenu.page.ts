import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tpmenu',
  templateUrl: './tpmenu.page.html',
  styleUrls: ['./tpmenu.page.scss'],
})
export class TpmenuPage implements OnInit {

  constructor(
    private popover : PopoverController
  ) { }

  async dismiss(ev: any) {
    await this.popover.dismiss()
 }

  ngOnInit() {
  }

}
