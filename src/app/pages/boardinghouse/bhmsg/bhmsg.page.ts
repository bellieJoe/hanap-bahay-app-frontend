import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { BhmenuPage } from '../bhmenu/bhmenu.page';

@Component({
  selector: 'app-bhmsg',
  templateUrl: './bhmsg.page.html',
  styleUrls: ['./bhmsg.page.scss'],
})
export class BhmsgPage implements OnInit {

  constructor(
    public popoverController: PopoverController,
    private storage: Storage,
    private dbapi : DbapiService,
    private userservice : UserserviceService,
    private router : Router,
    private tpipe : TitleCasePipe
  ) { }

  BH_Name : string
  searchInput : string = null
  User_ID : number
  conversations = []
  searchResults = []
  RRP_ID : number
  url_image = `${this.dbapi.SERVER}/images/profile/`

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BhmenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  completeDetails(){
    this.conversations.map((val, i)=>{
      this.dbapi.getUserDetails_id(this.conversations[i].Receiver_A).subscribe(res=>{
        let name = this.tpipe.transform(res[0].Firstname + " " + res[0].Lastname)
        this.conversations[i].name = name
      })
    })
  }

  view(convoid : number){

    this.storage.set("conv_dets", {convid: convoid}).then(()=>{
      this.router.navigate(['/message/conversation'])
    })
  }
  search(){
    if(this.searchInput != undefined && this.searchInput.trim() != "" && this.searchInput != null && this.searchInput != ""){  // validate input
      this.searchResults = []
      this.conversations.map((val, i)=>{
        let name = this.conversations[i].name.toLowerCase()
        // console.log(`${name.search(this.searchInput.toLowerCase())} ${val.name}`)
        if(name.search(this.searchInput.toLowerCase()) != -1){
          this.searchResults.push(this.conversations[i])
          // console.log(val.name)
        }
      })
    }else{
      this.searchResults = []
    }
  }
  delete(convoid:number){
    this.dbapi.deleteConvo(convoid,this.RRP_ID, 'rrp').subscribe(()=>{
      this.dbapi.getConvos_rrpid(this.RRP_ID).subscribe(condets=>{
        if(condets.length > 0){
          this.conversations = condets
          this.completeDetails()
          // console.log(this.conversations)
          this.loadProfileImage()
        }else{
          this.conversations = null
        }
      })

    })
  }

  loadProfileImage(){
    this.conversations.map((val,i)=>{
      // console.log(val)
      this.dbapi.fetchImage(this.conversations[i].Receiver_A, "user-profile").subscribe(image=>{
        if(image){
          this.conversations[i].image_src = `${this.url_image}${image.IMG_Filename}.png?` + new Date().getTime()
        }else{
          this.conversations[i].image_src = null
        }
      })
    })
  }

  countNewMessages(){
    this.conversations.map((val,i)=>{
      this.dbapi.countNewMessages(this.conversations[i].Conversation_ID, this.RRP_ID).subscribe(count=>{
        this.conversations[i].badge_value = count
      })
    })
  }

  ionViewDidEnter(){
    this.storage.get("RRP_Name").then((val)=>{
      this.BH_Name = val

    })
    this.storage.get("User_Type").then(type=>{
      this.userservice.isOwner(type)
      
    })  
    

    this.storage.get("User_ID").then(uid =>{
      this.userservice.isAuth(uid)
      this.User_ID = uid
      this.storage.get("RRP_ID").then(rrpid=>{
        this.RRP_ID = rrpid
        this.dbapi.getRHDetails_rrpid(rrpid).subscribe(rdets=>{
          if(rdets.Owner_ID != uid){
            this.router.navigate([''])
          }
        })
        this.dbapi.getConvos_rrpid(rrpid).subscribe(condets=>{
          if(condets.length > 0){
            this.conversations = condets
            this.completeDetails()
            this.loadProfileImage()
            this.countNewMessages()
            // console.log(this.conversations)
          }else{
            this.conversations = null
          }
        })
      })

    })
  }

}
