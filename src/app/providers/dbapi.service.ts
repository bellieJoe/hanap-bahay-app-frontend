import { Time } from '@angular/common';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { UserInfo } from 'os';
import { observable, Observable } from 'rxjs';
import { AnnouncementDetails, ChecklistDetails, ComplaintsDetails, ContactDetails, ConversationDetails, CreateUserPolicy,GetTenantList,image,ImageProps,Messages,NotificationDetails,PaymentDetails,RatingsDetails,RentalHouseDetails,ReservationDetails,ReservationUpdates,SearchTenantList,SubscriptionData,UserDetails,UserProfile,UserUniqueInputs } from  '../providers/policy';
import axios, { AxiosError } from "axios"
import { on } from 'process';

@Injectable({
  providedIn: 'root'
})

export class DbapiService  {

  // pre OJT deployment
  // SERVER = 'https://hanap-bahay-app-dbapi.herokuapp.com'
  // SERVER_NAME = `https://hanap-bahay-app-dbapi.herokuapp.com/php_scripts`
 // Development servers
  // SERVER = 'http://localhost/hanap-bahay-app-dbapi'
  // SERVER_NAME = `${this.SERVER}/php_scripts`

  MYSQL = {
    host: "localhost",
    user: "root",
    password: ""
  }

  // new laravel server
  SERVER = "http://localhost:8000"
  SERVER_NAME = "http://localhost:8000"
  CSRF_TOKEN : any = null

  axiosConfig = {
    withCredentials : true,
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  authSanctum(): Observable<any>{
    return new Observable((observer) => {
      axios.get(`${this.SERVER_NAME}/sanctum/csrf-cookie`, {
        withCredentials: true
      })
      .then(() => { observer.next() })
      .catch(err => { observer.error( err ) })
    })
  }

  //for both users
  // done laravel
  getName_uid(uid:number):Observable<string>{ 
    return this.httpClient.get<string>(`${this.SERVER_NAME}/users/${uid}/getFullName`) 
  }

  // done laravel
  creteUserProfile_id(prof : UserProfile): Observable<UserProfile>{
    console.log("Before create User Profile request: " + prof)
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/${prof.User_ID}/create-user-profile`,
          {},
          {withCredentials:true}
        )
        .then(()=>observer.next())
        .catch((err: AxiosError)=>{
          console.log(err.response)
          observer.error(err)
        })
      })
    })
    return this.httpClient.post<UserProfile>(`${this.SERVER_NAME}/profile/createUserProfile_id.php`, prof);
  }

  // done laravel
  createUserPolicy(policy: CreateUserPolicy): Observable<CreateUserPolicy>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users`,
          policy,
          this.axiosConfig
        )
        .then(()=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<CreateUserPolicy>(`${this.SERVER_NAME}/createNewUser.php`, this.createUserPolicy);
  }
  
  //done laravel
  getUserUniqueInputs():Observable<UserUniqueInputs[]>{ 
    return this.httpClient.get<UserUniqueInputs[]>(`${this.SERVER_NAME}/users/unique-inputs`) 
  }

  //done laravel
  checkUserDistinct(col: string, val:string): Observable<boolean>{ 
    return new Observable(observer => {
      axios.get(`${this.SERVER_NAME}/users/is-distinct`, {
        withCredentials: true,
        params: { col, val }
      }).then(res => {
        observer.next(res.data)
      }).catch(err => {
        alert(err)
      })
    })
  }

  // done laravel
  searchUser(username : string):Observable<any>{//after ssignup
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.get(
          `${this.SERVER_NAME}/users/get-user-by-username/${username}`,
          this.axiosConfig
        )
        .then((res)=>{
          console.log(res.data)
          observer.next(res.data)
        })
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<CreateUserPolicy[]>(`${this.SERVER_NAME}/searchUser.php/?username=${username}` )
  }

  // done laravel
  searchUser_username(username : string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.get(
          `${this.SERVER_NAME}/users/get-user-by-username/${username}`,
          this.axiosConfig
        )
        .then((res)=>{
          console.log(res.data)
          observer.next(res.data)
        })
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<CreateUserPolicy[]>(`${this.SERVER_NAME}/searchUser_username.php/?username=${username}` )
  }

  checkUsername(username:string):Observable<any>{
    return new Observable(observer => {
      axios.get(
        `${this.SERVER_NAME}/users/username/check-username/${username}`,
        this.axiosConfig
      )
      .then(res => observer.next(res.data))
      .catch(err => {
        alert(err.message)
      })
    })
    return this.httpClient.post<any>(`${this.SERVER_NAME}/checkUsername.php`, {Username : username})
  }

  // done laravel
  updateUserDetails_walkin(email:string, username:string, password:string,contact_number:string, birthdate:string, address:string, firstname:string, middlename:string, lastname:string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/update-user-details-walkin`,
          {
            Email: email,
            Username: username,
            Password: password,
            Contact_Number: contact_number,
            Birthdate: birthdate,
            Address: address,
            Firstname: firstname,
            Middlename: middlename,
            Lastname: lastname
          },
          this.axiosConfig
        )
        .then((res)=>observer.next(res))
        .catch((err:AxiosError)=>{
          console.log(err.response)
        })
      })
    })
    let params = {Email:email,Username:username,Password:password,Contact_Number:contact_number,Birthdate:birthdate,Address:address}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/updateUserDetails_walkin.php`, params )
  }

  /* for landlord only
  done laravel; return null */
  addRHSubscription(sub : CreateUserPolicy):Observable<any>{
    return new Observable(observer=>{
      axios.post(
        `${this.SERVER_NAME}/rrpsubscriptions/${sub.User_ID}/`,
        {},
        this.axiosConfig
      )
      .then(res=>observer.next())
      .catch(err=>console.log(err))
    })
    return this.httpClient.post<CreateUserPolicy>(`${this.SERVER_NAME}/addRHSubscription.php`, sub )
  }

  /* return rrps : done laravel  */
  getOwnersRH_id(id : number):Observable<RentalHouseDetails[]>{
    return new Observable(observer=>{
      axios.get(
       `${this.SERVER_NAME}/rrps/get-rrps-by-owner/${id}`,
       this.axiosConfig 
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<RentalHouseDetails[]>(`${this.SERVER_NAME}/getOwnersRH_id.php/?id=${id}` )
  }
  
  /* return null : done laravel */
  addNewRH(RH_Details : any):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/rrps/${RH_Details.Owner_ID}/`,
          RH_Details,
          this.axiosConfig
        )
        .then(res=>{
          observer.next()
        })
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<RentalHouseDetails>(`${this.SERVER_NAME}/addNewRH.php`, RH_Details );
  }

    // for profile
    /* return UserDetails[] : done laravel */
  getUserDetails_id(id : number): Observable<UserDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/users/${id}`,
        this.axiosConfig
      )
      .then(res=>{
        observer.next(res.data)
      })
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<UserDetails[]>(`${this.SERVER_NAME}/profile/getUserDetails_id.php/?id=${id}` )
  }

  /* return UserProfile[] : done laravel  */
  getUserProfile_id(id:number): Observable<UserProfile[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/profiles/${id}`,
        this.axiosConfig
      )
      .then(res=>{
        observer.next(res.data)
      })
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<UserProfile[]>(`${this.SERVER_NAME}/profile/getUserProfile_id.php/?id=${id}` )
  }

  /* return null : done laravel */
  updateUserDetails(details:UserDetails , uniq : number, id : number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/${id}/update?uniq=${uniq}`,
          details,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    
    return this.httpClient.post<UserDetails>(`${this.SERVER_NAME}/profile/updateUserDetails.php/?uniq=${uniq};id=${id}`, details )
  }

  /* return null : done laravel */
  updateUserProfile(profile : UserProfile, uniq : number): Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/profiles/${profile.User_ID}/update`,
          profile,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<UserProfile>(`${this.SERVER_NAME}/profile/updateUserProfile.php/?uniq=${uniq}`, profile )
  }

  /* returns number 0 or 1 : laravel done */
  confirmPassword(uid:number,pass:string): Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/${uid}/auth`,
          {pass:pass},
          this.axiosConfig
        )
        .then(res=>observer.next(res.data))
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/profile/confirmPassword.php?uid=${uid}&pass=${pass}` )
  }

  /* returns numbner 0 or 1 : done laravel */
  changePassword(uid: number , oldpass :string, newpass:string): Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/${uid}/change-password`,
          {oldpass:oldpass, newpass:newpass},
          this.axiosConfig
        )
        .then(res=>observer.next(res.data))
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/profile/changePassword.php?uid=${uid}&oldpass=${oldpass}&newpass=${newpass}` )
  }

  /* return null : done laravel */
  updatePrivacy(settings: string, user_ID:number): Observable<any>{
    let params = {Settings : settings, User_ID : user_ID}
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/${user_ID}/update-privacy`,
          params,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<any>(`${this.SERVER_NAME}/profile/updatePrivacy.php`, params )
  }

  /* RH view of Owner  */
  /* return Conversations [] : done laravel */
  getConvos_rrpid(rrpid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/rrps/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Messages/getConvos_rrpid.php/?rrpid=${rrpid}` )
  }
  
  /* preceded */
  getConvoDets_rrpid(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Messages/getConvoDets_rrpid.php/?rrpid=${rrpid}` )
  }

  /* return tenant list : done laravel */
  searchTenant_fistname(name : string):Observable<SearchTenantList[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/users/search/tenant-firstname?name=${name}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_firstname.php/?name=${name}` )
  }

  /* return tenant list : done laravel */
  searchTenant_2name(fname : string, sname: string):Observable<SearchTenantList[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/search/tenant-2name?name1=${fname}&name2=${sname}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_2name.php/?name1=${fname}&name2=${sname}` )
  }

  /* returns tenant list : done laravel */
  searchTenant_3name(fname : string, sname: string, tname:string):Observable<SearchTenantList[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/search/tenant-3name?name1=${fname}&name2=${sname}&name3=${tname}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_3name.php/?name1=${fname}&name2=${sname}&name3=${tname}` )
  }

  /* return tenant list : done laravel */
  searchTenant_4name(fname : string, sname: string, tname:string, lname:string):Observable<SearchTenantList[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/search/tenant-4name?name1=${fname}&name2=${sname}&name3=${tname}&name4=${lname}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_4name.php/?name1=${fname}&name2=${sname}&name3=${tname}&name4=${lname}` )
  }

  /* return tenant list : done laravel */
  getTenantList_rrpid(id : number): Observable<GetTenantList[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/tenants/${id}/get-tenants`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
  }

  /* return tenant list : done laravel */
  getTenantListInfo_uid(id:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/users/${id}/tenant-info`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<GetTenantList[]>(`${this.SERVER_NAME}/RH_Management/getTenantListInfo_uid.php/?id=${id}` )
  }

  /* return null : done laravel */
  addTenant_rrpid(Email: string, rrpid:number, date:string, time: string, RRP_Type_ID: number, Payment_Day: number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/tenants/add-tenant`,
          {Email, rrpid, date, time, RRP_Type_ID, Payment_Day},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch((err: AxiosError)=>{
          alert(err.message)
          console.log(err.response)
        })
      })
    })

  }

  /* return number : done laravel */
  removeTenant_uid(id:number): Observable<number>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/tenants/delete-tenant`,
          {id},
          this.axiosConfig
        )
      })
    })
    return this.httpClient.post<number>(`${this.SERVER_NAME}/RH_Management/removeTenant_uid.php/?id=${id}`, null )
  }

  /* return null : done laravel */
  addBoarderRRP(uid:number,rrpid:number): Observable<number>{
    return new Observable(observer=>{
      axios.post(
        `${this.SERVER_NAME}/tenant-boarded-rrps/add-tenant`,
        {uid, rrpid},
        this.axiosConfig
      )
      .then(res=>observer.next())
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<number>(`${this.SERVER_NAME}/RH_Management/addBoardedRRP.php?uid=${uid}&rrpid=${rrpid}` )
  }

  /* return list of users : done laravel  */
  checkIfRegistered_email(email : string): Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/users/email/check-registered-email?Email=${email}`,
        this.axiosConfig
      )
      .then(res => observer.next(res.data))
      .catch(err=>console.log(err))
    })
    // return this.httpClient.post<any>(`${this.SERVER_NAME}/RH_Management/checkIfRegistered_email.php`, params )
  }

  /* return null : done laravel */
  regTenantMail(reciever_email:string, owner_email:string, sender_name : string, reciever_name:string): Observable<any>{
    let params = {Reciever_Email : reciever_email, Owner_Email : owner_email, Sender_Name : sender_name, Reciever_Name : reciever_name}
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/email/send-tenant-verification`,
          params,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<any>(`${this.SERVER_NAME}/regTenantMail.php`, params, )
  }

  /* return null : done laravel */
  registerTenant(email : string, firstname : string, middlename : string, lastname : string): Observable<any>{
    let params = {Email : email, Firstname : firstname, Middlename : middlename, Lastname : lastname}
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/users/register-tenant`,
          params,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/regTenant.php?Email=${email}&Firstname=${firstname}&Middlename=${middlename}&Lastname=${lastname}` )
  }


  // Announcements
  /* return null : done laravel */
  createAnnouncement_rrpid(announceDets : AnnouncementDetails): Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/announcements/create`,
          announceDets,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<AnnouncementDetails>(`${this.SERVER_NAME}/RH_Management/Announcements/createAnnouncement_rrpid.php`, announceDets )
  }

  /* return announcements : done laravel  */
  getAnnouncements_rrpid(rrpid:number):Observable<AnnouncementDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/announcements/get-anncouncements/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<AnnouncementDetails[]>(`${this.SERVER_NAME}/RH_Management/Announcements/getAnnouncements_rrpid.php/?rrpid=${rrpid}` )
  }

  /* return null : done laravel */
  deleteAnnouncement_aid(id : number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/announcements/delete/${id}`,
          {},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Announcements/deleteAnnouncement_aid.php/?id=${id}` )
  }


  // Contacts
  /* return null : done laravel */
  addContact(detail : ContactDetails): Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/contacts/create`,
          detail,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch((err : AxiosError )=>{
          alert(err.message)
          console.log(err.response)
        })
      })
    })
    return this.httpClient.post<ContactDetails>(`${this.SERVER_NAME}/RH_Management/Contacts/addContact.php`, detail )
  }

  /* return contacts : done laravel */
  getContacts_rrpid(rrpid : number): Observable<ContactDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/contacts/get-contacts-rrpid/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ContactDetails[]>(`${this.SERVER_NAME}/RH_Management/Contacts/getContacts_rrpid.php?rrpid=${rrpid}` )
  }

  /* return contact : done laravel */
  getContact_cid(cid : number):Observable<ContactDetails>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/contacts/${cid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ContactDetails>(`${this.SERVER_NAME}/RH_Management/Contacts/getContact_cid.php?cid=${cid}` )
  }

  /* return null : done laravel */
  updateContact_cid(cid:number,cname:string,cnumber:number,ctype:string):Observable<ContactDetails>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/contacts/update/${cid}`,
          {cid, cname, cnumber, ctype},
          this.axiosConfig
        )
        .then(res=>observer.next(res.data))
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<ContactDetails>(`${this.SERVER_NAME}/RH_Management/Contacts/updateContact_cid.php?cid=${cid}&cname=${cname}&ctype=${ctype}&cnumber=${cnumber}` )
  }

  /* return contacts : done laravel */
  deleteContact_cid(cid:number, rrpid:number):Observable<ContactDetails[]>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/contacts/delete/${cid}/${rrpid}`,
          {},
          this.axiosConfig
        )
        .then(res => observer.next(res.data))
        .catch(
          (err: AxiosError) => {
            alert(err.message)
            console.log(err.response)
          }
        )
      })
    })
    return this.httpClient.get<ContactDetails[]>(`${this.SERVER_NAME}/RH_Management/Contacts/deleteContact_cid.php?cid=${cid}&rrpid=${rrpid}` )
  }


  // for Payment records
  /* return null : done laravel */
  addPayment(payment : PaymentDetails): Observable<any>{
    return new Observable(observer=>{
      this.authSanctum()
      .subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/payment-history/add`,
          payment,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<PaymentDetails>(`${this.SERVER_NAME}/RH_Management/Payments/addPayment.php`, payment )
  }

  /* return payments : done laravel */
  getPayments(rrpid:number,month:number,year:number):Observable<PaymentDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/payment-history/get-payments?rrpid=${rrpid}&year=${year}&month=${month}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<PaymentDetails[]>(`${this.SERVER_NAME}/RH_Management/Payments/getPayments.php?rrpid=${rrpid}&month=${month}&year=${year}` )
  }

  /* return null : done laravel  */
  deletePayment_pid(pid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/payment-history/delete/${pid}`,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Payments/deletePayment_pid.php?pid=${pid}` )
  }

  /* return payment : done laravel */
  getPayment_pid(pid : number):Observable<PaymentDetails>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/payment-history/get-payment/${pid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<PaymentDetails>(`${this.SERVER_NAME}/RH_Management/Payments/getPayment_pid.php?pid=${pid}` )
  }

  /* return null : done laravel */
  updatePayment(detail : PaymentDetails):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/payment-history/update-payment/${detail.Payment_ID}`,
          detail,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<PaymentDetails>(`${this.SERVER_NAME}/RH_Management/Payments/updatePayment.php`,detail )
  }


  // Rh Profile
  /* return RentalHouseDetails : done laravel */
  getRHDetails_rrpid(rrpid : number):Observable<RentalHouseDetails>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/rrps/get-rrp/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<RentalHouseDetails>(`${this.SERVER_NAME}/RH_Management/RH_Profile/getRHDetails_rrpid.php?rrpid=${rrpid}` )
  }

  /* return number of available spaces : done laravel  */
  computeAvailability_rrpid(rrpid : number):Observable<number>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/rrps/compute-availability/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<number>(`${this.SERVER_NAME}/RH_Management/RH_Profile/computeAvailability_rrpid.php?rrpid=${rrpid}` )
  }

  /* return ratings : done laravel  */
  getRatings_rrpid(rrpid : number):Observable<RatingsDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/ratings/get-ratings/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<RatingsDetails[]>(`${this.SERVER_NAME}/RH_Management/RH_Profile/getRatings_rrpid.php?rrpid=${rrpid}` )
  }


  // complaints
  /* return complaints : done laravel  */
  getComplaints_rrpid(rrpid:number):Observable<ComplaintsDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/complaints/get-complaints/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ComplaintsDetails[]>(`${this.SERVER_NAME}/RH_Management/Complaints/getComplaints_rrpid.php?rrpid=${rrpid}` )
  }

  /* return complaints : done laravel  */
  deleteComplaint_comid(comid : number, rrpid:number):Observable<ComplaintsDetails[]>{
    return new Observable(observer=>{
      axios.post(
        `${this.SERVER_NAME}/complaints/delete-complaint`,
        {comid, rrpid},
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ComplaintsDetails[]>(`${this.SERVER_NAME}/RH_Management/Complaints/deleteComplaints_comid.php?comid=${comid}&rrpid=${rrpid}` )
  }


  // rh settings
  /* return null : done laravel  */
  updateRH(detail : RentalHouseDetails):Observable<RentalHouseDetails>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/rrps/update/rrp`,
          detail,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<RentalHouseDetails>(`${this.SERVER_NAME}/RH_Management/RHSettings/updateRH.php`,detail )
  }

  /* return null : done laravel */
  countTenant_rrpid(rrpid : number):Observable<number>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/tenants/count/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<number>(`${this.SERVER_NAME}/RH_Management/countTenant_rrpid.php?rrpid=${rrpid}` )
  }

  /* return null : done laravel */
  deleteRHData_rrpid(rrpid : number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/rrps/delete/${rrpid}`,
          {},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/deleteRHData_rrpid.php?rrpid=${rrpid}` )
  }

  /* return null : done laravel */
  unboardTenants_rrpid(rrpid : number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/tenants/unboard-tenants`,
          {rrpid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/unboardTenant_rrpid.php?rrpid=${rrpid}` )
  }


  // for map
  /* return RentalHouseDetails[] : done laravel */
  getAllRH():Observable<RentalHouseDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/rrps/get-rrps`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<RentalHouseDetails[]>(`${this.SERVER_NAME}/Map/getAllRH.php`)
  }

  //bh profile view
  /* return TenantBoardedRRP : done laravel */
  isBoarded(tid : number, rrpid : number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/tenant-boarded-rrps/get-tenant/${tid}/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/isBoarded.php?tid=${tid}&rrpid=${rrpid}` )
  }

  /* return null : done laravel */
  addRating(tid: number, rrpid:number, rate_val : number, date:string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/ratings/add-rating`,
          {tid, rrpid, rate_val, date},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/addRating.php?tid=${tid}&rrpid=${rrpid}&rate_val=${rate_val}&date=${date}`)
  }

  /* return null : done laravel */
  addReview(tid: number, rrpid:number, review_con : string, date:string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/ratings/add-review`,
          {tid, rrpid, review_con, date},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    // return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/addReview.php?tid=${tid}&rrpid=${rrpid}&review_con=${review_con}&date=${date}`)
  }

  /* return null : done laravel  */
  reserveRH(rrpid:number, uid:number, date:string, amount:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/reservations/create`,
          {rrpid, date, uid, amount},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/reserveRH.php?uid=${uid}&rrpid=${rrpid}&date=${date}&amount=${amount}`)
  }


  // checklist
  /* return null : done laravel */
  addChecklist(uid:number,rrpid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/checklists/create`,
          {uid, rrpid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/addChecklist.php?uid=${uid}&rrpid=${rrpid}`)
  }

  /* return checklist : done laravel */
  isListed(uid:number,rrpid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/checklists/is-listed/${uid}}/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/isListed.php?uid=${uid}&rrpid=${rrpid}`)
  }


  // checklist
  /* return checklist[] : done laravel */
  getCheclist_uid(uid:number):Observable<ChecklistDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/checklists/get-checklists/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ChecklistDetails[]>(`${this.SERVER_NAME}/Checklist/getChecklist_uid.php?uid=${uid}`)
  }

  /* return null : done laravel  */
  checkAList_chid(chid:number, val:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/checklists/check-list`,
          {chid, val},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Checklist/checkAList_chid.php?chid=${chid}&val=${val}`)
  }

  /* return null : done laravel */
  deleteAChecklist_chid(chid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/checklists/delete`,
          {chid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Checklist/deleteAChecklist_chid.php?chid=${chid}`)
  }

  // reservation
  /* return null : done laravel */
  getReservations_uid(uid:number):Observable<ReservationDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/reservations/get-reservations/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ReservationDetails[]>(`${this.SERVER_NAME}/Reservation/getReservations_uid.php?uid=${uid}`)
  }

  /* return reservationupdates[] : done laravel */
  getReseveUpdates_reid(reid : number):Observable<ReservationUpdates[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/reservation-updates/get-updates/${reid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ReservationUpdates[]>(`${this.SERVER_NAME}/Reservation/getReseveUpdates_reid.php?reid=${reid}`)
  }

  /* return reservations : done laravel */
  getReservations_rrpid(rrpid:number):Observable<ReservationDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/reservations/get-reservations-rrp/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ReservationDetails[]>(`${this.SERVER_NAME}/Reservation/getReservations_rrpid.php?rrpid=${rrpid}` )
  }

  /* return null : done laravel */
  confirmReservation(reid:number, meet_date:string, meet_note:string, today : string):Observable<any>{
    return new Observable(observer=>{
      let params = (meet_date && meet_date != 'null') ? {reid, meet_date, meet_note, today} : {reid, today}
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/reservation-updates/confirm-reservation`,
          params,
          this.axiosConfig
        )
        .then(res=>observer.next(res.data))
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/confirmReservation.php?reid=${reid}&meet_date=${meet_date}&meet_note=${meet_note}&today=${today}` )
  }

  /* return reservation : done laravel */
  getReservationDetails_reid(reid:number):Observable<ReservationDetails>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/reservations/get-reservations-id/${reid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch()
    })
    return this.httpClient.get<ReservationDetails>(`${this.SERVER_NAME}/Reservation/getReservationDetails.php?reid=${reid}` )
  }

  /* return null : done laravel */
  updateReservation(reid:number, meet_date:string, meet_note:string, today : string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/reservation-updates/update-reservation`,
          {reid, meet_date, meet_note, today},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/updateReservation.php?reid=${reid}&meet_date=${meet_date}&meet_note=${meet_note}&today=${today}` )
  }

  /* return null : done laravel */
  declineReservation(reid:number, today : string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/reservation-updates/decline-reservation`,
          {reid, today},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/declineReservation.php?reid=${reid}&today=${today}` )
  }

  /* return null : done laravel */
  cancelReservertion(reid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/reservations/cancel`,
          {reid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/cancelReservation.php?reid=${reid}` )
  }

  /* reutrn null : done laravel */
  deleteReservation(reid:number, id:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/reservations/delete`,
          {reid, id},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/deleteReservation.php?reid=${reid}&id=${id}` )
  }


  /* return number : done laravel */
  countNewReservation(rrpid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/reservations/count-new/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/countNewReservation.php?rrpid=${rrpid}` )
  }


  //notification
  /* return null : done laravel */
  addNotification(uid:number, date:string, type:string, content:string,url:string, extraid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/notifications/create`,
          {uid, date, type, content, url, extraid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/addNotification.php?uid=${uid}&date=${date}&type=${type}&content=${content}&url=${url}&extraid=${extraid}` )
  }

  /* return notifications[] : done laravel */
  getNotifications_uid(uid:number):Observable<NotificationDetails[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/notifications/userid/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<NotificationDetails[]>(`${this.SERVER_NAME}/Notification/getNotifications_uid.php?uid=${uid}` )
  }

  /* return null : done laravel */
  deleteNotification(notif_id):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/notifications/delete`,
          {notif_id},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/deleteNotification.php?notif_id=${notif_id}` )
  }

  /* return null : done laravel */
  markReadNotif(notif_id):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/notifications/mark-read`,
          {notif_id},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/markReadNotif.php?notif_id=${notif_id}` )
  }

  /* return number : done laravel */
  countNewNotification(uid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/notifications/count-new/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/countNewNotification.php?uid=${uid}` )
  }


  //messaging
  /* return ConversationDetails : done laravel */
  checkConvExist(idA:number, idB : number, type:string, rrpid: number ):Observable<ConversationDetails>{

    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/convo/check-exist?idA=${idA}&idB=${idB}&type=${type}&rrpid=${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<ConversationDetails>(`${this.SERVER_NAME}/Messaging/checkConvExist.php?idA=${idA}&idB=${idB}&type=${type}&rrpid=${rrpid}` )
  }

  /* return null : done laravel */
  newConvo(idA:number,idB:number,type:string,rrpid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/conversations/convo/create`,
          {idA, idB, type, rrpid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/newConvo.php?idA=${idA}&idB=${idB}&type=${type}&rrpid=${rrpid}` )
  }


  /* return conversations :done laravel */
  getConvos_uid(uid : number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/get-convo-user-id/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/getConvos_uid.php?uid=${uid}` )
  }

  /* return null : done laravel */
  addMessage(convoid : number, from:number, content:string, date:string, height: number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/messages/create`,
          {convoid, from, content, date, height},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/addMessage.php?convoid=${convoid}&from=${from}&content=${content}&date=${date}&height=${height}` )
  }

  /* return messages : done laravel */
  fetchMessages(convoid:number):Observable<Messages[]>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/messages/fetch-messages-by-conversation/${convoid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<Messages[]>(`${this.SERVER_NAME}/Messaging/fetchMessages.php?convoid=${convoid}`)
  }

  /* return height : done laravel */
  getConvoHeight(convoid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/messages/conversation-height/${convoid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/getConvoHeight.php?convoid=${convoid}` )
  }

  /* returns convodetails : done laravel */
  getConvoDets(convoid:number):Observable<ConversationDetails>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/${convoid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/getConvoDets.php?convoid=${convoid}` )
  }

  /* return null : done laravel */
  deleteConvo(convoid:number,uid:number, type:string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/conversations/convo/delete`,
          {convoid, uid, type},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/deleteConvo.php?convoid=${convoid}&uid=${uid}` )
  }

  /* return boolean : done laravel */
  checkNewMesagges(uid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/convo/check-new-message-by-user/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/checkNewMessages.php?uid=${uid}` )
  }

  /* return boolean : done laravel */
  checkNewMesagges_rrpid(rrpid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/convo/check-new-message-by-rrp/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/checkNewMessages_rrpid.php?rrpid=${rrpid}` )
  }

  /* return number : done laravel */
  countNewMessages(convoid:number, uid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/conversations/convo/count-new-messages/${convoid}/${uid}`
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/countNewMessages.php?convoid=${convoid}&uid=${uid}`)
  }
  
  /* return null : done laravel */
  setMessageRead(messid:number):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/conversations/message/mark-read`,
          {messid},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/setMessageRead.php?messid=${messid}` )
  }
  

  // tenant portal
  /* return tenant : done laravel */
  getTenantDetails(uid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/tenants/get-tenant-by-userid/${uid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/TenantPortal/Announcement/getTenantDetails.php?uid=${uid}` )
  }


  //payment history
  /* return payments : done laravel */
  getPaymentHistory_uid(uid:number, rrpid:number, date:string):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/payment-history/get-payments-by-user?uid=${uid}&rrpid=${rrpid}&date=${date}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/TenantPortal/PaymentHistory/getPaymentHistory_uid.php?uid=${uid}&rrpid=${rrpid}&date=${date}` )
  }


  // complains
  /* return null : done laravel */
  addComplain(uid: number, rrpid: number, date:string, content:string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/complaints/create`,
          {uid, rrpid, date, content},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/TenantPortal/Complaints/addComplain.php?uid=${uid}&rrpid=${rrpid}&date=${date}&content=${content}` )
  }

  /* return null : done laravel  */
  setComplainOld(com_id):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/complaints/mark-read`,
          {com_id},
          this.axiosConfig
        )
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Complaints/setComplainOld.php?com_id=${com_id}`)
  }

  /* return number : done laravel */
  countComplaints(rrpid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/complaints/count-by-rrp/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Complaints/countComplaints.php?rrpid=${rrpid}` )
  }

  // tunay na upload image
  /* return null : done laravel */
  setProfilePicture(image : ImageProps):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/images/set-profile`,
          image,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Image/setProfilePicture.php`, image )
  }

  /* return images : done laravel */
  fetchImages_rrpid(rrpid:number):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/images/fetch-images-by-rrp/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
  
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Image/fetchImages_rrpid.php?rrpid=${rrpid}` )
  }

  /* return image : done laravel */
  fetchImage(id : number, type : string):Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/images/fetch-image?id=${id}&type=${type}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
    // return this.httpClient.get<any>(`${this.SERVER_NAME}/Image/fetchImage.php?id=${id}&type=${type}` )
  }

  /* return null : done laravel */
  deleteImage(imgid:number , filename: string):Observable<any>{
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/images/delete`,
          {imgid, filename},
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Image/deleteImage.php?imgid=${imgid}&filename=${filename}` )
  }

  /* return null : done laravel */
  updateImageDetails(img_id : number, title : string, description : string):Observable<any>{
    let params = {IMG_ID : img_id, Title : title, Description : description}
    return new Observable(observer=>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/images/update-details`,
          params,
          this.axiosConfig
        )
        .then(res=>observer.next())
        .catch(err=>console.log(err))
      })
    })
    
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Image/updateImageDetails.php`, params )
  }


  // error reports
  sendBugs(uid:number, date:string, content:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Errors/sendBugs.php?uid=${uid}&date=${date}&content=${content}` )
  }


// admin interface is preceded
  // for admins
  countUsers():Observable<any>{
    return null
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/countUsers.php` )
  }
  countRentalHouses():Observable<any>{
    return null
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/countRentalHouses.php` )
  }
  loginAdmin(login_credential : any):Observable<any>{
    return null
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/loginAdmin.php`, login_credential )
  }
  getAdminDetails_uname(username:string):Observable<any>{
    return null
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/getAdminDetails_uname.php?uname=${username}` )
  }
  getAdminDetails(id:number):Observable<any>{
    return null
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/getAdminDetails.php?id=${id}` )
  }
  getAllUsers():Observable<any>{
    return null
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/getAllUsers.php` )
  }
  getAllHouses():Observable<any>{
    return null
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/getAllHouses.php` )
  }
  checkPassword(uid:number, pword:string):Observable<any>{
    return null
    let params = {id: uid, password: pword}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/checkPassword.php`, params )
  }
  changeUsername(uid:number, uname:string):Observable<any>{
    return null
    let params = {id: uid, username: uname}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/changeUsername.php`, params )
  }
  changePasswordAdmin(uid:number, pword:string):Observable<any>{
    return null
    let params = {id: uid, password: pword}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/changePasswordAdmin.php`, params )
  }
  addAdmin(fname:string, pword:string, mname:string, lname:string, uname:string):Observable<any>{
    return null
    let params = {username: uname, firstname:fname, middlename:mname, lastname:lname, password:pword}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/addAdmin.php`, params)
  }



  /* done laravel */
  sendCode(mail : string, kodigo:string, name : string):Observable<any>{
    return new Observable((observer) => {
      this.authSanctum().subscribe(() => {
        axios.post(
          `${this.SERVER_NAME}/users/send-code`,
          {
            email_address: mail,
            code: kodigo,
            fullname: name
          }, this.axiosConfig
        )
        .then(()=>{
          observer.next()
        })
        .catch(err => { 
          console.log(err) 
          observer.error(err)
        })
      })
    })

  }

  /* this is the newly added api functions  */
  countRentalTypes(rrpid:number): Observable<number> {
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/rrp-types/count-rrp-types/${rrpid}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>console.log(err))
    })
  }

  addRRPType(RRPType : any) : Observable<any> {
    return new Observable((observer) =>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/rrp-types/create`,
          RRPType,
          this.axiosConfig
        )
        .then(res => observer.next())
        .catch(err => {
          console.log(err)
          observer.next()
          alert(err.message)
        })
      })
    })
  }

  updateRRP_Type(RRPType : any) : Observable<any> {
    return new Observable((observer) =>{
      this.authSanctum().subscribe(()=>{
        axios.post(
          `${this.SERVER_NAME}/rrp-types/update`,
          RRPType,
          this.axiosConfig
        )
        .then(res => observer.next())
        .catch(err => {
          console.log(err)
          observer.next()
          alert(err.message)
        })
      })
    })
  }

  getRRPTypesByRRP_ID(rrpId : number): Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/rrp-types/get-by-rrpId/${rrpId}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>{
        console.log(err)
        observer.next()
        alert(err.message)
      })
    })
  }

  getRRPTypeById(id : number): Observable<any>{
    return new Observable(observer=>{
      axios.get(
        `${this.SERVER_NAME}/rrp-types/get-by-id/${id}`,
        this.axiosConfig
      )
      .then(res=>observer.next(res.data))
      .catch(err=>{
        alert(err.message)
        observer.next()
        console.log(err)
      })
    })
  }

  getRRPTypeAvailability($RRP_Type_ID:number): Observable<string> {
    return new Observable(observer => {
      axios.get(
        `${this.SERVER_NAME}/rrp-types/get-availability/${$RRP_Type_ID}`,
        this.axiosConfig
      )
      .then(res => observer.next(res.data))
      .catch((err: AxiosError) => {
        console.log(err.response)
        alert(err.message)
      })
    })
  }

  getInvoicesByRRP_ID(RRP_ID : number, Month : number, Year : number ) : Observable<any> {
    return new Observable(observer => {
      axios.get(
        `${this.SERVER_NAME}/invoices/get-by-rrpid/${RRP_ID}?Month=${Month}&Year=${Year}`,
        this.axiosConfig
      )
      .then(res => observer.next(res.data))
      .catch((err : AxiosError) => {
        console.log(err.response)
        alert(err.message)
      })
    })
  }

  getInvoiceByID(Invoice_ID : string) : Observable<any> {
    return new Observable(observer => {
      axios.get(
        `${this.SERVER_NAME}/invoices/get-by-id/${Invoice_ID}`,
        this.axiosConfig
      )
      .then(res => observer.next(res.data))
      .catch((err : AxiosError) => {
        console.log(err.response)
        alert(err.message)
      })
    })
  }

}


