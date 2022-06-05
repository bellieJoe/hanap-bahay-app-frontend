import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { ConversationDetails, Messages } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';



@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage{

  constructor(
    private datePipe : DatePipe,
    private alertController: AlertController,
    private route : ActivatedRoute,
    private dbapi : DbapiService,
    private storage : Storage,
    private router : Router,
    private userservice : UserserviceService,
    private titleCase : TitleCasePipe
  ) { }

  messages : any = [];
  message : string
  name : string
  User_ID : number
  ConversationDetails : any 
  messageProps = {
    id: null,
    type : null
  }
  conTempDetails : any
  viewer_id : number
  

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  send(){
    let date = new Date()
    let dateToday = this.datePipe.transform(date,"yyyy/MM/dd HH:mm:ss")
    let time = this.datePipe.transform(date,"HH:mm:ss")
    console.log(this.ConversationDetails);
    
    if(!this.ConversationDetails || this.ConversationDetails == undefined){
      console.log(this.conTempDetails);
      if(this.conTempDetails.type == "tenant to rrp"){
        this.dbapi.newConvo(this.conTempDetails.uid, null, "tenant to rrp", this.conTempDetails.rrpid).subscribe(()=>{
          this.dbapi.checkConvExist(this.conTempDetails.uid, null, "tenant to rrp", this.conTempDetails.rrpid).subscribe(result=>{
            this.ConversationDetails = result
            console.log(result);
            

            this.send()
          })
        })
      }else{
        this.dbapi.newConvo(this.conTempDetails.uid, this.conTempDetails.uid_B, "user to user", null).subscribe(()=>{
          this.dbapi.checkConvExist(this.conTempDetails.uid, this.conTempDetails.uid_B, "user to user", null).subscribe(result=>{
            this.ConversationDetails = result
            console.log(result);
            this.send()
          })
        })
        
      }
    }else{

      let Convo_ID = this.ConversationDetails.Conversation_ID

      if(this.message){
        const conview = document.getElementById("conv-view") as HTMLDivElement
        if(this.ConversationDetails.Type == "tenant to rrp"){
          if(this.User_ID == this.ConversationDetails.Receiver_A){
            // this is atenant messaging the house
            this.dbapi.addMessage(Convo_ID,this.ConversationDetails.Receiver_A,this.message,dateToday,conview.scrollHeight).subscribe(()=>{
              console.log(Convo_ID,this.ConversationDetails.Receiver_A,this.message,dateToday,conview.scrollHeight);
              
              this.fetchMessages()  
              this.message = null
            })
          }else{
            // this is a house messaging a tenant
            this.dbapi.addMessage(Convo_ID,this.ConversationDetails.RRP_ID,this.message,dateToday,conview.scrollHeight).subscribe(()=>{
              console.log(Convo_ID,this.ConversationDetails.Receiver_A,this.message,dateToday,conview.scrollHeight);
              this.fetchMessages()  
              this.message = null
            })
          }
        }else{
          this.dbapi.addMessage(Convo_ID,this.User_ID,this.message,dateToday,conview.scrollHeight).subscribe(()=>{
            console.log(Convo_ID,this.ConversationDetails.Receiver_A,this.message,dateToday,conview.scrollHeight);
            this.fetchMessages()  
            this.message = null
          })
        }
        
      }else{
        this.message = null
        this.presentAlert("Empty Message!","Unable to send")
      }
    }
    
  
  }

  fetchMessages(){
    setInterval(()=>{
      // console.log(this.router.url)
      if(this.router.url == "/message/conversation"){
        this.dbapi.fetchMessages(this.ConversationDetails.Conversation_ID).subscribe((messages:any)=>{
          this.messages = messages
          this.messages.map((val,i)=>{
            console.log(val)
            if(this.messages[i].Is_Read == 0 && this.messages[i].From_ID != this.viewer_id){
              this.dbapi.setMessageRead(this.messages[i].Message_ID).subscribe()
            }
          })
          this.slideLast()
          if(this.User_ID == this.ConversationDetails.Receiver_A || this.User_ID == this.ConversationDetails.Receiver_B){
            this.messages.map((val,i)=>{
              if(this.messages[i].From_ID == this.User_ID){
                this.messages[i].class = "you"
              }else{
                this.messages[i].class = "him"
              }
            })
          }else{
            this.messages.map((val,i)=>{
              if(this.messages[i].From_ID == this.ConversationDetails.RRP_ID){
                this.messages[i].class = "you"
              }else{
                this.messages[i].class = "him"
              }
            })
          }
          
          this.messages[this.messages.length - 1].marker = "last"
        })
        this.slideLast()

      }
      
    }, 1000)

  }

  slideLast(){
    const conview : any = document.getElementById("conv-view") as HTMLDivElement
    conview.scrollTop = conview.scrollHeight + 48
  }


  ionViewDidLeave(){
    this.storage.remove("conv_dets")
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      if(uid){
        this.User_ID = uid
        this.storage.get("conv_dets").then(conv=>{
          this.conTempDetails = conv
          if(conv.convid != undefined){
            // code here when came from convo list
            this.dbapi.getConvoDets(conv.convid).subscribe(cdets=>{
              console.log(cdets)
              this.ConversationDetails = cdets
              this.fetchMessages()
              if(this.ConversationDetails.Type == "tenant to rrp"){
                if(this.User_ID == this.ConversationDetails.Receiver_A){
                  this.viewer_id = this.User_ID
                  this.dbapi.getRHDetails_rrpid(this.ConversationDetails.RRP_ID).subscribe(rdets=>{
                    this.name = rdets.RRP_Name
                  })
                }else{
                  this.viewer_id = this.ConversationDetails.RRP_ID
                  this.dbapi.getUserDetails_id(this.ConversationDetails.Receiver_A).subscribe(udets=>{
                    this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                  })
                }
              }else{
                this.viewer_id = this.User_ID
                if(this.User_ID == this.ConversationDetails.Receiver_A){
                  this.dbapi.getUserDetails_id(this.ConversationDetails.Receiver_B).subscribe(udets=>{
                    this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                  })
                }else{
                  this.dbapi.getUserDetails_id(this.ConversationDetails.Receiver_A).subscribe(udets=>{
                    console.log(this.ConversationDetails.Receiver_A)
                    this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                  })
                }
              }
            })
          }else{
            // code here if not from convo list
            if(conv.type == "tenant to rrp"){
              this.dbapi.checkConvExist(conv.uid, null, "tenant to rrp", conv.rrpid).subscribe((result:any)=>{
                if(result && result.length > 0){
                  this.ConversationDetails = result[0]
                  console.log(result)
                  this.fetchMessages()
                  if(this.User_ID == this.ConversationDetails.Receiver_A){
                    this.viewer_id = this.User_ID
                    this.dbapi.getRHDetails_rrpid(this.ConversationDetails.RRP_ID).subscribe(rdets=>{
                      this.name = rdets.RRP_Name
                    })
                  }else{
                    this.viewer_id = this.ConversationDetails.RRP_ID
                    this.dbapi.getUserDetails_id(this.ConversationDetails.Receiver_A).subscribe(udets=>{
                      this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                    })
                  }
                  

                }else{
                  // code for no convo do nothing
                  if(this.User_ID == conv.uid){
                    this.viewer_id = this.User_ID
                    this.dbapi.getRHDetails_rrpid(conv.rrpid).subscribe(rdets=>{
                      this.name = rdets.RRP_Name
                    })
                  }else{
                    this.viewer_id = conv.rrpid
                    this.dbapi.getUserDetails_id(conv.uid).subscribe(udets=>{
                      this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                    })
                  }

                }
  
              })
            }else if(conv.type == "user to user"){
             
              this.dbapi.checkConvExist(conv.uid, conv.uid_B, "user to user", null).subscribe((result:any)=>{
                console.log(result)
                if(result && result.length > 0){
                  this.ConversationDetails = result[0]
                  this.fetchMessages()
                  this.viewer_id = this.User_ID
                  if(this.User_ID == this.ConversationDetails.Receiver_A){
                    this.dbapi.getUserDetails_id(this.ConversationDetails.Receiver_B).subscribe(udets=>{
                      this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                    })
                  }else{
                    this.dbapi.getUserDetails_id(this.ConversationDetails.Receiver_A).subscribe(udets=>{
                      this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                    })
                  }

                }else{
                  // code for no convo do nothing
                  this.viewer_id = this.User_ID
                  if(this.User_ID == conv.uid){
                    this.dbapi.getUserDetails_id(conv.uid_B).subscribe(udets=>{
                      this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                    })
                  }else if(this.User_ID == conv.uid_B ){
                    this.dbapi.getUserDetails_id(conv.uid).subscribe(udets=>{
                      this.name = `${this.titleCase.transform(udets[0].Firstname)} ${this.titleCase.transform(udets[0].Middlename.slice(0,1))}. ${this.titleCase.transform(udets[0].Lastname)}`
                    })
                  }

                }
  
              })
            }
          }
          
        })
      }else{
        this.router.navigate([''])
      }
    })
    
  }

}
