import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: "General",
      type: "header"
    },
    {
      title: "Rentas",
      icon: "fa fa-coins",
      active: false,
      type: "dropdown",
      badge: {
        text: "New ",
        class: "badge-warning"
      },
      submenus: [
        {
          title: "Generar",
          type: "sales",
          link:"/process"
        },
        {
          title: "Consultar",
          type:"consult-process",
          link:"/consult-process"
        }
      ]
    }
    ,
    {
      title: "Catálogos",
      icon: "fa fa-align-justify",
      active: false,
      type: "dropdown",
      submenus: [
        {
          title: "Clientes",
          type: "customers",
          link:"/catalogs"
        },
        {
          title: "Empleados",
          type: "employees",
          link:"/catalogs"
        },
        {
          title: "Equipos",
          type: "products",
          link:"/catalogs"
        }
      ]
    }
  ];
  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
