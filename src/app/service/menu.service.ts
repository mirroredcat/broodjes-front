

import {CrudConfig, MenuCrud} from "./menu-crud";
import {Menu} from "../models/menu-api/menu.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const config: CrudConfig = {
  many: 'sandwiches',
  single: (id) => `${id}`,
  }

@Injectable({
  providedIn: 'root'
})
export class MenuService extends MenuCrud<Menu> {

  dayMenu: Menu;

  constructor(
    protected httpC: HttpClient,
  ) {
    super(httpC, config);
  }



}
