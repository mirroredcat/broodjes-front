import { Injectable } from '@angular/core';
import {Student} from "../models/session-api/student.model";



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  person: Student;

  constructor() { }



}
