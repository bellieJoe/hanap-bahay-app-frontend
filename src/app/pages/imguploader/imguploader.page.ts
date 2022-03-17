import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonImg, IonInput, IonSlides, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { FILE } from 'dns';
import { Storage } from '@ionic/storage';
import { image, ImageProps } from 'src/app/providers/policy';
import { profile } from 'console';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';




@Component({
  selector: 'app-imguploader',
  templateUrl: './imguploader.page.html',
  styleUrls: ['./imguploader.page.scss'],
  
})
export class ImguploaderPage {

  constructor(
    private modalController: ModalController,
    private dbapi : DbapiService,
    private loadingController: LoadingController,
    private storage : Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private datePipe : DatePipe,
    private platform : Platform,
    private camera: Camera,
    private router : Router
  ) { }

  @ViewChild("cropper") cropper : ImageCropperComponent
  @ViewChild("slider") slider : IonSlides
  @ViewChild("imageSelect" ) imageSelect : IonInput
  @Input() upload_type : string
  @Input() bh_id : number

  imageView : any
  data: any;
  cropperSettings: CropperSettings;
  picture = new Image()
  filechange : any = null
  assigned : boolean = false

  async upload(){
    try {
      let load = await this.loadingController.create({
        spinner: "bubbles",
        message : "Uploading image.."
      })

      let uid = await this.storage.get("User_ID")

      let base64 = this.data.image.split(",", 2)
        let base64text = base64[1]
        let Today = new Date()
        let image : ImageProps =  {
          base64string : base64text,
          url_extension : null,
          filename : null,
          id : null,
          type : this.upload_type,
          date : this.datePipe.transform(Today, "yyyy-MM-dd"),
          title : null,
          part : null,
          description : null
        }
        if(this.upload_type == "user-profile"){
          image.filename = `user_${uid}`
          image.url_extension = "profile"
          image.id = uid
        }else if(this.upload_type == "bh-profile"){
          image.filename = `bh_${this.bh_id}`
          image.url_extension = "profile"
          image.id = this.bh_id
        }
        
        await load.present()
        await new Promise((resolve, reject) => {
          this.dbapi.setProfilePicture(image).subscribe(status=>{

            this.presentToast("Image uploaded successfully")
            this.modalController.dismiss({
              "success" : true
            })
            resolve(null)
            
          })
        }) 
        await load.dismiss()
        
    } catch (error) {
      console.log(error)
      this.showErrorPrompt()
    }
  }

  showErrorPrompt(){
    let presentAlert = async() => {
      const alert = await this.alertController.create({
        header: "Oopps..",
        message: "Unexpected Error occured.",
        backdropDismiss: false,
        buttons: ['Ok']
      })
      await alert.present()

      await alert.onDidDismiss()
      // this.router.navigate([''])
      this.modalController.dismiss({
        "success" : false
      })
    }
    presentAlert()
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

  initCropper(){
    let wrapper = document.getElementById("wrapper")
    this.cropperSettings = new CropperSettings()
    this.cropperSettings.canvasWidth = wrapper.clientWidth
    this.cropperSettings.cropperDrawSettings.strokeColor = "#00B8C1"
    this.cropperSettings.showCenterMarker = false
    this.cropperSettings.markerSizeMultiplier = .5
    this.cropperSettings.minWithRelativeToResolution = false
    this.cropperSettings.noFileInput = true
    this.data = {};
  }

  backSwipe(){
    this.slider.slidePrev()
  }

  nextSwipe(){
    this.slider.slideNext()
  }

  fileChangeEvent(): void {
    console.log("nag file change event")
    this.assigned = true
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
          res.dismiss()
          this.slider.slideNext()
        }
      })
    })

  }

  pickImage(){
    this.imageSelect.getInputElement().then(inputelem =>{
      inputelem.click()
      console.log("naclick")
    })

  }

  dismiss(){
    this.modalController.dismiss({
      "success" : false
    })
  }

  checkUploadType(){
    if(this.upload_type == "user-profile" || this.upload_type == "bh-profile"){
      console.log("user profile ups")
      this.cropperSettings.width = 200
      this.cropperSettings.height = 200
      this.cropperSettings.croppedWidth = 200
      this.cropperSettings.croppedHeight = 200
      this.cropperSettings.centerTouchRadius = 60
    }else if(this.upload_type == "bh-image"){
      this.cropperSettings.width = 820
      this.cropperSettings.height = 450
      this.cropperSettings.croppedWidth = 820
      this.cropperSettings.croppedHeight = 450
      this.cropperSettings.centerTouchRadius = 100
      console.log("no")
    }
  }

  isAndroid : boolean = false
  ionViewDidEnter(){
    this.initCropper()
    this.checkUploadType()

    if(this.platform.is("mobile") && !this.platform.is("mobileweb")){
      this.isAndroid = true
    }else{
      this.isAndroid = false
    }
    
  }

}
