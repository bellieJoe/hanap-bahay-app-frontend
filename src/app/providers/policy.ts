import { Time } from '@angular/common'

//for all users
export class CreateUserPolicy{ //for getting all the user info
    User_ID : number
    Firstname : string
    Middlename : string
    Lastname : string
    Birthdate : Date
    Email : string
    Address : string
    Contact_Number : string
    User_Type : string
    Username : string
    Password : string
}
export class UserCredentials{
    username : string
    password : string
}

export class UserUniqueInputs{
    Username : string
    Email : string
    Contact_number : string
    // IsUnique: boolean
}
export class activeUser{
    User_ID: number
    Username: string
    User_Type: string
}

//for owners only
export class SubscriptionData{
    Subscription_ID : number
    User_ID : number
    Subscription_Start_Date: Date
    Subscription_End_Date: Date
    Subscription_Plan : string
}

export class RentalHouseDetails{
    RRP_ID : number
    RRP_Name : string
    RRP_Description : string
    RRP_Capacity : number
    RRP_Type : string
    RRP_Rent_Rate : number
    RRP_Address : string
    RRP_X_Coordinates : number
    RRP_Y_Coordinates : number
    Owner_ID : number
    Contact_Number : string
    RRP_Settings : any
    Photo_Documents : any
}

// forProfile
export class UserDetails{
    User_ID : number
    Firstname : string
    Middlename : string
    Lastname : string
    Birthdate : Date
    Email : string
    Address : string
    Contact_Number : string
    User_Type : string
    Is_Boarded : number
    Username : string
    Privacy : string
}

export class UserProfile{
    User_ID : number
    Occupation : string
    Work_Address : string
    Highest_Education : string
    School_Name : string
    School_Address  : string
    Guardian_Name  : string
    Contact_Number : string
    Relationship : string
    Address : string
}

// rh view of owners
//searching tenants
export class SearchTenantList{
    User_ID : number
    Firstname : string
    Middlename :string
    Lastname : string
    Address : string
}

export class GetTenantList{
    User_ID :number
    Firstname : string
    Middlename :string
    Lastname : string
    Date_Added : Date
    Payment_Day : number
    Room_Name : string
}


// for announcements
export class AnnouncementDetails{
    Announcement_ID : string
    Announcement_Title : string
    Date_Created : string
    Announcement_Content : string
    RRP_ID : number 
    Announcement_Tag : string 
    Time_Created : string
    Date_Time : string
}

// for Contacts
export class ContactDetails{
    Contact_ID : number
    Contact_Number :  number
    Contact_Name : string
    Contact_Type : string
    RRP_ID : number
}

// for paymant monitoring
export class PaymentDetails{
    Payment_ID : number
    RRP_ID : number
    Tenant_ID : number
    Tenant_Name : string
    Date_Paid : Date
    Status : string
    Amount_Paid : number
}

export class RatingsDetails{
    Rating_ID : number
    User_ID : number
    RRP_ID : number
    Rating_Value : number
    Review_Content : string
    Date_Rated : Date
}

// Complaints
export class ComplaintsDetails{
    Complaint_ID : number
    User_ID : number
    RRP_ID : number
    Complaint_Date : Date
    Complaint_Content : string
    Fullname : string
}

export class NotificationDetails{
    Notification_ID : number
    User_ID : number
    Date_Notified : number
    Icon : string
    Notification_Content  : string
    Destination_Link : string
    Is_Read : boolean
}

export class ChecklistDetails{
    Checklist_ID : number
    User_ID : number
    RRP_ID : number
    Check_Status: boolean
}

export class ReservationDetails{
    Reservation_ID : number
    User_ID : number
    RRP_ID :number
    Date_Reserve : Date
    Expiry_Date : Date
    Reservation : number
    Status : string
    Is_New : boolean
    Date_Scheduled : string
    Confirmation_Note : string
    Delete_From : number
}

export class ReservationUpdates{
    Reservation_ID : number
    Update_Content: string
    Update_Date: Date
}

export class Messages{
    Message_ID : number
    Conversation_ID : number
    From_ID : number
    Message_Content : string
    Date_Sent : Date
    Is_Read: boolean
}

export class ConversationDetails{
    Conversation_ID : number
    Receiver_A : number
    Receiver_B : number
    Type : string
    RRP_ID : number
    height : number
    Last_Edited : Date
}

export class image{
    base: string
}

export class ImageProps{
    base64string : string
    filename : string
    url_extension : string
    id : number
    type : string
    date: string
    title : string
    part : string
    description : string
}