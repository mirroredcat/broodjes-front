import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

import {CrudConfig} from "./session-crud";
import {Entity} from "../models/entity";
import {Menu} from "../models/menu-api/menu.model";


export abstract class OrderCrud<T extends Entity>
{
    protected http: HttpClient;
    protected config: CrudConfig;

    constructor(
      httpClient: HttpClient,
      config: CrudConfig
    ) {
      this.http = httpClient;
      this.config = config;
    }

    findAll(): Observable<Array<T>>
    {

      return this.http.get<Array<T>>(environment.orderApi.url + "/"+ this.config.many);
    }

    update(entity: T, id: number){
      console.log(environment.orderApi.url  +"/"+  this.config.many  +"/"+  this.config.single(id))
      return this.http.put<T>(environment.orderApi.url  +"/"+  this.config.many  +"/"+  this.config.single(id) , entity);
    }

    delete(id: number)
    {
      return this.http.delete<T>(environment.orderApi.url +"/"+ this.config.many +"/"+  this.config.single(id));
    }

    setMenu(entity: T)
    {
      console.log('made it to set menu in menu service')
      console.log(entity)
      console.log(environment.orderApi.url)
      return this.http.post<T>(environment.orderApi.url , entity);
    }

    getMenu() {
      return this.http.get<any>(environment.orderApi.url + "/menu");
    }

    print(){
      return this.http.get<T>(environment.orderApi.url +"/"+  this.config.many + "/print");
    }
}
