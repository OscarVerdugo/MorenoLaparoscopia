import { Injectable } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { NonePipe  } from "../util/none-pipe.pipe";

@Injectable({
  providedIn: "root"
})
export class CatalogsService {
  lstCatalogs = [
    {
      name: "products",
      key: "nIdProducto",
      fields: [
        {
          name: "nIdProduct",
          type: "hidden",
          label: ""
        },
        {
          name: "cDescripcion",
          type: "text",
          label: "Descripcion"
        },
        {
          name: "nPrecio",
          type: "number",
          label: "Precio Unitario"
        }
      ],
      combos: [
        
      ],
      columns: [
        {
          name: "nIdProducto",
          display: "ID",
          pipe: NonePipe
        },
        {
          name: "cDescripcion",
          display: "Descripcion",
          pipe: NonePipe
        },
        {
          name: "nPrecio",
          display: "Precio Unitario",
          pipe: CurrencyPipe
        }
      ],
      tags: {
        title: "Productos",
        plural: "productos",
        singular: "producto"
      },
      object: {
        nIdProducto: 0,
        cDescripcion: "",
        nPrecio: 0,
      },
      store: "lstProductos"
    },
    {
      name: "customers",
      key: "nIdCliente",
      fields: [
        {
          name: "nIdCliente",
          type: "hidden",
          label: ""
        },
        {
          name: "cNombre",
          type: "text",
          label: "Nombre"
        },
        {
          name: "cDireccion",
          type: "text",
          label: "Direccion"
        },
        {
          name: "cNumTel",
          type: "number",
          label: "Telefono"
        }
      ],
      combos: [
      ],
      columns: [
        {
          name: "nIdCliente",
          display: "ID",
          pipe: NonePipe
        },
        {
          name: "cNombre",
          display: "Nombre",
          pipe: NonePipe
        },
        {
          name: "cDireccion",
          display: "Direccion",
          pipe: NonePipe
        },
        {
          name: "cNumTel",
          display: "Num. Telefonico",
          pipe: NonePipe
        }
      ],
      tags: {
        title: "Clientes",
        plural: "clientes",
        singular: "cliente"
      },
      object: {
        nIdCliente: 0,
        cNombre: "",
        cDireccion: "",
        cNumTel: ""
      },
      store: "lstClientes"
    },
    {
      name: "employees",
      key: "nIdEmpleado",
      fields: [
        {
          name: "nIdEmpleado",
          type: "hidden",
          label: ""
        },
        {
          name: "cNombre",
          type: "text",
          label: "Nombre"
        },
        {
          name: "cTelefono",
          type: "tel",
          label: "Teléfono"
        },
        {
          name: "cDireccion",
          type: "text",
          label: "Dirección"
        },
        
      ],
      combos: [
        {
          name: "nIdPuesto",
          store: "lstPuestos",
          display: "cDescripcion",
          label: "Puesto"
        }
      ],
      columns: [
        {
          name: "nIdEmpleado",
          display: "ID",
          pipe: NonePipe
        },
        {
          name: "cNombre",
          display: "Nombre",
          pipe: NonePipe
        },
        {
          name: "cTelefono",
          display: "Teléfono",
          pipe: NonePipe
        },{
          name: "cDireccion",
          display: "Dirección",
          pipe: NonePipe
        },
        {
          name: "cDescripcionPuesto",
          display: "Puesto",
          pipe: NonePipe
        }
        
      ],
      tags: {
        title: "Empleados",
        plural: "empleados",
        singular: "empleado"
      },
      object: {
        nIdEmpleado: 0,
        cNombre: "",
        nIdPuesto: 0,
        cTelefono:"",
        cDireccion:""
      },
      store: "lstEmpleados"
    }
  ];
  constructor() {}

  cleanObject(type: any): any {
    console.log(this.goclone(this.lstCatalogs.find(x => x.name == type).object));
    return this.goclone(this.lstCatalogs.find(x => x.name == type).object);
  }

  goclone(source) {
    if (Object.prototype.toString.call(source) === "[object Array]") {
      let clone = [];
      for (var i = 0; i < source.length; i++) {
        clone[i] = this.goclone(source[i]);
      }
      return clone;
    } else if (typeof source == "object") {
      let clone = {};
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          clone[prop] = this.goclone(source[prop]);
        }
      }
      return clone;
    } else {
      return source;
    }
  }
}
