import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

export class CrudConfig {
  single: (id) => string
  many: string;
}

export abstract class SessionCrud<T>
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
/*
    findAll(): Observable<Array<T>>
    {

      return this.http.get<Array<T>>(environment.sessionApi.url);
    }


 */

}
