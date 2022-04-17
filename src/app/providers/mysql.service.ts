import { Injectable } from '@angular/core';
import mysql from "mysql"
import { DbapiService } from './dbapi.service';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  constructor(
    private dbapi : DbapiService
  ) { }

  con = mysql.createConnection(this.dbapi)

  connect(){
    console.log(mysql)
    this.con.connect()
  }
}
