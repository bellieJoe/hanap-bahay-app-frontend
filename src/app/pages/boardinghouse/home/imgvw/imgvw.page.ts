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
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  RRP_ID : number
  bhImg : any
  url_image = `${this.dbapi.SERVER}/images/rh_extra_image/`
  grouped = []
  imageGroup = []
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

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
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
      console.log(this.imageGroup)
    })
  }

  edit(id:number, part:string, title:string,description:string, filename:string){
    let params = {
      IMG_ID : id,
      Type : part,
      Title : title,
      Description : description,
      IMG_Filename : filename
    }
    this.storage.set("edit_image", params).then(()=>{
      this.router.navigate(['/boardinghouse/home/img-edit'])
    })
  }

  async deletePhoto(id:number, filename : string){
    const alert = await this.alertController.create({
      header: 'Delete photo',
      message: 'Are you sure you want to delete this image?',
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          handler: ()=>{
            let load = this.loadingController.create({
              spinner: "bubbles",
              message: "Deleting Image"
            })
            load.then(res=>{
              res.present()
              this.dbapi.deleteImage(id, filename).subscribe(status=>{
                if(status == "OK"){
                  res.dismiss()
                  this.presentToast("An Image was deleted")
                  this.fetchImages()
                }else{
                  res.dismiss()
                  this.presentAlert("Error occured while deleting the Image", "Error")
                }
              })
            })
          }
        }
      ]
    });
    await alert.present();
    
  }

  viewImage(id:number){
    let img = document.getElementById(id.toString())
    let con = document.getElementById(`con${id}`)
    let des = document.getElementById(`des${id}`)
    if(img.clientWidth == 150){
      img.style.width = "100%"
      con.style.width = "100%"
      con.style.paddingLeft = "0px"
      con.style.paddingRight = "0px"
      con.style.border = "1px solid rgb(219, 219, 219)"
      des.style.display = "flex"
      this.bhImg.map((val,i)=>{
        if(val.IMG_ID != id){
         let b = document.getElementById(val.IMG_ID.toString())
         let c = document.getElementById(`con${val.IMG_ID.toString()}`)
         let d = document.getElementById(`des${val.IMG_ID.toString()}`)
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
    this.imageGroup.map((val, i)=>{
      this.imageGroup.map((val1, i1)=>{
        if(i == i1){

        }else{
          if(val == val1){
            this.imageGroup[i] = null
          }
        }
      })
    })
  }

  ionViewDidEnter(){
    this.storage.get("User_Type").then(type=>{
      if(type == "property owner"){
        this.storage.get("RRP_ID").then(rrpid=>{
          this.RRP_ID = rrpid
          this.fetchImages()
  
        })
        this.storage.get("RRP_Name").then(rrp_name=>{
          this.RRP_Name = rrp_name
        })
      }else{
        this.router.navigate([''])
      }
    })
  }

  ionViewDidLeave(){
    this.bhImg = null
    this.imageGroup = []
  }

}
