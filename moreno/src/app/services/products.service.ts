import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import api from "../util/keys";
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  url = api.link + "api/";

  constructor(private http: HttpClient) { }

  public select(type:string):Observable<any>{
    return this.http.post(this.url + type +"/se",{no:0},{headers:this.headers}).pipe(map(data => data));
  }

  public update(obj:any,type:string):Observable<any>{
    return this.http.post(this.url + type +"/up",obj,{headers:this.headers}).pipe(map(data=>data));
  }

  public insert(obj:any,type:string):Observable<any>{
    return this.http.post(this.url + type +"/ins",obj,{headers:this.headers}).pipe(map(data=>data));
  }
  public delete(obj:any,type:string):Observable<any>{
    return this.http.post(this.url + type +"/del",obj,{headers:this.headers}).pipe(map(data=>data));
  }
  public consult(id:number,type:string):Observable<any>{
    return this.http.get(this.url + type +"/cons/"+id,{headers:this.headers}).pipe(map(data=>data));
  }
}