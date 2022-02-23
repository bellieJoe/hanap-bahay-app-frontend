import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DbapiService } from 'src/app/providers/dbapi.service';
import { UserserviceService } from 'src/app/providers/userservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  {

  constructor(
    private dbapi : DbapiService,
    private storage : Storage,
    private router: Router
  ) { }

  UserCount : number
  RHCount : number
  Admin_ID : number
  Admin_Type : string
  Users : any = []
  Houses : any = []
  ShowContent : string
  AdminName: string
  Username : string


  @ViewChild('total_user') total_user : IonCard
  @ViewChild('total_house') total_house : IonCard

  countUsers(){
    setInterval(()=>{
      this.dbapi.countUsers().subscribe(count=>{
        this.UserCount = count
      })
    }, 3000)
  }

  countRentalHouses(){
    setInterval(()=>{
      this.dbapi.countRentalHouses().subscribe(count=>{
        this.RHCount = count
      })
    }, 5000)
  }

  async isAuth(){
    return new Promise<boolean>(resolve=>{
      this.storage.get("ad_session").then(det=>{
        if(det){
          this.Admin_ID = det.uid
          this.Admin_Type = det.role
          resolve(true)
        }else{
          resolve(false)
          this.router.navigate([''])
        }
      })
    })
    
  }

  loadUsers(){
    this.total_user.color = "secondary"
    this.total_house.color = "light"
    this.ShowContent = "users"
    this.dbapi.getAllUsers().subscribe(users=>{
      this.Users = users
    })
  }

  loadHouses(){
    this.total_user.color = "light"
    this.total_house.color = "secondary"
    this.ShowContent = "houses"
    this.dbapi.getAllHouses().subscribe(houses=>{
      this.Houses = houses
    })
  }

  setAdminName(){
    this.dbapi.getAdminDetails(this.Admin_ID).subscribe(det=>{
      this.AdminName = `${det.Firstname} ${det.Lastname}`
      this.Username = det.Username
    })
  }
  
  logout(){
    
    this.storage.clear().then(()=>{
      location.href = "/tagapangasiwa?kodigo=101898"
    })
  }



  ionViewDidEnter(){
    this.isAuth().then(resp=>{
      if(resp){
        this.dbapi.countUsers().subscribe(count=>{
          this.UserCount = count
          this.countUsers()
          this.loadUsers()
          this.setAdminName()
    
        })
        this.dbapi.countRentalHouses().subscribe(count=>{
          this.RHCount = count
          this.countRentalHouses()
        })
      }
    })
    
  }


}
