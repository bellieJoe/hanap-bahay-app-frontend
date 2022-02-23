import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, IonSlides, ModalController } from '@ionic/angular';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { RentalHouseDetails } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { HtmlInfoWindow } from '@ionic-native/google-maps';
import { visitAll } from '@angular/compiler';
import { Router } from '@angular/router';


declare var google:any;
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})

export class SubscribePage implements OnInit {

  constructor(
    public modalController: ModalController,
    private alert : AlertController,
    private dbapi : DbapiService,
    private userservice : UserserviceService,
    private geolocation : Geolocation,
    private router : Router
  ) { }



  @ViewChild('mapElement') mapElement: { nativeElement: any };
  @ViewChild('slides')  slides: IonSlides;
  
  map : any
  options : GeolocationOptions
  onMap : boolean = false
  calibrating : boolean = false
  backDisable = true
  phase : number = 1
  rh_unit : string
  // registering new RH
  rh_user_inputs : RentalHouseDetails = {
    RRP_ID : null,
    RRP_Name : null,
    RRP_Description : null,
    RRP_Capacity : null,
    RRP_Rent_Rate : null,
    RRP_Type : null,
    RRP_Address : null,
    RRP_X_Coordinates : null,
    RRP_Y_Coordinates : null,
    Owner_ID : null,
    Contact_Number : null,
    RRP_Settings: null,
    Photo_Documents : null
  }
  showOption = false
  optionValue = ""
  optionCapacity = 0
  optionUnit = ""
  chosenTypes = []
  rent_rate : number
  rent = []
  payment = {
    label: null,
    amount: null
  }
  toggleBilling : string = ""
  image:any
  imageName : string
  selectedImage = []


  //methods
  
  ionViewDidLeave(){
    this.onMap = false
    this.calibrating = false
    this.backDisable = true
    this.phase = 1
    this.rh_user_inputs.RRP_ID = null
    this.rh_user_inputs.RRP_Name = null
    this.rh_user_inputs.RRP_Description = null
    this.rh_user_inputs.RRP_Capacity = null
    this.rh_user_inputs.RRP_Rent_Rate = null
    this.rh_user_inputs.RRP_Type = null
    this.rh_user_inputs.RRP_Address = null
    this.rh_user_inputs.RRP_X_Coordinates = null
    this.rh_user_inputs.RRP_Y_Coordinates = null
    this.rh_user_inputs.Owner_ID = null
    this.rh_user_inputs.Contact_Number = null
    this.rh_user_inputs.RRP_Settings= null
    this.rh_user_inputs.Photo_Documents = null
    this.showOption = false
    this.optionValue = ""
    this.optionCapacity = 0
    this.optionUnit = ""
    this.chosenTypes = []
    this.rent = []
    this.toggleBilling = ""
    this.selectedImage = []

  }

  swipeNext(){
    this.showOption = false
    if(this.phase == 4){

    }else{
      this.phase++
    }
  }

  swipeBack(){
    if(this.phase == 1){

    }else{
      this.phase--
    }
  }

  // closeRegistration(){
  //   this.dismiss();
  // }
  
  // changeUnit(){
  //   if(this.rh_user_inputs.RRP_Type === "house for rent"){
  //     this.rh_unit = "house/s"
  //   }else if(this.rh_user_inputs.RRP_Type === "bed space" || this.rh_user_inputs.RRP_Type === "female bed space" || this.rh_user_inputs.RRP_Type === "male bed space" ){
  //     this.rh_unit = "person/s"
  //   }else if(this.rh_user_inputs.RRP_Type === "room for rent"){
  //     this.rh_unit = "unit/s"
  //   }else{}
  // }

  // rrp_types : any
  // async isValid():Promise<boolean>{
  //   if(this.rh_user_inputs.RRP_Name && this.rh_user_inputs.RRP_Name.length != 0 &&
  //     this.rh_user_inputs.RRP_Capacity &&
  //     this.rh_user_inputs.RRP_Type && this.rh_user_inputs.RRP_Type.length != 0 &&
  //     this.rh_user_inputs.RRP_Address && this.rh_user_inputs.RRP_Address.length != 0 &&
  //     this.rh_user_inputs.RRP_Rent_Rate &&
  //     //this.rh_user_inputs.RRP_Availability &&
  //     this.rh_user_inputs.Contact_Number 
  //     ){
  //       return true
  //   }else{
  //     return false
  //   }
  // }

  validate(a:number){
    if(a === 1){
      if(this.rh_user_inputs.RRP_Name && this.rh_user_inputs.RRP_Name.trim() != ""){
        if(this.rh_user_inputs.RRP_Address && this.rh_user_inputs.RRP_Address.trim() != ""){
          if(this.rh_user_inputs.Contact_Number && this.rh_user_inputs.Contact_Number.length == 10){
            this.phase = 2
          }else{
            this.presentAlert("Incomplete Data","Contact Number must be 10 characters");
          }
        }else{
          this.presentAlert("Incomplete Data","Please fill up the Rental House Address");
        }
      }else{
        this.presentAlert("Incomplete Data","Please fill up the Rental House Name");
      }
    }
    else if(a === 2){
      if(this.chosenTypes.length != 0){
        this.phase = 3
      }else{
        this.presentAlert("Incomplete Data","Please classify atleast one of the types of your Rental House");
      }
    }
    else if(a === 3){
      let goNext : boolean = true
      this.chosenTypes.map((val, i)=>{
        if(!val.billing && val.billing_status == 'unset'){
          this.presentAlert('Incomplete Data', 'Please complete the billing setup and recheck the data you input.')
          goNext = false
        }
      })
      if(goNext){
        this.phase = 4
      }
    }
    else if(a === 4){
      if(this.rh_user_inputs.RRP_X_Coordinates && this.rh_user_inputs.RRP_Y_Coordinates){
        this.phase = 5
      }else{
        this.presentAlert('Incomplete Data', 'Please input the right coordinates for your rental house.')
      }
    }
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
    this.rh_user_inputs.RRP_X_Coordinates = lat
    this.rh_user_inputs.RRP_Y_Coordinates = lng
    this.onMap = false
  }

  genMap(x:number,y:number){

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
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
    
      var marker = new google.maps.Marker(
        {
          position: {lat: x, lng: y},
          map: this.map,
          title: 'This is your location',
        }
      );
      let infoWindow = new google.maps.InfoWindow()
      // infoWindow.open(this.map)

      this.map.addListener("click", (loc)=>{
        infoWindow.close()
        // clickLoc = loc
        // console.log(loc.latLng.lat())
        infoWindow = new google.maps.InfoWindow({
          content : "<button id='getLoc'  style='padding: .5em;color: white; border-radius:.3em'>" +
                    "Get this Location</button>",
          position: loc.latLng,
          
        })
        google.maps.event.addListener(infoWindow, 'domready', () => {
          const el = document.querySelector('button');
          el.style.backgroundColor = "rgb(11, 125, 218)"
          el.addEventListener('click', (event) => this.changeCoord(loc.latLng.lat(),loc.latLng.lng()))
        });
        
        infoWindow.open(this.map)
        // console.log(JSON.stringify(loc.latLng.toJSON(), null, 2))

      })

      

      marker.addListener("click", ()=>{
        // console.log("fdsafdsf")
      })
      

      //close
      

      
  }

  showOptions(){
    this.showOption = true
    
  }

  choose(value:string){
    this.showOption = false
    this.optionValue = value
  }

  toggleEditBilling(type:string){
    this.toggleBilling = type
    this.rent = []
    this.rent_rate = null
    this.payment.amount = null
    this.payment.label = null

  }

  addOption(){
    this.showOption = false
    if(this.chosenTypes.length == 0 ){
      if(this.optionUnit.trim() != "" && this.optionCapacity != 0 && this.optionValue.trim() != ""){
        this.chosenTypes.push({value: this.optionValue, capacity: this.optionCapacity, unit: this.optionUnit, billing_status: 'unset', billing:null, total_billing:0})
      }
    }else{
      let doppler = false
      if(this.optionUnit.trim() != "" && this.optionCapacity != 0 && this.optionValue.trim() != ""){
        this.chosenTypes.map((val,i)=>{
          if(val.value == this.optionValue){
            doppler = true
          }
        })
        if(!doppler && this.optionValue.trim() != ""){
          this.chosenTypes.push({value: this.optionValue, capacity: this.optionCapacity, unit: this.optionUnit, billing_status: 'unset', billing: null, total_billing:0})
        }
      }
    }
    
    // console.log(JSON.stringify(this.chosenTypes))
    this.optionValue = ""
    this.optionCapacity = 0
    this.optionUnit = ""
  }
  
  saveBilling(type:string){
    if(this.rent_rate){
      this.chosenTypes.map((val, i)=>{
        if(val.value == type){
          this.rent.push({label: 'Rent Rate', amount: parseInt(this.rent_rate.toString()) })

          this.rent_rate = null
          this.chosenTypes[i].billing = this.rent
          this.chosenTypes[i].billing.map((val1,i1)=>{
            this.chosenTypes[i].total_billing += val1.amount
          })
          this.chosenTypes[i].billing_status = 'edited'
          this.rent = []
          this.toggleBilling = ""
          // console.log(this.chosenTypes[i])
        }
      })
    }
    else{
      this.presentAlert('Incomplete Data', 'Please provide proper input to the fields.')
    }
    
  }

  addPayment(){
    if(this.payment.label && this.payment.label.trim() != "" && this.payment.amount){
      this.rent.push({label: this.payment.label, amount: this.payment.amount})
      this.payment.amount = null
      this.payment.label = null
    }else{
      this.presentAlert('Incomplete Data', 'Please provide proper input to the fields')
    }
  }

  removePayment(label:string){
    this.rent.map((val, i)=>{
      if(val.label == label){
        this.rent.splice(i,1)
      }
    })
  }

  editBilling(type: string){
    this.chosenTypes.map((val,i)=>{
      if(val.value == type){
        this.chosenTypes[i].billing_status = "unset"
        this.chosenTypes[i].total_billing = 0
        this.chosenTypes[i].billing.map((valA, iA)=>{
          if(valA.label != "Rent Rate"){
            this.rent.push(valA)
          }else{
            this.rent_rate = valA.amount
          }
        })
        // console.log(this.rent)
        this.chosenTypes[i].billing = null
        this.toggleBilling = type
      }
    })
  }

  removeOption(value:string){
    this.chosenTypes.map((val, i)=>{
      if(value == val){
        this.chosenTypes.splice(i,1)
      }
    })
  }

  getCoords(){
    this.calibrating = true
    this.options = {
      enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.calibrating = false
        this.rh_user_inputs.RRP_X_Coordinates = pos.coords.latitude  
        this.rh_user_inputs.RRP_Y_Coordinates = pos.coords.longitude

    },(err : PositionError)=>{
      this.calibrating = false
        console.log("error : " + err.message);
        this.presentAlert( err.message,  "Permission Error")
    });
  }

  register_RH(){
    if(this.rh_user_inputs.RRP_X_Coordinates && this.rh_user_inputs.RRP_Y_Coordinates){
      this.userservice.getUserInfo("User_ID").then((val)=>{
        this.rh_user_inputs.Owner_ID = parseInt(val)
        this.rh_user_inputs.RRP_Settings = JSON.stringify(this.chosenTypes)
        if(this.selectedImage){ 
          this.rh_user_inputs.Photo_Documents = JSON.stringify(this.selectedImage)
        }
        console.log(this.rh_user_inputs)
        this.dbapi.addNewRH(this.rh_user_inputs).subscribe(()=>{
          //create new tenant tbl, contact, 
          this.presentAlert("Success", "Your new Rental House has been successfully Registered")
          this.router.navigate(['/subscription'])
        })
      })
    }
    else{
      this.presentAlert("Alert", "Please Complete the Form before finishing the Registration" )
    }
  }

  async presentAlert(head : string, cont:string) {
    const alert = await this.alert.create({
      header: head,
      message: cont,
      buttons: ['OK']
    });
    await alert.present();
  }


  ngOnInit() {

  }

  ionViewDidEnter(){
    // this.slides.update();
    this.phase = 1
  }

 
  fileChange(){
    const fileReader = new FileReader()
    const imageFile = document.getElementById("imageFile") as HTMLInputElement
    const file : File = imageFile.files[0]
    fileReader.readAsDataURL(file)
    fileReader.onload = (event:any)=>{
      this.image = event.target.result
      console.log(event.target)
    }
  }

  addImage(){
    const imageFile = document.getElementById("imageFile") as HTMLInputElement
    if(this.image && this.image.trim() != "" && this.imageName && this.imageName.trim() != ""){
      if(this.selectedImage){
        let duplicate = false
        this.selectedImage.map((val,i)=>{
          if(val.name == this.imageName){
            duplicate = true
          }
        })
        if(!duplicate){
          this.selectedImage.push({name: this.imageName, data: this.image})
          this.image = ""
          this.imageName = ""
          imageFile.value = null
        }else{
          this.presentAlert('Duplicate Entry', 'The name is already used.')
        }
      }else{
        this.selectedImage.push({name: this.imageName, data: this.image})
        this.image = ""
        this.imageName = ""
        imageFile.value = null
      }
      
    }else{
      if(!this.image || this.image.trim() == ""){
        this.presentAlert('Incomplete Data', 'No Image selected.')
      }else if(!this.imageName || this.imageName.trim() == ""){
        this.presentAlert('Incomplete Data', 'Please specify the name of the image.')
      }
    }
  }

  removeImage(name:string){
    this.selectedImage.map((val,i)=>{
      if(name === val.name){
        this.selectedImage.splice(i,1)
      }
    })
  }

}
