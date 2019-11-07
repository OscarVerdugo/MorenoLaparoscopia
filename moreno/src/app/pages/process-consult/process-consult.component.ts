import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { DatePipe, CurrencyPipe } from "@angular/common";
import { ProductsService } from "../../services/products.service";
import { PaginationService } from "../../services/pagination.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-process-consult',
  templateUrl: './process-consult.component.html',
  styleUrls: ['./process-consult.component.scss']
})
export class ProcessConsultComponent implements OnInit {
  @ViewChild("del",{static:false}) del: ElementRef;
  lstCurrent = [];
  lstVentas = [];
  textMsg ="";
  constructor(private service: ProductsService,private pag:PaginationService,private router:Router,private modalService:NgbModal) { }

  ngOnInit() {
    this.service.select('sales').subscribe(data=>{
      if(!data.bError){
        this.lstVentas = data.data;
        this.lstCurrent = this.pag.getList(data.data);
        setTimeout(() => {
          this.changePage(1);
        }, 500);
      }
    });
  }

  changePage(n, ev?) {
    ev != undefined ? ev.preventDefault() : "";
    let p = document.querySelector("#page" + this.pag.nCurrentPage);
    p.className = "page-item";
    let np = document.querySelector("#page" + n);
    np.className = "page-item active";
    this.lstCurrent = this.pag.changePage(n);
  }


  edit(id,ev){
    ev.preventDefault();
    this.router.navigate(["sistema/process"],{queryParams:{type:'sale',id:id}});
  }

  delete(id, ev) {
    ev.preventDefault();
    let msg = "";
    this.modalService.open(this.del, { size: "sm" }).result.then(
      data => {
        if (data) {
          this.service
            .delete({nIdVenta:id}, 'sales')
            .subscribe(res => {
              if (!res.bError) {
                this.showMsg(res.message);
              } else {
                this.showMsg(res.message);
              }
              this.modalService.dismissAll();
              this.ngOnInit();
            });
        }
      },
      result => {}
    );
  }

  showMsg(text: string) {
    this.textMsg = text;
    this.modalService.open(this.del, { size: "sm" });
  }

}
