import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap} from '@ionic-native/google-maps';
import { GeolocationOptions ,Geoposition ,PositionError, } from '@ionic-native/geolocation';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { Storage } from '@ionic/storage';
import { RentalHouseDetails } from 'src/app/providers/policy';

declare var google:any;

@Component({
  selector: 'app-cc',
  templateUrl: './cc.page.html',
  styleUrls: ['./cc.page.scss'],
})

export class CcPage {

  @ViewChild('mapElement') mapElement: { nativeElement: any }
  map : any
  options : GeolocationOptions
  onMap : boolean = false
  currentPos : Geoposition;
  calibrating : boolean = false
  RH_Details : RentalHouseDetails = {
    RRP_ID : null,
    RRP_Name : null,
    RRP_Description : null,
    RRP_Capacity : null,
    RRP_Type : null,
    RRP_Address : null,
    RRP_Rent_Rate : null,
    RRP_X_Coordinates : null,
    RRP_Y_Coordinates : null,
    Owner_ID : null,
    Contact_Number : null,
    RRP_Settings: null,
    Photo_Documents:null
  }

 
  


  constructor(
    private modalController : ModalController,
    private geolocation : Geolocation,
    private alertController : AlertController,
    private dbapi : DbapiService,
    private storage : Storage,
    private toastController : ToastController
  ) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentAlert(con : string, head: string) {
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

  
  openMap(){ 
    var coord = { lat: 13.44692637269704, lng : 121.84833109252308}
    this.onMap = true
    
    this.geolocation.getCurrentPosition(this.options).then((resp)=>{
      coord.lat = resp.coords.latitude
      coord.lng = resp.coords.longitude
      this.genMap(coord.lat,coord.lng)
      
    }).catch((err)=>{
      this.genMap(coord.lat,coord.lng)
      
    })
  }

  changeCoord(lat: number , lng:number){
    this.RH_Details.RRP_X_Coordinates = lat
    this.RH_Details.RRP_Y_Coordinates = lng
    this.onMap = false
  }

  genMap(x:number,y:number){
    this.map = new google.maps.Map(this.mapElement.nativeElement,
      {
        // center: {lat: resp.coords.latitude, lng: resp.coords.longitude},
        center: {lat: x, lng: y},
        zoom: 18,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
      });
      

      var controlDiv = document.createElement('button');
      controlDiv.innerHTML = "Close"
      controlDiv.style.padding = ".5em"
      controlDiv.style.margin = "1em"
      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
      google.maps.event.addDomListener(controlDiv, 'click', () =>{
        this.onMap = false
      });

      console.log("nyeta nagbukas namana")
    
      var marker = new google.maps.Marker(
        {
          position: {lat: x, lng: y},
          map: this.map,
          title: 'This is your location',
        }
      );
      let infoWindow = new google.maps.InfoWindow()

      this.map.addListener("click", (loc)=>{
        infoWindow.close()
        // clickLoc = loc
        console.log(loc.latLng.lat())
        infoWindow = new google.maps.InfoWindow({
          content : "<button id='getLoc'  style='padding: .5em;color: white; border-radius:.3em'>" +
                    "Get this Location</button>",
          position: loc.latLng,
          
        })
        google.maps.event.addListener(infoWindow, 'domready', () => {
          const el = document.querySelector('button');
          el.style.backgroundColor = "rgb(11, 125, 218)"
          el.addEventListener('click', () => this.changeCoord(loc.latLng.lat(),loc.latLng.lng()))
        });
        
        infoWindow.open(this.map)
        console.log(JSON.stringify(loc.latLng.toJSON(), null, 2))

      })

      

      marker.addListener("click", ()=>{
        console.log("fdsafdsf")
      })
      
  }

  getUserPosition(){
    this.calibrating = true
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos; 
        this.calibrating = false
        this.RH_Details.RRP_X_Coordinates = pos.coords.latitude  
        this.RH_Details.RRP_Y_Coordinates = pos.coords.longitude

    },(err : PositionError)=>{
      this.calibrating = false
        console.log("error : " + err.message);
        this.presentAlert( err.message,  "Permission Error")
    });
  }

  update(){
    this.dbapi.updateRH(this.RH_Details).subscribe(()=>{
      this.dismiss()
      this.presentToast("Coordinates Successfully Updated")
    })
  }

  
  ionViewDidEnter(){
    // this.getUserPosition()
    this.storage.get("RRP_ID").then((rrpid)=>{
      this.dbapi.getRHDetails_rrpid(rrpid).subscribe((details)=>{
        this.RH_Details  = details
      })
    })
  }



}
