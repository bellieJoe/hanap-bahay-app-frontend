import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
    private storage : Storage,
    private dbapi :DbapiService,
    private router : Router,
    private tpipe : TitleCasePipe
  ) { }
  conversations = []
  User_ID : number
  searchInput : string
  searchResults = []
  url_src = `${this.dbapi.SERVER}/images/profile/`

  ngOnInit() {
  }

  search(){
    this.searchResults = []
    // console.log(this.searchInput)
    if(this.searchInput != ""){
      this.conversations.map((val,i)=>{
        let name = this.conversations[i].name.toLowerCase()
        if(name.search(this.searchInput.toLowerCase())>= 0){
          this.searchResults.push(this.conversations[i])
        }else{

        }
      })
    }else{
      this.searchResults = []
    }
    
  }

  delete(convoid:number){
    this.dbapi.deleteConvo(convoid,this.User_ID).subscribe(()=>{
      this.dbapi.getConvos_uid(this.User_ID).subscribe(cons=>{
        if(cons.length > 0){
          this.conversations = cons
          this.completeDetails()
          this.loadProfileImages()
        }else{
          this.conversations = null
        }
      })
    })
  }

  view(convoid : number){
    this.storage.set("conv_dets", {convid: convoid}).then(()=>{
      this.router.navigate(["/message/conversation"])
    })
  }

  completeDetails(){
    this.conversations.map((val, i)=>{
      if(this.conversations[i].Type == "tenant to rrp"){
        console.log("nagana yung tenant to rrp")
        this.dbapi.getRHDetails_rrpid(this.conversations[i].RRP_ID).subscribe(res=>{
          this.conversations[i].name = res.RRP_Name
        })
      }else{
        if(this.conversations[i].Receiver_A == this.User_ID){
          this.dbapi.getUserDetails_id(this.conversations[i].Receiver_B).subscribe(res=>{
            let name = this.tpipe.transform(res[0].Firstname + " " + res[0].Lastname)
            this.conversations[i].name = name
          })
        }else if(this.conversations[i].Receiver_B == this.User_ID){
          this.dbapi.getUserDetails_id(this.conversations[i].Receiver_A).subscribe(res=>{
            let name = this.tpipe.transform(res[0].Firstname + " " + res[0].Lastname)
            this.conversations[i].name = name
          })
        }else{}
      }
    })
  }

  loadProfileImages(){
    this.conversations.map((val,i)=>{
      // console.log(val)
      if(this.conversations[i].Type == "tenant to rrp"){
        this.dbapi.fetchImage(this.conversations[i].RRP_ID, "bh-profile").subscribe(image => {
          if(image){
            this.conversations[i].image_src = `${this.url_src}${image.IMG_Filename}.png?` + new Date().getTime()
          }else{
            this.conversations[i].image_src = null
          }
        })
      }else if(this.conversations[i].Type == "user to user"){
        if(this.User_ID == this.conversations[i].Receiver_A){
          this.dbapi.fetchImage(this.conversations[i].Receiver_B, "user-profile").subscribe(image => {
            if(image){
              this.conversations[i].image_src = `${this.url_src}${image.IMG_Filename}.png?` + new Date().getTime()
            }else{
              this.conversations[i].image_src = null
            }
          })
        }else if(this.User_ID == this.conversations[i].Receiver_B){
          this.dbapi.fetchImage(this.conversations[i].Receiver_A, "user-profile").subscribe(image => {
            if(image){
              this.conversations[i].image_src = `${this.url_src}${image.IMG_Filename}.png?` + new Date().getTime()
            }else{
              this.conversations[i].image_src = null
            }
          })
        }
        
      }
    })
  }

  countNewMessage(){
    this.conversations.map((val,i)=>{
      this.dbapi.countNewMessages(this.conversations[i].Conversation_ID, this.User_ID).subscribe(count=>{
        this.conversations[i].badge_value = count
      })
    })
  }

  ionViewDidLeave(){
    this.conversations = []
  }

  loadConvo(){
    this.dbapi.getConvos_uid(this.User_ID).subscribe((convs)=>{
      // console.log(convs.length)
      if(convs.length > 0){
        if(this.conversations.length == convs.length){
          this.countNewMessage()
        }else{
          this.conversations = convs
          this.countNewMessage()
          this.completeDetails()
          this.loadProfileImages()
        }
        
      }else{
        this.conversations = null
      }
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid =>{
      if(uid){
        this.User_ID = uid
        this.loadConvo()
        setInterval(()=>{
          if(this.router.url == "/message"){
            this.loadConvo()
          }
        }, 3000)

      }else{
        this.router.navigate([''])
      }
    })
  }

}
