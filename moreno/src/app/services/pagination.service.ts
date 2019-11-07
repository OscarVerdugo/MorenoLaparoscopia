import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  lst = [];
  nCurrentPage = 1;
  nReg = 8;
  nPages = 0;
  lstNumbers = [];
  constructor() { 

  }

  getList(list:Array<any>){
    this.lst = list;
    this.nPages = Math.ceil(this.lst.length / this.nReg);
    this.lstNumbers = new Array(this.nPages).fill(0);
    return this.changePage(this.nCurrentPage);
  }

  changePage(n:number){
    if(n != 0 && n != this.nPages+1){
      this.nCurrentPage = n;
    }
    return this.lst.slice((this.nCurrentPage-1)*this.nReg,((this.nCurrentPage-1)*this.nReg)+this.nReg);
  }
}
