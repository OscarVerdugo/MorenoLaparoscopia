import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContentComponent } from './layout/content/content.component';
import { MainnComponent } from './layout/mainn/mainn.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ProductsComponent } from './pages/products/products.component';
import { ProcessComponent } from './pages/process/process.component';
import { ProcessConsultComponent } from './pages/process-consult/process-consult.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { CurrencyPipe,DatePipe } from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NonePipe } from './util/none-pipe.pipe';
import { DynamicPipe } from './util/dynamic.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MainnComponent,
    SidebarComponent,
    LoginComponent,
    ProductsComponent,
    ProcessComponent,
    ProcessConsultComponent,
    NonePipe,
    DynamicPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    NonePipe,
    DynamicPipe,
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
