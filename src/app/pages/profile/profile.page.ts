import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonCheckbox, IonButton, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { CreateUserPolicy, UserDetails, UserProfile } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { ImguploaderPage } from '../imguploader/imguploader.page';
import { CpssPage } from './cpss/cpss.page';
import { EditprofPage } from './editprof/editprof.page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  constructor(
    public modalController: ModalController,
    private userservice : UserserviceService,
    private alert : AlertController,
    private router : Router,
    private storage : Storage,
    private dbapi : DbapiService,
    private httpClient: HttpClient,
    private loading : LoadingController
    ) { }

  [x: string]: any;
  isLoading = false

  @ViewChild('enableEdit') enableEditCheck : IonCheckbox;
  @ViewChild('edit1') edit1 : IonButton;
  @ViewChild('edit2') edit2 : IonButton;
  @ViewChild('edit3') edit3 : IonButton;
  @ViewChild('edit4') edit4 : IonButton;
  @ViewChild('edit5') edit5 : IonButton;

  enableEditingButton = document.querySelector('.eEdit');
  User_ID : number
  url_src = `${this.dbapi.SERVER}/images/profile/`
  // url_src = `${this.dbapi.SERVER}/hanap-bahay-app-dbapi/images/profile/`
  img_src : string = null
  enabled : boolean

  user_Details : UserDetails = {
    User_ID: null, 
    Firstname : null,
    Middlename : null,
    Lastname : null,
    Birthdate : null,
    Email : null,
    Address : null,
    Contact_Number : null,
    User_Type : null,
    Is_Boarded : null,
    Username : null,
    Privacy : null
  }

  user_Profile : UserProfile ={
    User_ID : null,
    Occupation : null,
    Work_Address : null,
    Highest_Education : null,
    School_Name : null,
    School_Address  : null,
    Guardian_Name  : null,
    Contact_Number : null,
    Relationship : null,
    Address : null,
  }

  async openImageUploader() {
    const modal = await this.modalController.create({
      component: ImguploaderPage,
      componentProps : {
        "upload_type" : "user-profile",
        "bh_id" : null
        }
    });
  
    await modal.present();
    await modal.onDidDismiss().then(res=>{
      if(res.data.success){
        this.img_src = `${this.url_src}user_${this.User_ID}.png?`+ new Date().getTime()
        // window.location.reload()
      }

    })

  
  }

  async changePassword() {
    const modal = await this.modalController.create({
    component: CpssPage,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

  enableEdited(){

    if(this.enableEditCheck.checked){

      this.enabled = true
    }else{

      this.enabled = false
    }
    
  }

  logout(){
    this.storage.clear()
  }

  editProfile(a:any){
    this.presentModal(a);
  }

  async presentAlert(head:string,cont:string) {
    const alert = await this.alert.create({
      header: head,
      message: cont,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentModal(val:number) {
    const modal = await this.modalController.create({
      component: EditprofPage,
      componentProps: { toEdit: val },
      cssClass: 'edit-prof-modal',
    });
    await modal.present();
    await modal.onDidDismiss();
    // this.ionViewDidEnter();
    this.fetchData()
  }
  
  ngOnInit() {
  }

  loadProfileImage(){
    this.dbapi.fetchImage(this.User_ID, "user-profile").subscribe(image=>{
      if(image){
        this.img_src = `${this.url_src}${image.IMG_Filename}.png?` + new Date().getTime()
      }else{
        this.img_src = null
      }
    })
  }

  fetchData = () => {
    return new Promise((resolve, reject)=> {
      try {
        this.dbapi.getUserDetails_id(this.User_ID).subscribe((policy : UserDetails[])=>{
          this.user_Details = policy[0]
          this.dbapi.getUserProfile_id(this.User_ID).subscribe((profile:UserProfile[])=>{
            this.user_Profile = profile[0] 
            
            if(this.user_Profile.Contact_Number == "0"){
              this.user_Profile.Contact_Number = null;
            }
            resolve(null)
          })
        })
      } catch (error) {
        this.showErrorPrompt()
      }
    })
  }
  
  showErrorPrompt(){
    let presentAlert = async() => {
      const alert = await this.alert.create({
        header: "Oopps..",
        message: "Unexpected Error occured.",
        backdropDismiss: false,
        buttons: ['Ok']
      })
      await alert.present()

      await alert.onDidDismiss()
      this.router.navigate([''])
    }
    presentAlert()
  }

  async ionViewDidEnter(){
    try {
      this.isLoading =  true
      let uid = await this.storage.get("User_ID")
      if(uid){
        this.User_ID = uid
        await this.loadProfileImage()
        await this.fetchData()
        this.isLoading = false
      }else{
        this.router.navigate([''])
      }
    } catch (error) {
      this.showErrorPrompt()
    }
    

    
  }

  


}
