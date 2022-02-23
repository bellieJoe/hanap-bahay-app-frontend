import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.page.html',
  styleUrls: ['./temp.page.scss'],
})
export class TempPage implements OnInit {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService
  ) { }

  noRH : boolean

  ngOnInit() {
  }

  isAuth(uid:number){
    if(!uid){
      this.router.navigate([''])
    }
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      this.isAuth(uid)
      this.dbapi.getUserDetails_id(uid).subscribe(udets=>{
        if(parseInt(udets[0].Is_Boarded.toString()) === 1){
          this.noRH = false
          this.router.navigate(['/tenantannouncement'])

        }else{
          this.noRH = true
        }
      })
    })
  }

}
