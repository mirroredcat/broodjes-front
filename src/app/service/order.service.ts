import { Injectable } from '@angular/core';
import {CrudConfig} from "./menu-crud";
import {HttpClient} from "@angular/common/http";
import {OrderCrud} from "./order-crud";
import {Menu} from "../models/menu-api/menu.model";

const config: CrudConfig = {
  many: 'orders',
  single: (id) => `persons/${id}`,
}


@Injectable({
  providedIn: 'root'
})
export class OrderService extends OrderCrud<any> {

  dayMenu: Menu;
  categories: any;
  dayOrders: any;

  constructor(
    protected httpC: HttpClient,
  )
  {
    super(httpC, config);
    this.dayMenu = null;
  }

  setDayMenu(menu: Menu) :Menu{
    return this.dayMenu = menu;
  }

}
