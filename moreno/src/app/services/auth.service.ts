import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";

import api from "../Util/keys";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  url = api.link + "api/employees/";

  loginUser(cLogin: string, cPassword: string): Observable<any> {
    return this.http
      .post(
        this.url + "login",
        { cLogin, cPassword },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setUser(user:any){
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser',user_string);
  }

  setToken(token:string){
    localStorage.setItem('accessToken',token);
  }

  getToken():string{
    return localStorage.getItem('accessToken');
  }

  getCurrentUser():any{
    let user_string = localStorage.getItem('currentUser');
    if(!isNullOrUndefined(user_string)){
      return JSON.parse(user_string);
    }else{
      return null;
    }
  }

   logoutUser(){
    let user_string = localStorage.getItem('currentUser');
    if(!isNullOrUndefined(user_string)){
      let {nIdUsuario} = JSON.parse(user_string);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accessToken');
      return this.http.post(this.url+'logout',{nIdUsuario},{headers:this.headers}).pipe(map(data => data));
    }
  }
}
