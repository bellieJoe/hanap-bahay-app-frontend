import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { image, ImageProps } from 'src/app/providers/policy';


@Component({
  selector: 'app-imgupld',
  templateUrl: './imgupld.page.html',
  styleUrls: ['./imgupld.page.scss'],
})
export class ImgupldPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private storage : Storage,
    private router : Router,
    private dbapi : DbapiService,
    private datePipe : DatePipe,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  @ViewChild("imageSelect" ) imageSelect : IonInput;
  @ViewChild("cropper") cropper : ImageCropperComponent;

  cropperSettings: CropperSettings
  data: any
  picture = new Image()
  filechange : any = null
  phase = 1
  part : string = "Living Room"
  bh_id : number
  upload_type ="bh-image"
  Description : string = null
  Title : string = null
  SelectedPart : string = null

  async presentToast(con:string) {
    const toast = await this.toastController.create({
      message: con,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(con:string, head:string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  upload(){
    let load = this.loadingController.create({
      spinner: "bubbles",
      message : "Uploading image.."
    })
    let base64 = this.data.image.split(",",2)
    let base64text = base64[1]
    let Today = new Date()
    let image : ImageProps =  {
      base64string : base64text,
      url_extension : null,
      filename : null,
      id : null,
      type : this.upload_type,
      date : this.datePipe.transform(Today, "yyyy-MM-dd"),
      title : this.Title,
      description : this.Description,
      part : null  
    }
    if(this.part == "Others"){
      image.part = this.SelectedPart
    }else{
      image.part = this.part
    }
    image.filename = `rhx_${this.bh_id}`
    image.url_extension = "rh_extra_image"
    image.id = this.bh_id

    load.then(res=>{
      res.present()
      this.dbapi.setProfilePicture(image).subscribe(status=>{
        res.dismiss().then(()=>{
          if(status == "OK"){
            this.presentToast("Image uploaded successfully")
            this.router.navigate(["/boardinghouse/home/imgvw"])
          }else{
            this.presentAlert("Error occured while uploading the image", "Im sorry")
            this.router.navigate(["/boardinghouse/home/imgvw"])
          }
        })
        
      })
      console.log(image)
    })
  }

  uploadAll(){
    if(this.part == "Others"){
      if(this.SelectedPart && this.SelectedPart.trim() != ""){
        this.upload()
      }else{
        this.presentAlert("Please Specify which part of the Rental House is this", "Alert")
      }
    }else{
      this.upload()
    }
  }

  initCropper(){
    let wrapper = document.getElementById("wrapper")
    this.cropperSettings = new CropperSettings()
    this.cropperSettings.canvasWidth = 360
    this.cropperSettings.cropperDrawSettings.strokeColor = "#00B8C1"
    this.cropperSettings.showCenterMarker = false
    this.cropperSettings.markerSizeMultiplier = .5
    this.cropperSettings.minWithRelativeToResolution = false
    this.cropperSettings.noFileInput = true

    this.cropperSettings.width = 820
    this.cropperSettings.height = 450
    this.cropperSettings.croppedWidth = 820
    this.cropperSettings.croppedHeight = 450
    this.cropperSettings.centerTouchRadius = 100
    this.data = {}
  }

  crop(){
    this.phase = 3
  }

  pickImage(){
    this.imageSelect.getInputElement().then(inputelem =>{
      inputelem.click()
      console.log("naclick")
    })
  }

  fileChangeEvent(){
    console.log("file change event fired...")
    this.phase = 2
    this.imageSelect.getInputElement().then(elem=>{
      let load = this.loadingController.create({
        spinner: "bubbles",
        message: "Fetching Image",
      })
      
      load.then(res=>{
        res.present()
        this.filechange = elem
        const file: File = elem.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (event : any) =>{
          this.picture.src  = event.target.result
          this.cropper.setImage(this.picture)
        }
        res.dismiss()
      })
    })

  }

  chevron_icon = "chevron-down"
  showOptions(){
    let part = document.getElementById("part")
    if(part.clientHeight < 50){
      part.style.height = "fit-content"
      this.chevron_icon = "chevron-up"
    }else{
      part.style.height = "2.7em"
      this.chevron_icon = "chevron-down"
    }
  }

  ionViewDidEnter(){  
    this.initCropper()
    this.storage.get("User_Type").then(utype=>{
      if(utype == "property owner"){
        this.storage.get("RRP_ID").then(rrpid=>{
          this.bh_id = rrpid
        })
      }else{
        this.router.navigate([''])
      }
    })
  }

  ionViewDidLeave(){
    this.data = null
    // this.filechange = null
    this.phase = 1
    this.part = "Living Room"
    this.chevron_icon = "chevron-down"
  }
  
  ngOnInit() {
    
  }

}
