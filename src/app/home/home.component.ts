import {Component, Input, OnInit} from '@angular/core';
import { Session } from '../models/session-api/session.model';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SessionService} from "../service/session.service";
import {Router} from "@angular/router";
import {Student} from "../models/session-api/student.model";
import {Course} from "../models/session-api/course.model";
import {PersonService} from "../service/person.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  sessions: Array<Session>;
  entityForm: FormGroup;
  studentList: Array<Student>;
  selectedSession: Session[] = null;


  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private personService: PersonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.entityForm=this.fb.group({
      course: [null],
      student: [null]
    })

    this.sessionService.findAll()
      .subscribe((ses) => {
        this.sessions = ses;
        this.sessionService.sessionsList = this.sessions;
        console.log("sessions are set. total: " + this.sessions.length )
      })


    this.entityForm.get('course').setValue("choose");
  }

  setSelectedSession(){
    this.selectedSession = this.sessions.filter((session) => session.id == this.entityForm.get('course').value);
  }

  getStudentList(){
    this.studentList = this.selectedSession[0].studentList;
  }

  submit() {
    if(this.entityForm.invalid)
    {
      return;
    }

    let foundStudent = this.studentList.filter(s => s.id == this.entityForm.get('student').value)
    this.personService.person = foundStudent[0];
    this.router.navigate(['/order']);
  }

}
