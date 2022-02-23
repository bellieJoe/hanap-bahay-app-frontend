import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, IonSelect, ModalController } from '@ionic/angular';

declare var google : any
interface GetDirProp{
  rrpid : string;
  rrp_name : string;
  rrp_lat : number;
  rrp_lng : number;
  start : string;
  travel_mode : string;
}
@Component({
  selector: 'app-getdir',
  templateUrl: './getdir.page.html',
  styleUrls: ['./getdir.page.scss'],
})

export class GetdirPage  {

  
  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  @ViewChild('searchInput') searchInput: IonInput
  @ViewChild('travelmode') travelmode: IonSelect
  @Input() dirProps : GetDirProp
  loc = {lat: 13.4467302, lng: 121.8486948}
  autocomplete_fields : any = null
  autocomplete = new google.maps.places.AutocompleteService()
  stopSearch : boolean = false
  onSkeleton : boolean = false 
  //  getDirProp = {
  //   rrpid : null,
  //   rrp_name : null,
  //   rrp_lat : null,
  //   rrp_lng : null,
  //   destination : null,
  //   travel_mode : null,
  // }
  
  passData(){
    if(this.searchInput.value && this.travelmode.value){
      this.dirProps.start = this.searchInput.value.toString()
      this.dirProps.travel_mode = this.travelmode.value
      this.modalController.dismiss({
        'dirProps' : this.dirProps
      })
    }else{
      this.presentAlert("Please complete the form")
    }
  }
  async presentAlert(con : string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: con,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async dismiss() {
    this.modalController.dismiss({
      'dismiss' : 'ewan ha',
      
    })
  }
  setInput(i : any){
    this.searchInput.value = i.description
    this.autocomplete_fields = null
    this.stopSearch = true
    this.onSkeleton = false

    let a = this.searchInput.value.toString().split(",").length
    let zoomLevel : number
    if(a == 0){
      zoomLevel = 6
    }else if(a == 2){
      zoomLevel = 10
    }else if(a == 3){
      zoomLevel = 12
    }else if(a == 4){
      zoomLevel = 15
    }else{}
    let placeLocation = new google.maps.Geocoder()
    placeLocation.geocode({'address':this.searchInput.value}, (results)=>{
      this.loc.lat = results[0].geometry.location.lat()
      this.loc.lng = results[0].geometry.location.lng()
      // this.setLocation(this.loc.lat,this.loc.lng, zoomLevel)
      // this.setMarkers()
    })   
    console.log(a)
    console.log(i)
  }
  clearField(){
    this.autocomplete_fields = null
    this.searchInput.value = null
    this.stopSearch = true
    this.onSkeleton = false
    console.log("cleared")

  }
  search(){
    this.autocomplete_fields = null
    if(this.searchInput.value){
      if(!this.stopSearch){
        this.onSkeleton = true
        this.autocomplete.getPlacePredictions(
          {
          input: this.searchInput.value, 
          types: ["establishment"], 
          componentRestrictions: {country: 'ph'}
        },
        (result,status)=>{
          this.autocomplete_fields = result
          this.onSkeleton = false
        })
      }else{
        this.stopSearch = false
        this.onSkeleton = false
      }
    }else{

    }
  }

  ionViewDidEnter(){
    console.log(this.dirProps)
  }

}
