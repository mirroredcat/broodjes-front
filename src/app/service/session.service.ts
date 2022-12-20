import { Injectable } from '@angular/core';
import {Session} from "../models/session-api/session.model";
import {CrudConfig, SessionCrud} from "./session-crud";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

const config: CrudConfig = {
  many: 'session',
  single: null
}

@Injectable({
  providedIn: 'root'
})
export class SessionService extends SessionCrud<Session> {

  sessionsList: Array<Session>;

  constructor(
    protected httpC: HttpClient,
  )
  {
    super(httpC, config);
  }

  findAll(): Observable<Array<Session>>{
    return this.http.get<Array<Session>>(environment.sessionApi.url)

  }

}
