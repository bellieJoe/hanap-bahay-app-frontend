import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
//import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonInput, IonSelect, ModalController, Platform } from '@ionic/angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { RentalHouseDetails } from 'src/app/providers/policy';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { Storage } from '@ionic/storage';
import { GetdirPage } from './getdir/getdir.page';
import { stat } from 'fs';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { __await, __awaiter } from 'tslib';

// import {MarkerClusterer} from 'markerCluster'

declare var google : any;
declare var MarkerClusterer : any

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit{

  InfoWindow = new google.maps.InfoWindow()
  autocomplete_fields : any = null
  options : GeolocationOptions
  loc = {lat: 13.4467302, lng: 121.8486948}
  latLng  = {lat:null, lng: null}
  getDirProps = {
    rrpid : null,
    rrp_name : null,
    rrp_lat : null,
    rrp_lng : null,
    start : null,
    travel_mode : null,
  }
  watchPos : boolean = false
  autocomplete = new google.maps.places.AutocompleteService()
  @ViewChild('mapElement') mapElement: { nativeElement: any }
  @ViewChild('searchInput') searchInput: IonInput;
  map : any
  RH_Details = []
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private platform : Platform,
    private geolocation : Geolocation,
    private dbapi : DbapiService,
    private storage : Storage,
    private modalController: ModalController,
    private alertController: AlertController
    ) {   }

    dirPanel : any 
    dirPanelOpen : boolean = false
    showDirPanel(){
      console.log("Direction Panel opened true ba?")
      this.dirPanel =  document.getElementById("dirPanel")
      if(this.dirPanelOpen){
        this.dirPanelOpen = false
        this.dirPanel.style.height = "2em"
        console.log("False sya")
      }else{
        this.dirPanelOpen = true
        this.dirPanel.style.height = "90%"
        console.log("Oo true")
      }
    }
    validatePlace(){
      if(!this.getDirProps.start || this.getDirProps.start === ""){
        // this.presentAlert("Please complete the form","ALert")
        return false
      }else{
        if(this.getDirProps.travel_mode === null || this.getDirProps.travel_mode == ""){
          // this.presentAlert("Please complete the form","ALert")
          return false
        }else{
          return true
        }
      }
    }
    generateDirection(){
      
      if(this.validatePlace()){
        this.mapInit().then(()=>{
          // this.setMarkers()
          console.log("Param complete")
          this.setDirection()
          this.dirPanel.style.height = "2em"
          this.dirPanelOpen = false
        })
        
      }else{
        this.presentAlert("Error in generating the Directions", "Error")
        console.log("Error: Param not complete")
      }
    }
    onSkeleton2 : boolean = false 
    stopSearch2 : boolean = false
    autocomplete_fields2 : any = null
    searchStart(){
      if(!this.stopSearch2){
        this.autocomplete_fields2 = null
        if(this.getDirProps.start){
          this.onSkeleton2 = true
          this.autocomplete.getPlacePredictions(
            {
            input: this.getDirProps.start,
            types: ["establishment"], 
            componentRestrictions: {country: 'ph'}
            },
            (result,_status)=>{
              this.autocomplete_fields2 = result
              this.onSkeleton2 = false
            })
        }else{

        }
      }else{
        this.stopSearch2 = false
      }
    }
    setInput2(a: any){
      this.getDirProps.start = a
      this.stopSearch2 = true
      this.getDirProps.start = a
      this.autocomplete_fields2 = null
    }
    clearField2(){
      this.autocomplete_fields2 = null
      this.getDirProps.start = null
      this.stopSearch2 = true
      this.onSkeleton2 = false
      console.log("cleared")

    }
    async presentAlert(con: string, head:string) {
      const alert = await this.alertController.create({
        header: head,
        message: con,
        buttons: ['OK']
      });
    
      await alert.present();
    }
    revealLoc(){
      this.options = {
        enableHighAccuracy : true
      };
      if(!this.watchPos){
        this.geolocation.getCurrentPosition(this.options).then((resp) => {
          this.setLocation(resp.coords.latitude, resp.coords.longitude, 17)
          this.watchPosition()
          console.log("gumanasai yung reveal Loc")
  
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }else{
        this.setLocation(this.loc.lat, this.loc.lng, 17)
      }
      
    }

    watchPosition(){
      this.watchPos = true
      this.options = {
        enableHighAccuracy : true
      };
      let yourLoc =  new google.maps.Marker({
        title: "Your Postition",
        animation: google.maps.Animation.DROP,
      })
      let InfoWindow1 = new google.maps.InfoWindow({
        pixelOffset : {width:0, height: -40}
      })   
      let watch = this.geolocation.watchPosition(this.options);
      watch.subscribe((data : any )=> {
        InfoWindow1.close()
        // console.log("watching pos: ",data.coords)
        this.loc.lat = data.coords.latitude
        this.loc.lng = data.coords.longitude
        yourLoc.setPosition({lat:data.coords.latitude, lng: data.coords.longitude})
        yourLoc.setMap(this.map)
        yourLoc.setIcon({url: "../assets/mapicon/mylocation.svg", scaledSize : new google.maps.Size(50,50)})
        
        yourLoc.addListener("click",()=>{
          InfoWindow1.setContent("<label>This is your Location</label>")
          InfoWindow1.setPosition({lat:data.coords.latitude, lng: data.coords.longitude})
          InfoWindow1.open(this.map)
        })
      }); 
    }
    setDirection(){
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      // this.mapini()
      // var thisMap = this.mapini()
      let reqStatus : any
      let request = {
        origin: this.getDirProps.start,
        destination: {lat: this.getDirProps.rrp_lat, lng: this.getDirProps.rrp_lng},
        travelMode: this.getDirProps.travel_mode
      };
      directionsService.route(request, function(result, status) {
        console.log(status)
        reqStatus = status
        if (status == 'OK') {
          console.log(result)
          directionsRenderer.setDirections(result);   
        }else if(status == "ZERO_RESULTS"){
          alert("Cannot Generate Direction, Google Maps returned zero results, try changing the starting point or the travel mode")
        }else{
          console.log(status)
        }
      })
      let statusMessage  = "Unable to generate Directions: " + reqStatus 
      // if(reqStatus != 'OK'){
      //   this.presentAlert(statusMessage, "Alert")
      // }
      directionsRenderer.setMap(this.map);
      this.setMarkers()
      // this.watchPosition()
    }
    clearField(){
      this.autocomplete_fields = null
      this.searchInput.value = null
      this.stopSearch = true
      this.onSkeleton = false
      console.log("cleared")

    }
    stopSearch : boolean = false
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
        this.setLocation(this.loc.lat,this.loc.lng, zoomLevel)
        // this.setMarkers()
      })   
      // console.log(a)
      // console.log(i)
    }
    onSkeleton : boolean = false 
    search(){
      this.autocomplete_fields = null
      if(this.searchInput.value){
        if(!this.stopSearch){
          this.onSkeleton = true
          this.autocomplete.getPlacePredictions(
            {
            input: this.searchInput.value, 
            types: ["geocode"], 
            componentRestrictions: {country: 'ph'}
          },
          (result,_status)=>{
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

    async mapini(){
      this.map = await new google.maps.Map(
      this.mapElement.nativeElement,
      {
        mapTypeId: 'roadmap',
        animations: google.maps.Animation.DROP,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
      })

    }

    setLocation(x:number,y:number,zoom:number){
      this.map.panTo({lat:x,lng:y})
      this.map.setZoom(zoom)
      // alert("location ok")
    }

    async setRHIcons(arr : any){
      this.RH_Details = []
      return new Promise<boolean>(resolve=>{
        arr.map((val,i)=>{
          this.dbapi.countTenant_rrpid(val.RRP_ID).subscribe(count=>{
           let Count = count
           let diff = val.RRP_Capacity - count
           let Icon : string = ""
           if(val.RRP_Type === "room for rent" && diff <= 0){
             Icon = "room_for_rent_red.svg"
           }
           else if(val.RRP_Type === "room for rent" && diff > 0){
             Icon = "room_for_rent.svg"
           }
           else if(val.RRP_Type === "house for rent" && diff <= 0){
             Icon = "house_for_rent_red.svg"
           }
           else if(val.RRP_Type === "house for rent" && diff > 0){
             Icon = "house_for_rent.svg"
           }
           else if(val.RRP_Type === "bed space"  && diff <= 0){
             Icon = "bed_space_red.svg"
           }
           else if(val.RRP_Type === "bed space" && diff > 0){
             Icon = "bed_space.svg"
           }
           else if(val.RRP_Type === "female bed space" && diff <= 0){
             Icon = "female_bed_space_red.svg"
           }
           else if(val.RRP_Type === "female bed space" && diff > 0){
             Icon = "female_bed_space.svg"
           }
           else if(val.RRP_Type === "male bed space" && diff <= 0){
             Icon = "male_bed_space_red.svg"
           }
           else if(val.RRP_Type === "male bed space" && diff > 0){
             Icon = "male_bed_space.svg"
           }
           else{
            Icon = "house_for_rent.svg"
           }
           this.RH_Details.push({
             icon : Icon,
             RRP_Name : val.RRP_Name,
             RRP_X_Coordinates : val.RRP_X_Coordinates,
             RRP_Y_Coordinates : val.RRP_Y_Coordinates,
             RRP_ID : val.RRP_ID,
             RRP_Type : val.RRP_Type,
             Tenant_Count : Count,
             RRP_Capacity : val.RRP_Capacity
           })
          if(arr.length == (i+1)){
            resolve(true)
          }
         })//end count
       })// end of mapping
      })
      
    }

    async mapInit(){
      this.options = {
        enableHighAccuracy : true
      };
      await this.geolocation.getCurrentPosition(this.options).then((resp)=>{
          this.mapini().then(()=>{
            this.setLocation(resp.coords.latitude, resp.coords.longitude, 6)
          })
      },  reject =>{
        this.mapini().then(()=>{
            this.setLocation(this.loc.lat,this.loc.lng, 6)

        })
      })
    }

    setMarkers(){
          // console.log("markers set")
          // console.log("RH Details ready for markers: ", this.RH_Details)
        
          let InfoWindowId : any

          const markers = this.RH_Details.map((location, i)=>{
            return new google.maps.Marker({
              position: {lat: parseFloat(location.RRP_X_Coordinates.toString()), lng: parseFloat(location.RRP_Y_Coordinates.toString())},
              title: location.RRP_Name,
              map: this.map,
              icon: {url: `../assets/mapicon/${this.RH_Details[i].icon}`, scaledSize : new google.maps.Size(27,27)}
            })
          })
          new MarkerClusterer(this.map, markers,  {imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",});
          markers.map((con , i)=>{
            con.addListener("click", ()=>{
                  let link = "'/bhprofileview'"
                    let content = 
                  `<strong><label>${con.title},</label></strong><br>
                  <!--
                  <label>${this.RH_Details[i].RRP_Type},</label><br>
                  <label>Available: ${this.RH_Details[i].RRP_Capacity - this.RH_Details[i].Tenant_Count} </label><br>
                  -->
                  <button  expand='block'  shape='round' id='viewDets'">View Details</button>`+
                  `<br><button id='getDir'>Get Directions</button>`

                  let coords = {lat: parseFloat(this.RH_Details[i].RRP_X_Coordinates.toString()), lng: parseFloat(this.RH_Details[i].RRP_Y_Coordinates.toString())}
                  this.InfoWindow.setContent(content)
                  this.InfoWindow.setPosition(coords)
                  this.InfoWindow.setOptions({
                    pixelOffset : {width:0, height: -27}
                  })
                  this.InfoWindow.open(this.map)           
                  this.storage.set("r_to_vst", this.RH_Details[i].RRP_ID) 
                  InfoWindowId = this.RH_Details[i].RRP_ID
                  this.getDirProps.rrpid = this.RH_Details[i].RRP_ID
                  this.getDirProps.rrp_name = this.RH_Details[i].RRP_Name
                  this.getDirProps.rrp_lat = parseFloat(this.RH_Details[i].RRP_X_Coordinates)
                  this.getDirProps.rrp_lng = parseFloat(this.RH_Details[i].RRP_Y_Coordinates)
            })
            
          }) 
          this.InfoWindow.addListener("domready",()=>{
            let viewButton = document.getElementById("viewDets")
            viewButton.style.padding = ".8em"
            viewButton.style.background = "#1d7ce0"
            viewButton.style.margin = ".5em 0em"
            viewButton.style.color ="white"
            viewButton.style.borderRadius = ".5em"
            viewButton.style.width = "120px"
            viewButton.style.outline = "none"
            viewButton.addEventListener("click",()=>{
              this.storage.set("r_to_vst", InfoWindowId) 
              this.router.navigate(['bhprofileview'])
            })

            let dirButton = document.getElementById("getDir")
            dirButton.style.padding = ".8em"
            dirButton.style.background = "#de940b"
            dirButton.style.margin = ".5em 0em"
            dirButton.style.color ="white"
            dirButton.style.borderRadius = ".5em"
            dirButton.style.width = "120px"
            dirButton.style.outline = "none"
            dirButton.addEventListener("click",()=>{
              
              this.dirPanelOpen = false
              this.showDirPanel()
              this.getDirProps.start = null
              this.getDirProps.travel_mode = null
              // console.log("get direction")
            })
          }) 
          console.log("Markers all set")
        
    }

    async loadRH(){
      return new Promise<any>(resolve=>{
        this.dbapi.getAllRH().subscribe(res => {
          resolve(res)
        })
      })
    }

    RH_Details_Before = []
    updateMarker(){
      this.loadRH().then(res=>{
        this.RH_Details_Before = this.RH_Details
        this.setRHIcons(res).then(isFinish=>{
          // console.log(this.RH_Details , " => ", this.RH_Details_Before)
          if(isFinish){
            if(this.RH_Details_Before.length != this.RH_Details.length){
              this.mapInit().then(()=>{
                this.setMarkers()
              })
            }else if(this.RH_Details_Before.length == this.RH_Details.length){
              let isChange : boolean = false
              this.RH_Details.map((val,i)=>{
                if(this.RH_Details[i].RRP_ID == this.RH_Details_Before[i].RRP_ID){
                  if(this.RH_Details[i].icon == this.RH_Details_Before[i].icon &&
                    this.RH_Details[i].RRP_Name == this.RH_Details_Before[i].RRP_Name && 
                    this.RH_Details[i].RRP_X_Coordinates == this.RH_Details_Before[i].RRP_X_Coordinates &&
                    this.RH_Details[i].RRP_Y_Coordinates == this.RH_Details_Before[i].RRP_Y_Coordinates &&
                    // this.RH_Details[i].RRP_ID == this.RH_Details_Before[i].RRP_ID &&
                    this.RH_Details[i].RRP_Type == this.RH_Details_Before[i].RRP_Type &&
                    this.RH_Details[i].Tenant_Count == this.RH_Details_Before[i].Tenant_Count &&
                    this.RH_Details[i].RRP_Capacity == this.RH_Details_Before[i].RRP_Capacity){
                      // isChange = false
                    }else{
                      isChange = true
                    }
                }
              })
              // console.log("change stat : " , isChange)
              if(isChange){
                this.mapInit().then(()=>{
                  this.setMarkers()
                })
              }
            }else{}
          }
        })
      })
    }

    isAuth : boolean = false
    ionViewDidEnter(){
      this.storage.get("User_ID").then(uid=>{
        if(uid){
          this.isAuth = true
        }else{

        }
      })
    }

    reloadMap(){
      location.href = "map"
      
    }

    ngOnInit(){
      this.loadRH().then((re)=>{
        this.setRHIcons(re).then((status)=>{
          if(status){

            this.mapInit().then(()=>{
              this.setMarkers()
            })

          }
        })
      })
    }




}
