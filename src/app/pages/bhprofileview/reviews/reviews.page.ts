import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RatingsDetails } from 'src/app/providers/policy';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage{

  RH_Ratings : RatingsDetails[]
  RRP_Name : string

  constructor(
    private dbapi : DbapiService,
    private storage : Storage,
    private router : Router
  ) { }

  // ionViewDidEnter(){
  //   // this.storage.get("User_ID").then((val)=>{
  //   //   if(val){
  //   //     console.log(val)
        
  //   //   }else{
  //   //     this.router.navigate([''])
  //   //   }
  //   // })
  //   // this.storage.get("RRP_ID").then((rrpid)=>{
  //   //   this.dbapi.getRatings_rrpid(rrpid).subscribe((ratings : RatingsDetails[])=>{
  //   //     this.RH_Ratings = ratings
  //   //   })
  //   //   this.dbapi.getRHDetails_rrpid(rrpid).subscribe(rhdets=>{
  //   //     this.RRP_Name = rhdets.RRP_Name
  //   //   })
      
  //   // }, ()=>{
  //   //   this.storage.get("r_to_vst").then(id=>{
  //   //     this.dbapi.getRatings_rrpid(id).subscribe((ratings : RatingsDetails[])=>{
  //   //       this.RH_Ratings = ratings
  //   //     })
  //   //     this.dbapi.getRHDetails_rrpid(id).subscribe(rhdets=>{
  //   //       this.RRP_Name = rhdets.RRP_Name
  //   //     })
  //   //   })
  //   // })
  //   console.log("opdsadjkhgasfsgujk.i")
  // }

}
