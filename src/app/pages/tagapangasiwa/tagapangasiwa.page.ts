import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';

@Component({
  selector: 'app-tagapangasiwa',
  templateUrl: './tagapangasiwa.page.html',
  styleUrls: ['./tagapangasiwa.page.scss'],
})
export class TagapangasiwaPage {

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private storage : Storage,
    private dbapi : DbapiService,
    private alertController: AlertController
  ) { }

  code : number = 101898
  decoded : string = "8Suix8SuixYnlPXpj375SPxpj378Suix14"
  credentials : any = {
    username : null,
    password : null
  }

  enc(param : number){
    let result : string = ""
    let b = (param / 3) * 9999
    let a = b.toString()
    for(let i = 0; i<a.length ; i++){
      if(a[i] == '1'){
        result += "d3D"
        
      }else if(a[i] == '2'){
        result += "5SPx"

      }else if(a[i] == '3'){
        result += "8Suix"
        
      }else if(a[i] == '4'){
        result += "14"
        
      }else if(a[i] == '5'){
        result += "JkL6"
        
      }else if(a[i] == '6'){
        result += "pj37"
        
      }else if(a[i] == '7'){
        result += "2se"
        
      }else if(a[i] == '8'){
        result += "10p9"
        
      }else if(a[i] == '9'){
        result += "YnlPX"
        
      }

    }
    return result
  }

  navigateToLand(){
    this.router.navigate(['']).then(()=>{
      this.storage.clear()
    })
  }

  async presentAlert(con: string, head : string) {
    const alert = await this.alertController.create({
      header: head,
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  login(){
    if(this.credentials.username && this.credentials.username.trim() != "" 
      && this.credentials.password && this.credentials.password.trim() != ""){
        this.dbapi.loginAdmin(this.credentials).subscribe(resp=>{
          if(resp == "valid credentials"){
            this.dbapi.getAdminDetails_uname(this.credentials.username).subscribe(adet=>{
              this.storage.set("ad_session", {uid: adet.Admin_ID, role: adet.Role}).then(()=>{
                this.credentials.username = null
                this.credentials.password = null
                this.router.navigate(['tagapangasiwa/dashboard'])
              })
            })
          }else if(resp == "wrong password"){
            this.presentAlert("Incorrect Password", "Alert")
          }else if(resp == "invalid username"){
            this.presentAlert("Invalid Username", "Alert")
          }else{
            this.presentAlert("Unexpected Error Occured. Please try again.", "Error")
          }
        })
    }else{
      this.presentAlert("Please provide a complete input", "Alert")
    }
    
  }

  checkSession(){
    this.storage.get("ad_session").then(ad_session=>{
      if(ad_session){
        this.router.navigate(['tagapangasiwa/dashboard'])
      }
    })
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe(param=>{
      if(param){
        if(this.enc(param.kodigo) == this.decoded){
          this.checkSession()
        }else{
          this.navigateToLand()
        }
      }else{
        this.navigateToLand()
      }
      
    })
  }


}
