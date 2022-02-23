import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService
  ) { }
  segmentValue = "unchecked"
  Checklist : any
  

  filter(a: string){
    this.segmentValue = a
  }

  check(id:number, state: boolean){
    this.Checklist.map((val, i)=>{
      if(this.Checklist[i].Checklist_Id == id){
        if(this.Checklist[i].Check_Status == false){
          // console.log(this.Checklist[i].RRP_Name,this.Checklist[i].Check_Status)
          this.dbapi.checkAList_chid(this.Checklist[i].Checklist_Id, 1).subscribe(()=>{
           this.Checklist[i].Check_Status = true  
          })
        }else{
          // console.log(this.Checklist[i].RRP_Name,this.Checklist[i].Check_Status)
          this.dbapi.checkAList_chid(this.Checklist[i].Checklist_Id, 0).subscribe(()=>{
           this.Checklist[i].Check_Status = false
          })
        }
      }
    })
  }

  clear(){
    // console.log("Cleared")
    this.Checklist.map((val,i)=>{
      if(this.Checklist[i].Check_Status){
        this.dbapi.deleteAChecklist_chid(this.Checklist[i].Checklist_Id).subscribe(()=>{
          this.Checklist.splice(i,1)
          // console.log(this.Checklist)
          this.clear()
        })
      }
    })
  }

  visit(a:number){
    this.storage.set("r_to_vst", a).then(()=>{
      this.router.navigate(['bhprofileview'])
    })
  }


  
  ionViewDidEnter(){
    this.storage.get("User_ID").then((uid)=>{
      if(uid){
        this.dbapi.getCheclist_uid(uid).subscribe((results)=>{
          if(results.length == 0){
            this.Checklist = null
          }else{
                // console.log(results)
                this.Checklist = results
                this.Checklist.map((val, i)=>{
                  if(this.Checklist[i].Check_Status == 0){
                    this.Checklist[i].Check_Status = false
                  }else{
                    this.Checklist[i].Check_Status = true
                  }
                  this.dbapi.getRHDetails_rrpid(val.RRP_ID).subscribe((rhdetails)=>{
                    this.Checklist[i].RRP_Name = rhdetails.RRP_Name
                  })
                })
          }
        })
      }else{
        this.router.navigate([''])
      }
    })
  }

}
