import { Injectable } from '@angular/core';
import { DbapiService } from './dbapi.service';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  constructor(
    private dbapi : DbapiService
  ) { }


}
