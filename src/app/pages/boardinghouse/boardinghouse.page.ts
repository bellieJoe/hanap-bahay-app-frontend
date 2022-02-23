import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BhmenuPage } from './bhmenu/bhmenu.page';

@Component({
  selector: 'app-boardinghouse',
  templateUrl: './boardinghouse.page.html',
  styleUrls: ['./boardinghouse.page.scss'],
})
export class BoardinghousePage implements OnInit {

  active = "Announcements";

  headerChange(a){
    this.active = a;
  }

  constructor(public popoverController: PopoverController) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BhmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  

  ngOnInit() {
  }

}
