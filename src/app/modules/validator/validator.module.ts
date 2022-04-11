import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import _ from "lodash"
import { DbapiService } from 'src/app/providers/dbapi.service';
var validate = require("validate.js")
const moment = require("moment")


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ValidatorModule  { 
  // custom validators
  constructor(
    private dbapi: DbapiService,
  ){
  }

  presence: any = {
    allowEmpty: false
  }
  initCustomvalidators() {
    validate.validators.isUserUsernameDistinct = (value) => {
      return new validate.Promise((resolve, reject)=> {
        this.dbapi.checkUserDistinct("Username", value).subscribe((res) => {
          if(res){
            resolve()
          }else{
            resolve(" is taken")
          }
        })
      })
    }
    validate.validators.isUserContactNumberDistinct = (value) => {
      return new validate.Promise((resolve, reject)=> {
        this.dbapi.checkUserDistinct("Contact_number", value).subscribe((res) => {
          if(res){
            resolve()
          }else{
            resolve(" is taken")
          }
        })
      })
    }
    validate.validators.isUserEmailDistinct = (value) => {
      return new validate.Promise((resolve, reject)=> {
        this.dbapi.checkUserDistinct("Email", value).subscribe((res) => {
          if(res){
            resolve()
          }else{
            resolve(" is taken")
          }
        })
      })
    }
  }

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
      presence: true,
      numericality : {
        onlyInteger : true
      },
      length : {
        is : 10
      }
    },
    User_Contact_Number : {
      presence: {
        allowEmpty: false
      },
      numericality : {
        onlyInteger : true
      },
      length : {
        is : 10
      },
      isUserContactNumberDistinct: true
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
    },
    Username: {
      presence: {
        allowEmpty: false
      },
      format: {
        pattern: "[a-z0-9A-Z]+",
        message: "can only contain a-z, A-Z and 0-9"
      },
      length: {
          minimum: 5
      },
      isUserUsernameDistinct: true
    },
    Email: {
      presence: {
        allowEmpty: false
      },
      isUserEmailDistinct: true,
      email: true
    },
    Password: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 8
      }
    },
    confirmPassword: {
      presence : {
        allowEmpty: false
      },
      equality: {
        attribute: "Password",
        message: "^Password doesn't match"
      }
    },
    User_Type: {
      presence: {
        allowEmpty: false
      },
      inclusion: {
        within: [ "tenant", "property owner" ]
      }
    },
    // rental house consraints
    RRP_Name: {
      presence: { allowEmpty: false, message: '^Name is required' },
      length: { maximum : 50, message: '^Name should be less than 50 characters' }
    },
    RRP_Address: {
      presence : { allowEmpty: false, message: '^Address is required'},
      length: { maximum: 100, message: '^Max length should be 100 characters' }
    },
    FeeName: {
      presence: { allowEmpty: false },
      length: { maximum: 20 }
    },
    FeeAmount: {
      presence: { allowEmpty: false },
      numericality: { greaterThan : 0 }
    },
    RRP_Type: {
      presence: { allowEmpty: false },
    },
    Basic_Rent: {
      presence: { allowEmpty: false },
    },
    Capacity: {
      presence: { allowEmpty: false },
    }


  }

  async validateOnly(data: Object, cons: string[]){
    this.initCustomvalidators()
   
    try {
      await validate.async(data, _.pick(this.constraints, cons))
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
  
}
