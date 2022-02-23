import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-rvw',
  templateUrl: './rvw.page.html',
  styleUrls: ['./rvw.page.scss'],
})
export class RvwPage {

  constructor(
    private dbapi : DbapiService,
    private storage : Storage,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  RH_Ratings : any = []
  RRP_Name : string

  async isAuth(){
    return new Promise<boolean>(resolve=>{
      this.storage.get("User_ID").then(uid=>{
        if(uid){
          resolve(true)
        }else{
          this.router.navigate([''])
        }
      })
    })
    
  }

  ionViewDidEnter(){

    this.isAuth().then(()=>{
      this.storage.get("RRP_ID").then((rrpid)=>{
        if(rrpid){
          this.dbapi.getRatings_rrpid(rrpid).subscribe(ratings=>{
            this.RH_Ratings = ratings
          })
          this.dbapi.getRHDetails_rrpid(rrpid).subscribe(rdets=>{
            this.RRP_Name = rdets.RRP_Name
          })
        }else{
          this.storage.get("r_to_vst").then(rid=>{
            this.dbapi.getRatings_rrpid(rid).subscribe(rates=>{
              this.RH_Ratings = rates
            })
            this.dbapi.getRHDetails_rrpid(rid).subscribe(rdet=>{
              this.RRP_Name = rdet.RRP_Name
            })
          })
        }
      })
    })
  }



}
