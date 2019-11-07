import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { MainnComponent } from "./layout/mainn/mainn.component";
import { ProcessComponent } from "./pages/process/process.component";
import { ProcessConsultComponent } from "./pages/process-consult/process-consult.component";
import { ProductsComponent } from "./pages/products/products.component";
const routes: Routes = [
  { path: "login", component: LoginComponent },
  {path:"sistema", component:MainnComponent
  , children:[
    { path: "catalogs", component: ProductsComponent },
    { path: 'process', component: ProcessComponent },
    { path: 'consult-process', component: ProcessConsultComponent },
  //   { path: 'purchases', component: PurchasesComponent },
  // {  path: 'purchases-consult', component: PurchasesConsultComponent },
  //   { path: 'inventory', component: InventoryComponent }
  ]},
  // { path: "", redirectTo: "/login", pathMatch:"full" },
  // { path: "**", redirectTo: "/login", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
