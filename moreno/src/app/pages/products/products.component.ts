import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router,ActivatedRoute } from "@angular/router";

import { PaginationService } from "../../services/pagination.service";
import { ProductsService } from "../../services/products.service";
import { ProvidersService } from "../../services/providers.service";

import { CatalogsService } from "../../services/catalogs.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  @ViewChild("msg",{static:false}) msg: ElementRef;
  @ViewChild("del",{static:false}) del: ElementRef;
  textMsg: string = ""; //modal alert msg
  modalTitle = ""; //modal title daaaaa

  model = {};
  nId: number = null;
  modalValid = false;

  lst: any = {
    lstProductos: [],
    lstProveedores: [],
    lstClientes: [],
    lstEmpleados: [],
    lstSucursales: [],
    lstPuestos: []
  };
  lstCurrent = [];

  constructor(
    private producstService: ProductsService,
    private pag: PaginationService,
    private providersService: ProvidersService,
    private modalService: NgbModal,
    private catalogs: CatalogsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.model = this.catalogs.goclone(
        this.catalogs.lstCatalogs.find(x => x.name == params.type)
      );

      if (this.model == undefined) {
        this.showMsg("Error en la ruta, intente de nuevo.");
        this.router.navigate(["/"]);
        return;
      }
      this.selectCatalog(this.model["name"]);
    });
  }

  selectCatalog(name: string) {
    this.producstService.select(name).subscribe(data => {
      if (!data.bError) {
        this.lst[this.model["store"]] = data.data;
        this.lstCurrent = this.pag.getList(this.lst[this.model["store"]]);
        setTimeout(() => {
          this.changePage(1);
        }, 500);
      }
    });

    this.producstService.select("branchoffice").subscribe(data => {
     
      if (!data.bError) {
        this.lst["lstSucursales"] = data.data;
      }
    });

    this.producstService.select("employments").subscribe(data => {
      
      if (!data.bError) {
        this.lst["lstPuestos"] = data.data;
      }
    });
  }

  edit(obj, nId, content, ev) {
    ev.preventDefault();
    this.nId = nId;
    let i;
    if (nId != 0) {
      for (i in this.model["object"]) {
        this.model["object"][i] = obj[i];
      }
      // this.selectProduct.cDescripcion = i.cDescripcion;
      // this.selectProduct.cUnidad = i.cUnidad;
      // this.selectProduct.nIdProducto = nId;
      // this.selectProduct.nIdProveedor = i.nIdProveedor;
      // this.selectProduct.nPrecio = i.nPrecio;
      this.modalTitle = "Actualizar " + this.model["tags"].singular;
    } else {
      this.model["object"] = this.catalogs.cleanObject(this.model["name"]);
      this.modalTitle = "Crear " + this.model["tags"].singular;
    }
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  prueba() {
    console.log(this.lst["lstProveedores"]);
  }

  async save(nId): Promise<any> {
    let msg = "";
    if (!this.validateForm()) return;
    this.modalService.dismissAll();
    if (nId != 0) {
      await this.producstService
        .update(this.model["object"], this.model["name"])
        .subscribe(data => {
          if (!data.bError) {
            this.showMsg(data.message);
          } else {
            this.showMsg(data.message);
          }
          this.ngOnInit();
        });
    } else {
      await this.producstService
        .insert(this.model["object"], this.model["name"])
        .subscribe(data => {
          if (!data.bError) {
            this.showMsg(data.message);
          } else {
            this.showMsg(data.message);
          }
          this.ngOnInit();
        });
    }
  }

  validateForm(): boolean {
    let cont = 0;
    for (let i in this.model["object"]) {
      if (
        (!isNaN(this.model["object"][i]) && this.model["object"][i] < 0) ||
        (isNullOrUndefined(this.model["object"][i]) ||
          this.isNullOrWhitespace(this.model["object"][i]))
      ) {
        console.log(i);
        let field = document.querySelector("#" + i);
        field.className = "form-control is-invalid";
        let fb = document.querySelector("#" + i + "fb");
        fb.className = "invalid-feedback";

        setTimeout(() => {
          field.className = "form-control";
          fb.className = "invalid-feedback d-none";
        }, 5000);
        cont++;
      }
    }
    if (cont > 0) {
      return false;
    } else {
      return true;
    }
  }

  delete(obj, ev) {
    let msg = "";
    ev.preventDefault();
    this.modalService.open(this.del, { size: "sm" }).result.then(
      data => {
        console.log(data);
        console.log(obj);
        if (data) {
          this.producstService
            .delete(obj, this.model["name"])
            .subscribe(res => {
              if (!res.bError) {
                this.showMsg(res.message);
              } else {
                this.showMsg(res.message);
              }
              this.ngOnInit();
            });
        }
      },
      result => {}
    );
  }

  showMsg(text: string) {
    this.textMsg = text;
    this.modalService.open(this.msg, { size: "sm" });
  }

  changePage(n, ev?) {
    ev != undefined ? ev.preventDefault() : "";
    let p = document.querySelector("#page" + this.pag.nCurrentPage);
    p.className = "page-item";
    let np = document.querySelector("#page" + n);
    np.className = "page-item active";
    this.lstCurrent = this.pag.changePage(n);
  }

  isNullOrWhitespace(input) {
    input += "";
    if (typeof input === "undefined" || input == null) return true;

    return input.trim().length < 1;
  }
}
