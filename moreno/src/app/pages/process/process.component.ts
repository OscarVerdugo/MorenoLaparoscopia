import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { DatePipe, CurrencyPipe } from "@angular/common";
import { ProductsService } from "../../services/products.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.scss"]
})
export class ProcessComponent implements OnInit {
  @ViewChild("error",{static:false}) errorModal: ElementRef;
  @ViewChild("msg",{static:false}) msgModal: ElementRef;
  Cliente = {};
  Empleado = {};
  display = false;
  nIdVenta = 0;
  venta = {
    nIdCliente: 0,
    nIdEmpleado: 0,
    dFecha: this.dp.transform(new Date(), "yyyy/MM/dd"),
    nSubTotal: 0,
    nIva: 0,
    nTotal: 0,
    bPagado:false
  };
  nIdSucursal: number = 0;
  lstDetalles = [];
  lstDetallesResp = [];
  lstProductos = [];
  lstClientes = [];
  lstEmpleados = [];
  valid: boolean = false;
  textMsg: string = "";
  constructor(
    private service: ProductsService,
    private cp: CurrencyPipe,
    private dp: DatePipe,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.addDetail();
    this.addDetail();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      if (data.id != undefined) {
        this.nIdVenta = data.id;
        this.service.consult(this.nIdVenta, "sales").subscribe(venta => {
          if (!venta.bError) {
            this.lstDetalles = venta.data.detalles;
            this.lstDetallesResp = venta.data.detalles;
            this.venta = venta.data.venta;
            this.venta.dFecha = this.dp.transform(
              this.venta.dFecha,
              "yyyy/MM/dd"
            );
            delete this.venta["nIdVenta"];
            for (let i = 0; i < this.lstDetalles.length; i++) {
              this.lstDetalles["index"] = i;
            }
          }
        });
      }
    });
    this.service.select("customers").subscribe(data => {
      if (!data.bError) {
        this.lstClientes = data.data;
      }
    });
    this.service.select("employees").subscribe(data => {
      if (!data.bError) {
        this.lstEmpleados = data.data;
      }
    });
    this.service.select("products").subscribe(data => {
      if (!data.bError) {
        this.lstProductos = data.data;
      }
    });
    this.nIdSucursal = JSON.parse(localStorage.getItem("currentUser"))[
      "nIdSucursal"
    ];
  }

  changeCustomer(ev) {
    this.Cliente = ev;
  }
  changeEmployee(ev) {
    this.Empleado = ev;
  }

  addDetail(ev?) {
    if (ev != undefined) ev.preventDefault();
    let det = {
      nIdProducto: 0,
      index: this.lstDetalles.length,
      nPrecio: 0,
      nCantidad: 0,
      nImporte: 0
    };
    this.lstDetalles.push(det);
  }

  deleteDetail(i, ev) {
    ev.preventDefault();
    let index = this.lstDetalles.findIndex(d => d.index == i);
    this.lstDetalles.splice(index, 1);
  }

  changeDetail(ev, i) {
    let index = this.lstDetalles.findIndex(d => d.index == i);
    //this.lstDetalles[index].nIdProducto = ev.nIdProducto;
    this.lstDetalles[index].nPrecio = ev.nPrecio;
    this.lstDetalles[index].nCantidad = 1;
    this.lstDetalles[index].nImporte = ev.nPrecio;
    this.calcTot();
  }

  calcTot() {
    this.venta.nSubTotal = 0;
    this.venta.nTotal = 0;
    this.venta.nIva = 0;
    for (let p of this.lstDetalles) {
      this.venta.nSubTotal += p.nCantidad * p.nPrecio;
      this.venta.nIva += p.nCantidad * p.nPrecio * 0.16;
      p.nImporte = p.nCantidad * p.nPrecio;
    }
    this.venta.nTotal = this.venta.nSubTotal + this.venta.nIva;
  }

  validForm() {
    let cont = 0;
    if (this.venta.nIdCliente == 0) {
      let c = document.querySelector("#" + "cliente");
      c.className = "form-text";
      cont++;
      setTimeout(function() {
        c.className = "form-text d-none";
      }, 5000);
    }
    if (this.venta.nIdEmpleado == 0) {
      let c = document.querySelector("#" + "empleado");
      c.className = "form-text";
      cont++;
      setTimeout(function() {
        c.className = "form-text d-none";
      }, 5000);
    }
    for (let det of this.lstDetalles) {
      if (det.nIdProducto == 0) {
        let p = document.querySelector("#" + "producto" + det.index);
        p.className = "form-text";
        cont++;
        setTimeout(function() {
          p.className = "form-text d-none";
        }, 5000);
      }
      if (det.nCantidad <= 0) {
        let p = document.querySelector("#" + "cantidad" + det.index);
        let plbl = document.querySelector("#" + "cantidadlabel" + det.index);
        p.className = "form-control is-invalid";
        plbl.className = "invalid-feedback";
        setTimeout(function() {
          p.className = "form-control";
          plbl.className = "invalid-feedback d-none";
        }, 5000);
      }
    }
    if (this.lstDetalles.length == 0) {
      this.modalService.open(this.errorModal, { size: "sm" });
      return false;
    }
    if (cont > 0) {
      return false;
    } else {
      return true;
    }
  }

  save() {
    if (!this.validForm()) return;
    for (let obj of this.lstDetalles) delete obj["index"];
    if (this.nIdVenta == 0) {
      this.service
        .insert({ venta: this.venta, lstDetalles: this.lstDetalles }, "sales")
        .subscribe(data => {
          if (!data.bError) {
            for (let det of this.lstDetalles) {
              this.service
                .insert(
                  {
                    nIdProducto: det.nIdProducto,
                    nIdSucursal: this.nIdSucursal,
                    nCantidad: -1 * det.nCantidad
                  },
                  "inventory"
                )
                .subscribe(data2 => {
                  console.log(data2);
                });
            }
            this.clear();
          }
          this.textMsg = data.message;
          this.modalService.open(this.msgModal, { size: "sm" });
        });
    } else {
      delete this.venta["cNombreCliente"];
      delete this.venta["cNombreEmpleado"];
      this.service
        .update(
          {
            venta: this.venta,
            lstDetalles: this.lstDetalles,
            nIdVenta: this.nIdVenta
          },
          "sales"
        )
        .subscribe(data => {
          if (!data.bError) {
            // this.generatePDF();
            for (let det of this.lstDetallesResp) {
              this.service
                .insert(
                  {
                    nIdProducto: det.nIdProducto,
                    nIdSucursal: this.nIdSucursal,
                    nCantidad: det.nCantidad
                  },
                  "inventory"
                )
                .subscribe(data2 => {});
            }
            for (let det of this.lstDetalles) {
              this.service
                .insert(
                  {
                    nIdProducto: det.nIdProducto,
                    nIdSucursal: this.nIdSucursal,
                    nCantidad: -1 * det.nCantidad
                  },
                  "inventory"
                )
                .subscribe(data2 => {});
            }
            this.clear();
          }
          this.textMsg = data.message;
          this.modalService.open(this.msgModal, { size: "sm" });
        });
    }
  }

  descPro(id) {
    return id != 0
      ? this.lstProductos.find(x => x.nIdProducto == id).cDescripcion
      : "";
  }

  clear() {
    this.venta = {
      nIdCliente: 0,
      nIdEmpleado: 0,
      dFecha: this.dp.transform(new Date(), "yyyy/MM/dd"),
      nSubTotal: 0,
      nIva: 0,
      nTotal: 0,
      bPagado:false
    };
    this.lstDetalles = [];
    this.addDetail();
    this.addDetail();
  }

  generatePDF(ev) {
    ev.preventDefault();
    var data = document.getElementById("contentToConvert");
    console.log(document.getElementById("contentToConvert"));
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 842;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      console.log(canvas);
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var MarginTop = 0;
      var MarginLeft = 0;

      pdf.addImage(
        contentDataURL,
        "PNG",
        MarginLeft,
        MarginTop,
        imgWidth,
        imgHeight
      );
      pdf.save("Comprobante.pdf");
    });
  }
}

