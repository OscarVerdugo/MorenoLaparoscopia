import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    // if (this.auth.getCurrentUser() != null) {
    //   this.router.navigate(["/"]);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      cLogin: ["", Validators.required],
      cPassword: ["", Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.message = null;
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    return this.auth.loginUser(this.f.cLogin.value, this.f.cPassword.value).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        if(!data.bError){
          // this.auth.setToken(data.token);
          // this.auth.setUser(data.data);
          this.router.navigate(["/sistema"]);
        }else{
          this.message = data.message;
          setTimeout(()=>{
            this.message = null;
          },10000);
        }
      },
      err => {
        this.loading = false;
      }
    );
  }

}
