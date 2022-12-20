import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../models/order-api/order.model";
import {OrderService} from "../service/order.service";
import {SessionService} from "../service/session.service";
import {Session} from "../models/session-api/session.model";
import {MenuService} from "../service/menu.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Menu} from "../models/menu-api/menu.model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  displayColumns: string[] = ['Name', 'Order status'];
  dataSource = new MatTableDataSource<Order>();
  sessions: Array<Session>;
  sortedSes: Array<any>;
  selectedRestaurant: string;
  entityForm: FormGroup;
  dayMenu: Menu;
  restaurantList= [
    { id: 1, companyName: "Vleugels"},
    { id: 2, companyName: "Pinky's"}
  ];


  constructor(
    private orderService: OrderService,
    private sessionsService: SessionService,
    private menuService: MenuService,
    private fb: FormBuilder,
  ) {

  }
  ngOnInit(): void {
    this.entityForm = this.fb.group({
      restaurant: [null, [Validators.required]],
    })
    if (this.sessionsService.sessionsList) {
      this.sessions = this.sessionsService.sessionsList;
    }

    if(this.orderService.dayOrders){
      this.dataSource.data = this.orderService.dayOrders;
      this.setSessions();
    }

    if(this.menuService.dayMenu){
      this.dayMenu = this.menuService.dayMenu
    }
  }

  setRestaurant(){
    this.selectedRestaurant = this.entityForm.get('restaurant').value
    console.log( "set restaurant returns " + this.selectedRestaurant)
  }

  async select() {
    if (this.entityForm.invalid) {
      return;
    }

    this.setRestaurant();
    let menu = {sandwichCompanyName: this.selectedRestaurant};
    this.orderService.setMenu(menu).subscribe(
      (menu) => {
        this.menuService.dayMenu = this.orderService.setDayMenu(menu);
        this.dayMenu = this.menuService.dayMenu;
        this.orderService.findAll()
          .subscribe((orders) =>
          {
            this.dataSource.data = orders;
            this.orderService.dayOrders = orders;
            this.sessions = this.sessionsService.sessionsList;
            this.setSessions();
          });
      }
    )

  };

  /*
  createDayOrder(): void {
    this.orderService.findAll()
      .subscribe((orders) =>
      {
        this.dataSource.data = orders;
      });
    this.sessions = this.sessionsService.sessionsList;
    this.setSessions();
  }

   */

  setSessions(){
    let pplInSes = [];
    let sesName = this.sessions[0].course.courseName;
    let hash = {};
    this.sortedSes=[];
    for( let sess of this.sessions){
      if( sess.course.courseName === sesName) {
        pplInSes.push(sess.studentList)
      } else {
        hash["name"] = sesName;
        hash["people"] = pplInSes;
        this.sortedSes.push(hash)
        sesName = sess.course.courseName;
        pplInSes=[];
        hash = {};
        pplInSes.push(sess.studentList)
      }
    }
  }

  printOrder(){
    this.orderService.print().subscribe();
  }


}
