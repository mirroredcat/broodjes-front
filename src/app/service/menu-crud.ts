import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Entity} from "../models/entity";

export class CrudConfig {
  single: (id) => string
  many: string;
}
export abstract class MenuCrud<T extends Entity>
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


    insert(entity: T)
    {
      return this.http.post<T>(environment.menuApi.url + this.config.many, entity);
    }

    updatePrice(entity: T)
    {
      return this.http.patch<T>(environment.menuApi.url + "change-price/" + this.config.single(entity.id) , entity);
    }

    updateIngredients(entity: T)
    {
      return this.http.put<T>(environment.menuApi.url +"change-ingredients/" +  this.config.single(entity.id) , entity);
    }

    delete(id: number)
    {
      return this.http.delete<T>(environment.menuApi.url + this.config.many +"/" +  this.config.single(id));
    }
}
