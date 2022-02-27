import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import _ from "lodash"
const validate = require("validate.js")
const moment = require("moment")
// import moment from 'moment'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ValidatorModule { 
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
    },
    Username: {
      presence: {
        allowEmpty: false
      },
      format: {
        pattern: "[a-z0-9]+",
        message: "can only contain a-z and 0-9"
      }
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
    }
  }

  async validateOnly(data, cons){
    try {
      await validate.async(data, _.pick(this.constraints, cons))
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
  
}
