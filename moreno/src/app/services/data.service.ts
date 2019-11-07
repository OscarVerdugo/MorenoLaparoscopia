import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new Subject<any>();
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data:any){
    this.dataSource.next(data);
  }
}
