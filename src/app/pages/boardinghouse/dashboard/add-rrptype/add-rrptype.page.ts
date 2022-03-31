import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-rrptype',
  templateUrl: './add-rrptype.page.html',
  styleUrls: ['./add-rrptype.page.scss'],
})
export class AddRRPTypePage implements OnInit {

  constructor() { }

  phase: number = 2

  ngOnInit() {
  }

  changePhase(a){
    this.phase = a
  }

}
