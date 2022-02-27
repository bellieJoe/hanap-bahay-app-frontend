import { Time } from '@angular/common';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { UserInfo } from 'os';
import { Observable } from 'rxjs';
import { AnnouncementDetails, ChecklistDetails, ComplaintsDetails, ContactDetails, ConversationDetails, CreateUserPolicy,GetTenantList,image,ImageProps,Messages,NotificationDetails,PaymentDetails,RatingsDetails,RentalHouseDetails,ReservationDetails,ReservationUpdates,SearchTenantList,SubscriptionData,UserDetails,UserProfile,UserUniqueInputs } from  '../providers/policy';
import axios from "axios"

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

  // new laravel server
  SERVER = "http://localhost:8000"
  SERVER_NAME = "http://localhost:8000"
  CSRF_TOKEN : any = null

  options = {
    withCredentials : true,
    observe: null,    
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  async authSanctum(){
    try {
      await axios.get(`${this.SERVER_NAME}/sanctum/csrf-cookie`, {
        withCredentials: true
      })
    } catch (error) {
        console.log(error)
    }
  }

  //for both users
  getName_uid(uid:number):Observable<string>{ //done laravel
    return this.httpClient.get<string>(`${this.SERVER_NAME}/users/${uid}/getFullName`) 
  }

  creteUserProfile_id(prof : UserProfile): Observable<UserProfile>{
    return this.httpClient.post<UserProfile>(`${this.SERVER_NAME}/profile/createUserProfile_id.php`, prof);
  }

  createUserPolicy(policy: CreateUserPolicy): Observable<CreateUserPolicy>{
    return this.httpClient.post<CreateUserPolicy>(`${this.SERVER_NAME}/createNewUser.php`, this.createUserPolicy);
  }
  
  getUserUniqueInputs():Observable<UserUniqueInputs[]>{ //done laravel
    return this.httpClient.get<UserUniqueInputs[]>(`${this.SERVER_NAME}/users/unique-inputs`) 
  }

  checkUserDistinct(col: string, val:string): Observable<boolean>{ //done laravel
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

  searchUser(username : string):Observable<CreateUserPolicy[]>{//after ssignup
    return this.httpClient.get<CreateUserPolicy[]>(`${this.SERVER_NAME}/searchUser.php/?username=${username}` )
  }

  searchUser_username(username : string):Observable<CreateUserPolicy[]>{
    return this.httpClient.get<CreateUserPolicy[]>(`${this.SERVER_NAME}/searchUser_username.php/?username=${username}` )
  }

  checkUsername(username:string):Observable<any>{
    return this.httpClient.post<any>(`${this.SERVER_NAME}/checkUsername.php`, {Username : username})
  }

  updateUserDetails_walkin(email:string, username:string, password:string,contact_number:string, birthdate:string, address:string):Observable<any>{
    let params = {Email:email,Username:username,Password:password,Contact_Number:contact_number,Birthdate:birthdate,Address:address}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/updateUserDetails_walkin.php`, params )
  }

  //for landlord only
  addRHSubscription(sub : CreateUserPolicy):Observable<any>{
    return this.httpClient.post<CreateUserPolicy>(`${this.SERVER_NAME}/addRHSubscription.php`,sub )
  }
  getSubscription_id(sub : SubscriptionData): Observable<SubscriptionData[]>{//unused
    return this.httpClient.get<SubscriptionData[]>(`${this.SERVER_NAME}/getSubscription_id.php` )
  }

  getOwnersRH_id(id : number):Observable<RentalHouseDetails[]>{//unused
    return this.httpClient.get<RentalHouseDetails[]>(`${this.SERVER_NAME}/getOwnersRH_id.php/?id=${id}` )
  }
  
  addNewRH(RH_Details : RentalHouseDetails):Observable<any>{
    return this.httpClient.post<RentalHouseDetails>(`${this.SERVER_NAME}/addNewRH.php`, RH_Details );
  }


    // for profile
  getUserDetails_id(id : number): Observable<UserDetails[]>{
    return this.httpClient.get<UserDetails[]>(`${this.SERVER_NAME}/profile/getUserDetails_id.php/?id=${id}` )
  }
  getUserProfile_id(id:number): Observable<UserProfile[]>{
    return this.httpClient.get<UserProfile[]>(`${this.SERVER_NAME}/profile/getUserProfile_id.php/?id=${id}` )
  }
  updateUserDetails(details:UserDetails , uniq : number, id : number):Observable<any>{
    return this.httpClient.post<UserDetails>(`${this.SERVER_NAME}/profile/updateUserDetails.php/?uniq=${uniq};id=${id}`, details )
  }
  updateUserProfile(profile : UserProfile, uniq : number): Observable<any>{
    return this.httpClient.post<UserProfile>(`${this.SERVER_NAME}/profile/updateUserProfile.php/?uniq=${uniq}`, profile )
  }
  confirmPassword(uid:number,pass:string): Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/profile/confirmPassword.php?uid=${uid}&pass=${pass}` )
  }
  changePassword(uid: number , oldpass :string, newpass:string): Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/profile/changePassword.php?uid=${uid}&oldpass=${oldpass}&newpass=${newpass}` )
  }
  updatePrivacy(settings: string, user_ID:number): Observable<any>{
    let params = {Settings : settings, User_ID : user_ID}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/profile/updatePrivacy.php`, params )
  }

  //  RH view of Owner 

  // messages from the RH
  getConvos_rrpid(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Messages/getConvos_rrpid.php/?rrpid=${rrpid}` )
  }
  getConvoDets_rrpid(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Messages/getConvoDets_rrpid.php/?rrpid=${rrpid}` )
  }

  // searching tenant users from db
  searchTenant_fistname(name : string):Observable<SearchTenantList[]>{
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_firstname.php/?name=${name}` )
  }
  searchTenant_2name(fname : string, sname: string):Observable<SearchTenantList[]>{
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_2name.php/?name1=${fname}&name2=${sname}` )
  }
  searchTenant_3name(fname : string, sname: string, tname:string):Observable<SearchTenantList[]>{
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_3name.php/?name1=${fname}&name2=${sname}&name3=${tname}` )
  }
  searchTenant_4name(fname : string, sname: string, tname:string, lname:string):Observable<SearchTenantList[]>{
    return this.httpClient.get<SearchTenantList[]>(`${this.SERVER_NAME}/RH_Management/searchTenant_4name.php/?name1=${fname}&name2=${sname}&name3=${tname}&name4=${lname}` )
  }
  getTenantList_rrpid(id : number): Observable<GetTenantList[]>{
    return this.httpClient.get<GetTenantList[]>(`${this.SERVER_NAME}/RH_Management/getTenantList_rrpid.php/?id=${id}` )
  }
  getTenantListInfo_uid(id:number):Observable<GetTenantList[]>{
    return this.httpClient.get<GetTenantList[]>(`${this.SERVER_NAME}/RH_Management/getTenantListInfo_uid.php/?id=${id}` )
  }
  addTenant_rrpid(id:number, rrpid:number, date:string, time: string):Observable<any>{
    return this.httpClient.get<Date>(`${this.SERVER_NAME}/RH_Management/addTenant_rrpid.php/?rrpid=${rrpid}&id=${id}&date=${date}&time=${time}` )
  }
  removeTenant_uid(id:number): Observable<number>{
    return this.httpClient.post<number>(`${this.SERVER_NAME}/RH_Management/removeTenant_uid.php/?id=${id}`, null )
  }
  addBoarderRRP(uid:number,rrpid:number): Observable<number>{
    return this.httpClient.get<number>(`${this.SERVER_NAME}/RH_Management/addBoardedRRP.php?uid=${uid}&rrpid=${rrpid}` )
  }
  checkIfRegistered_email(email : string): Observable<any>{
    let params = {Email : email}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/RH_Management/checkIfRegistered_email.php`, params )
  }
  regTenantMail(reciever_email:string, owner_email:string, sender_name : string, reciever_name:string): Observable<any>{
    let params = {Reciever_Email : reciever_email, Owner_Email : owner_email, Sender_Name : sender_name, Reciever_Name : reciever_name}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/regTenantMail.php`, params, )
  }

  registerTenant(email : string, firstname : string, middlename : string, lastname : string): Observable<any>{
    // let params = {Email : email, Firstname : firstname, Middlename : middlename, Lastname : lastname}
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/regTenant.php?Email=${email}&Firstname=${firstname}&Middlename=${middlename}&Lastname=${lastname}` )
  }

  // Announcements
  createAnnouncement_rrpid(announceDets : AnnouncementDetails): Observable<any>{
    return this.httpClient.post<AnnouncementDetails>(`${this.SERVER_NAME}/RH_Management/Announcements/createAnnouncement_rrpid.php`, announceDets )
  }
  getAnnouncements_rrpid(rrpid:number):Observable<AnnouncementDetails[]>{
    return this.httpClient.get<AnnouncementDetails[]>(`${this.SERVER_NAME}/RH_Management/Announcements/getAnnouncements_rrpid.php/?rrpid=${rrpid}` )
  }
  deleteAnnouncement_aid(id : number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Announcements/deleteAnnouncement_aid.php/?id=${id}` )
  }

  // Contacts
  addContact(detail : ContactDetails): Observable<any>{
    return this.httpClient.post<ContactDetails>(`${this.SERVER_NAME}/RH_Management/Contacts/addContact.php`, detail )
  }
  getContacts_rrpid(rrpid : number): Observable<ContactDetails[]>{
    return this.httpClient.get<ContactDetails[]>(`${this.SERVER_NAME}/RH_Management/Contacts/getContacts_rrpid.php?rrpid=${rrpid}` )
  }
  getContact_cid(cid : number):Observable<ContactDetails>{
    return this.httpClient.get<ContactDetails>(`${this.SERVER_NAME}/RH_Management/Contacts/getContact_cid.php?cid=${cid}` )
  }
  updateContact_cid(cid:number,cname:string,cnumber:number,ctype:string):Observable<ContactDetails>{
    return this.httpClient.get<ContactDetails>(`${this.SERVER_NAME}/RH_Management/Contacts/updateContact_cid.php?cid=${cid}&cname=${cname}&ctype=${ctype}&cnumber=${cnumber}` )
  }
  deleteContact_cid(cid:number, rrpid:number):Observable<ContactDetails[]>{
    return this.httpClient.get<ContactDetails[]>(`${this.SERVER_NAME}/RH_Management/Contacts/deleteContact_cid.php?cid=${cid}&rrpid=${rrpid}` )
  }


  // for Payment records
  addPayment(payment : PaymentDetails): Observable<any>{
    return this.httpClient.post<PaymentDetails>(`${this.SERVER_NAME}/RH_Management/Payments/addPayment.php`, payment )
  }
  getPayments(rrpid:number,month:number,year:number):Observable<PaymentDetails[]>{
    return this.httpClient.get<PaymentDetails[]>(`${this.SERVER_NAME}/RH_Management/Payments/getPayments.php?rrpid=${rrpid}&month=${month}&year=${year}` )
  }
  deletePayment_pid(pid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Payments/deletePayment_pid.php?pid=${pid}` )
  }
  getPayment_pid(pid : number):Observable<PaymentDetails>{
    return this.httpClient.get<PaymentDetails>(`${this.SERVER_NAME}/RH_Management/Payments/getPayment_pid.php?pid=${pid}` )
  }
  updatePayment(detail : PaymentDetails):Observable<any>{
    return this.httpClient.post<PaymentDetails>(`${this.SERVER_NAME}/RH_Management/Payments/updatePayment.php`,detail )
  }

  // Rh Profile
  getRHDetails_rrpid(rrpid : number):Observable<RentalHouseDetails>{
    return this.httpClient.get<RentalHouseDetails>(`${this.SERVER_NAME}/RH_Management/RH_Profile/getRHDetails_rrpid.php?rrpid=${rrpid}` )
  }
  computeAvailability_rrpid(rrpid : number):Observable<number>{
    return this.httpClient.get<number>(`${this.SERVER_NAME}/RH_Management/RH_Profile/computeAvailability_rrpid.php?rrpid=${rrpid}` )
  }
  getRatings_rrpid(rrpid : number):Observable<RatingsDetails[]>{
    return this.httpClient.get<RatingsDetails[]>(`${this.SERVER_NAME}/RH_Management/RH_Profile/getRatings_rrpid.php?rrpid=${rrpid}` )
  }

  // complaints
  getComplaints_rrpid(rrpid:number):Observable<ComplaintsDetails[]>{
    return this.httpClient.get<ComplaintsDetails[]>(`${this.SERVER_NAME}/RH_Management/Complaints/getComplaints_rrpid.php?rrpid=${rrpid}` )
  }

  deleteComplaint_comid(comid : number, rrpid:number):Observable<ComplaintsDetails[]>{
    return this.httpClient.get<ComplaintsDetails[]>(`${this.SERVER_NAME}/RH_Management/Complaints/deleteComplaints_comid.php?comid=${comid}&rrpid=${rrpid}` )
  }

  // rh settings
  updateRH(detail : RentalHouseDetails):Observable<RentalHouseDetails>{
    return this.httpClient.post<RentalHouseDetails>(`${this.SERVER_NAME}/RH_Management/RHSettings/updateRH.php`,detail )
  }

  countTenant_rrpid(rrpid : number):Observable<number>{
    return this.httpClient.get<number>(`${this.SERVER_NAME}/RH_Management/countTenant_rrpid.php?rrpid=${rrpid}` )
  }

  deleteRHData_rrpid(rrpid : number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/deleteRHData_rrpid.php?rrpid=${rrpid}` )
  }

  unboardTenants_rrpid(rrpid : number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/unboardTenant_rrpid.php?rrpid=${rrpid}` )
  }

  // for map
  getAllRH():Observable<RentalHouseDetails[]>{
    return this.httpClient.get<RentalHouseDetails[]>(`${this.SERVER_NAME}/Map/getAllRH.php`)
  }

  //bh profile view
  isBoarded(tid : number, rrpid : number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/isBoarded.php?tid=${tid}&rrpid=${rrpid}` )
  }

  addRating(tid: number, rrpid:number, rate_val : number, date:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/addRating.php?tid=${tid}&rrpid=${rrpid}&rate_val=${rate_val}&date=${date}`)
  }

  addReview(tid: number, rrpid:number, review_con : string, date:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/addReview.php?tid=${tid}&rrpid=${rrpid}&review_con=${review_con}&date=${date}`)
  }

  reserveRH(rrpid:number, uid:number, date:string, amount:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/reserveRH.php?uid=${uid}&rrpid=${rrpid}&date=${date}&amount=${amount}`)
  }

  // checklist
  addChecklist(uid:number,rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/addChecklist.php?uid=${uid}&rrpid=${rrpid}`)
  }
  isListed(uid:number,rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Map/isListed.php?uid=${uid}&rrpid=${rrpid}`)
  }

  // checklist
  getCheclist_uid(uid:number):Observable<ChecklistDetails[]>{
    return this.httpClient.get<ChecklistDetails[]>(`${this.SERVER_NAME}/Checklist/getChecklist_uid.php?uid=${uid}`)
  }
  checkAList_chid(chid:number, val:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Checklist/checkAList_chid.php?chid=${chid}&val=${val}`)
  }
  deleteAChecklist_chid(chid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Checklist/deleteAChecklist_chid.php?chid=${chid}`)
  }

  // reservation
  getReservations_uid(uid:number):Observable<ReservationDetails[]>{
    return this.httpClient.get<ReservationDetails[]>(`${this.SERVER_NAME}/Reservation/getReservations_uid.php?uid=${uid}`)
  }
  getReseveUpdates_reid(reid : number):Observable<ReservationUpdates[]>{
    return this.httpClient.get<ReservationUpdates[]>(`${this.SERVER_NAME}/Reservation/getReseveUpdates_reid.php?reid=${reid}`)
  }
  getReservations_rrpid(rrpid:number):Observable<ReservationDetails[]>{
    return this.httpClient.get<ReservationDetails[]>(`${this.SERVER_NAME}/Reservation/getReservations_rrpid.php?rrpid=${rrpid}` )
  }
  confirmReservation(reid:number, meet_date:string, meet_note:string, today : string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/confirmReservation.php?reid=${reid}&meet_date=${meet_date}&meet_note=${meet_note}&today=${today}` )
  }
  getReservationDetails_reid(reid:number):Observable<ReservationDetails>{
    return this.httpClient.get<ReservationDetails>(`${this.SERVER_NAME}/Reservation/getReservationDetails.php?reid=${reid}` )
  }
  updateReservation(reid:number, meet_date:string, meet_note:string, today : string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/updateReservation.php?reid=${reid}&meet_date=${meet_date}&meet_note=${meet_note}&today=${today}` )
  }
  declineReservation(reid:number, today : string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/declineReservation.php?reid=${reid}&today=${today}` )
  }
  cancelReservertion(reid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/cancelReservation.php?reid=${reid}` )
  }
  deleteReservation(reid:number, id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/deleteReservation.php?reid=${reid}&id=${id}` )
  }
  countNewReservation(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Reservation/countNewReservation.php?rrpid=${rrpid}` )
  }

  //notification
  addNotification(uid:number, date:string, type:string, content:string,url:string, extraid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/addNotification.php?uid=${uid}&date=${date}&type=${type}&content=${content}&url=${url}&extraid=${extraid}` )
  }
  getNotifications_uid(uid:number):Observable<NotificationDetails[]>{
    return this.httpClient.get<NotificationDetails[]>(`${this.SERVER_NAME}/Notification/getNotifications_uid.php?uid=${uid}` )
  }
  deleteNotification(notif_id):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/deleteNotification.php?notif_id=${notif_id}` )
  }
  markReadNotif(notif_id):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/markReadNotif.php?notif_id=${notif_id}` )
  }
  countNewNotification(uid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Notification/countNewNotification.php?uid=${uid}` )
  }
  

  //messaging
  checkConvExist(idA:number, idB : number, type:string, rrpid: number ):Observable<ConversationDetails>{
    return this.httpClient.get<ConversationDetails>(`${this.SERVER_NAME}/Messaging/checkConvExist.php?idA=${idA}&idB=${idB}&type=${type}&rrpid=${rrpid}` )
  }
  newConvo(idA:number,idB:number,type:string,rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/newConvo.php?idA=${idA}&idB=${idB}&type=${type}&rrpid=${rrpid}` )
  }
  getConvos_uid(uid : number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/getConvos_uid.php?uid=${uid}` )
  }
  addMessage(convoid : number, from:number, content:string, date:string, height: number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/addMessage.php?convoid=${convoid}&from=${from}&content=${content}&date=${date}&height=${height}` )
  }
  fetchMessages(convoid:number):Observable<Messages[]>{
    return this.httpClient.get<Messages[]>(`${this.SERVER_NAME}/Messaging/fetchMessages.php?convoid=${convoid}`)
  }
  getConvoHeight(convoid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/getConvoHeight.php?convoid=${convoid}` )
  }
  getConvoDets(convoid:number):Observable<ConversationDetails>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/getConvoDets.php?convoid=${convoid}` )
  }
  deleteConvo(convoid:number,uid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/deleteConvo.php?convoid=${convoid}&uid=${uid}` )
  }
  checkNewMesagges(uid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/checkNewMessages.php?uid=${uid}` )
  }
  checkNewMesagges_rrpid(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/checkNewMessages_rrpid.php?rrpid=${rrpid}` )
  }
  countNewMessages(convoid:number, uid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/countNewMessages.php?convoid=${convoid}&uid=${uid}`)
  }
  setMessageRead(messid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Messaging/setMessageRead.php?messid=${messid}` )
  }
  

  // tenant portal
  // announcements
  getTenantDetails(uid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/TenantPortal/Announcement/getTenantDetails.php?uid=${uid}` )
  }
  //payment history
  getPaymentHistory_uid(uid:number, rrpid:number, date:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/TenantPortal/PaymentHistory/getPaymentHistory_uid.php?uid=${uid}&rrpid=${rrpid}&date=${date}` )
  }
  // complains
  addComplain(uid: number, rrpid: number, date:string, content:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/TenantPortal/Complaints/addComplain.php?uid=${uid}&rrpid=${rrpid}&date=${date}&content=${content}` )
  }
  setComplainOld(com_id):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Complaints/setComplainOld.php?com_id=${com_id}`)
  }
  countComplaints(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/RH_Management/Complaints/countComplaints.php?rrpid=${rrpid}` )
  }

  
  // delete this later hehe
  sampleUploadImage(img:Blob):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/sampleUploadImage.php?img=${img}` )
  }
  tryFetchImage(imgid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/tryFetchImage.php?imgid=${imgid}` )
  }

  sampleSetFile(bases : image):Observable<any>{
    return this.httpClient.post<any>(`${this.SERVER_NAME}/sampleSetFile.php`, bases)
  }

  // tunay na upload image
  setProfilePicture(image : ImageProps):Observable<any>{
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Image/setProfilePicture.php`, image )
  }

  fetchImages_rrpid(rrpid:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Image/fetchImages_rrpid.php?rrpid=${rrpid}` )
  }
  fetchImage(id : number, type : string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Image/fetchImage.php?id=${id}&type=${type}` )
  }
  deleteImage(imgid:number , filename: string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Image/deleteImage.php?imgid=${imgid}&filename=${filename}` )
  }
  updateImageDetails(img_id : number, title : string, description : string):Observable<any>{
    let params = {IMG_ID : img_id, Title : title, Description : description}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Image/updateImageDetails.php`, params )
  }

  // error reports
  sendBugs(uid:number, date:string, content:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Errors/sendBugs.php?uid=${uid}&date=${date}&content=${content}` )
  }

  // for admins
  countUsers():Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/countUsers.php` )
  }
  countRentalHouses():Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/countRentalHouses.php` )
  }

  loginAdmin(login_credential : any):Observable<any>{
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/loginAdmin.php`, login_credential )
  }

  getAdminDetails_uname(username:string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/getAdminDetails_uname.php?uname=${username}` )
  }

  getAdminDetails(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/getAdminDetails.php?id=${id}` )
  }

  getAllUsers():Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/getAllUsers.php` )
  }

  getAllHouses():Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_NAME}/Admin/Dashboard/getAllHouses.php` )
  }

  checkPassword(uid:number, pword:string):Observable<any>{
    let params = {id: uid, password: pword}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/checkPassword.php`, params )
  }

  changeUsername(uid:number, uname:string):Observable<any>{
    let params = {id: uid, username: uname}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/changeUsername.php`, params )
  }

  changePasswordAdmin(uid:number, pword:string):Observable<any>{
    let params = {id: uid, password: pword}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/changePasswordAdmin.php`, params )
  }

  addAdmin(fname:string, pword:string, mname:string, lname:string, uname:string):Observable<any>{
    let params = {username: uname, firstname:fname, middlename:mname, lastname:lname, password:pword}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/Admin/addAdmin.php`, params)
  }

  sendCode(mail : string, kodigo:string, name : string):Observable<any>{
    let params = {email : mail, code : kodigo, fullname : name}
    return this.httpClient.post<any>(`${this.SERVER_NAME}/phpmail.php`, params )
  }

}


