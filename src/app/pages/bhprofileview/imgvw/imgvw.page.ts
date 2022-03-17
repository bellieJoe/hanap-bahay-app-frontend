import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-imgvw',
  templateUrl: './imgvw.page.html',
  styleUrls: ['./imgvw.page.scss'],
})
export class ImgvwPage implements OnInit {

  constructor(
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private alertController: AlertController,
  ) { }

  RRP_ID : number
  bhImg : any
  url_image = `${this.dbapi.SERVER}/images/rh_extra_image/`
  grouped : any = []
  imageGroup : any = []
  RRP_Name : string

  ngOnInit() {
  }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
    await alert.present();
  }


  fetchImages(){
    this.dbapi.fetchImages_rrpid(this.RRP_ID).subscribe(images =>{
      if(images.length == 0){
        this.bhImg = null
      }else{
        this.bhImg = images
        this.bhImg.map((val, i)=>{
          this.bhImg[i].url = `${this.url_image}${this.bhImg[i].IMG_Filename}.png?` + new Date().getTime()
        })
      }
      this.groupImage()
    })
  }


  viewImage(id:number){
    let img : any = document.getElementById(id.toString())
    let con : any = document.getElementById(`con${id}`)
    let des : any = document.getElementById(`des${id}`)
    if(img.clientWidth == 150){
      img.style.width = "100%"
      con.style.width = "100%"
      con.style.paddingLeft = "0px"
      con.style.paddingRight = "0px"
      con.style.border = "1px solid rgb(219, 219, 219)"
      des.style.display = "flex"
      this.bhImg.map((val,i)=>{
        if(val.IMG_ID != id){
         let b : any = document.getElementById(val.IMG_ID.toString())
         let c : any = document.getElementById(`con${val.IMG_ID.toString()}`)
         let d : any = document.getElementById(`des${val.IMG_ID.toString()}`)
         b.style.width = "150px"
         c.style.paddingLeft = ".5em"
         c.style.paddingRight = ".5em"
         c.style.border = "none"
         c.style.width = "166px"
         d.style.display = "none"
        }
      })
    }else{
      img.style.width = "150px"
      con.style.paddingLeft = ".5em"
      con.style.paddingRight = ".5em"
      con.style.width = "166px"
      con.style.border = "none"
      des.style.display = "none"
    }
  }

  groupImage(){
    console.log(this.bhImg)
    this.bhImg.map((val, i)=>{
      this.imageGroup.push(val.Type)
    })
    console.log(this.imageGroup)
    // this.imageGroup.map((val, i)=>{
    //   this.imageGroup.map((val1, i1)=>{
    //     if(i == i1){

    //     }else{
    //       if(val == val1){
    //         this.imageGroup[i] = null
    //       }
    //     }
    //   })
    // })
  }

  ionViewDidEnter(){
    this.storage.get("User_ID").then(uid=>{
      if(uid){
        this.storage.get("r_to_vst").then(rrpid=>{
          this.RRP_ID = rrpid
          this.dbapi.getRHDetails_rrpid(this.RRP_ID).subscribe(rdets=>{
            this.RRP_Name = rdets.RRP_Name
          })
          this.fetchImages()
  
        })
        
      }else{
        // this.router.navigate([''])
        this.storage.get("r_to_vst").then(rrpid=>{
          if(rrpid){
            this.RRP_ID = rrpid
            this.dbapi.getRHDetails_rrpid(this.RRP_ID).subscribe(rdets=>{
              this.RRP_Name = rdets.RRP_Name
            })
            this.fetchImages()
          }else{
            this.router.navigate(['/map'])
          }

        })
      }

    })
  }

  ionViewDidLeave(){
    this.bhImg = null
    this.imageGroup = []
  }

}
