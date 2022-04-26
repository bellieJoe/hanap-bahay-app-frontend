import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserDetails, UserProfile } from 'src/app/providers/policy';
import { UserserviceService } from 'src/app/providers/userservice.service';
import _ from "lodash"
const validate = require("validate.js")
const moment = require("moment")

  validate.extend(validate.validators.datetime, {
    parse: function(value, options) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

@Component({
  selector: 'app-editprof',
  templateUrl: './editprof.page.html',
  styleUrls: ['./editprof.page.scss'],
})

export class EditprofPage {
  
    constructor(
      public modalCtrl: ModalController,
      private dbapi : DbapiService,
      private userservice : UserserviceService,
      private toast : ToastController,
      private alertController: AlertController,
      ) { }

    @Input() toEdit: number;

    user_details_inputs : UserDetails = {
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

    user_profile_inputs : UserProfile ={
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

    errors : any = {}
    constraints = {
      Firstname : {
        presence : {
          allowEmpty : false
        }
      },
      Middlename : {
        presence : {
          allowEmpty : false
        }
      },
      Lastname : {
        presence : {
          allowEmpty : false
        }
      },
      Birthdate : {
        presence : {
          allowEmpty : false
        },
        datetime : {
          dateOnly : false,
          latest : moment.utc().subtract(18, 'years'),
          message: "^You need to be 18 years old"
        }
      },
      Address : {
        presence : {
          allowEmpty : false
        }
      },
      Contact_Number : {
        numericality : {
          onlyInteger : true
        },
        length : {
          is : 10
        }
      },
      Occupation: {
        presence: { allowEmpty: false },
        length: { maximum: 100 }
      },
      Work_Address: {
        presence: { allowEmpty: false },
        length: { maximum: 100 }
      },
      Highest_Education: {
          presence: { allowEmpty: false },
          length: { maximum: 100 }
      },
      School_Name: {
          presence: { allowEmpty: false },
          length: { maximum: 100 }
      },
      School_Address: {
          presence: { allowEmpty: false },
          length: { maximum: 100 }
      },
      Guardian_Name: {
          presence: { allowEmpty: false },
          length: { maximum: 100 }
      },
      Relationship: {
          presence: { allowEmpty: false },
          length: { maximum: 100 }
      }
    }

    close(){
      this.dismiss();
    }

    async presentAlert(con:string, head:string) {
      const alert = await this.alertController.create({
        header: head,
        message: con,
        buttons: ['OK']
      });
    
      await alert.present();
    }

    dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }

    async presentToast(cont : string) {
      const toast = await this.toast.create({
        message: cont,
        duration: 2000
      });
      toast.present();
    }

  async update(a : number){
    if(a == 0){
      try {
        await validate.async({
          Firstname : this.user_details_inputs.Firstname,
          Middlename : this.user_details_inputs.Middlename,
          Lastname : this.user_details_inputs,
          Birthdate : this.user_details_inputs.Birthdate,
          Address : this.user_details_inputs.Address
        }, _.pick(this.constraints, ['Firstname', 'Middlename', 'Lastname', 'Birthdate', 'Address']))

        await this.userservice.getUserInfo("User_ID").then((val)=>{
          this.dbapi.updateUserDetails(this.user_details_inputs, a, parseInt(val)).subscribe(()=>{
            this.presentToast("Your Profile has been updated")
            this.dismiss()
          })
        })
      } catch (error) {
        this.errors = error
        console.log(this.errors )
      }
      
    }else if(a == 1){
      try {
        await validate.async({
          Contact_Number : this.user_details_inputs.Contact_Number
        }, _.pick(this.constraints, ['Contact_Number']))

        let userInfo = await this.userservice.getUserInfo("User_ID")

        await this.dbapi.updateUserDetails(this.user_details_inputs, a, parseInt(userInfo)).subscribe(()=>{
          this.presentToast("Your Profile has been updated")
          this.dismiss()
        })
      } catch (error) {
        console.log(error)
        this.errors = error
      }
    
      
      
    }else if(a == 2){
      try {
        await validate.async({
          Occupation: this.user_profile_inputs.Occupation,
          Work_Address: this.user_profile_inputs.Work_Address,
          Highest_Education: this.user_profile_inputs.Highest_Education,
          School_Name: this.user_profile_inputs.School_Name,
          School_address: this.user_profile_inputs.School_Address
        }, _.pick(this.constraints, [ 'Occupation', 'Work_Address', 'Highest_Education', 'School_Name', "School_Address" ]))

        let user = await this.userservice.getUserInfo("User_ID")

        await this.dbapi.updateUserProfile(this.user_profile_inputs, a).subscribe(()=>{
          this.presentToast("Your Profile has been updated")
          this.dismiss()
        })
      } catch (error) {
        console.log(error)
        this.errors = error
      }
      
    }else if(a == 3){
      try {
        await validate.async({
          Guardian_Name: this.user_profile_inputs.Guardian_Name,
          Contact_Number: this.user_profile_inputs.Contact_Number,
          Relationship: this.user_profile_inputs.Relationship,
          Address: this.user_profile_inputs.Address
        }, _.pick(this.constraints, ['Guardian_Name', 'Contact_Number', 'Relationship', 'Address']))

        await this.userservice.getUserInfo("User_ID").then((val)=>{
          this.dbapi.updateUserProfile(this.user_profile_inputs, a).subscribe(()=>{
            this.presentToast("Your Profile has been updated")
            this.dismiss()
          })
        })
      } catch (error) {
        console.log(error)
        this.errors = error
      }
      
    }else{}
  }

  ionViewDidEnter(){
    this.userservice.getUserInfo("User_ID").then((val)=>{
      this.dbapi.getUserDetails_id(parseInt(val)).subscribe((details : UserDetails[])=>{
        this.user_details_inputs = details[0]
        console.log("User Details Initiated...")
      })
      this.dbapi.getUserProfile_id(parseInt(val)).subscribe((profile : UserProfile[])=>{
        this.user_profile_inputs = profile[0]
        console.log("User Profile Initiated...")
      })
    })
  }

}
