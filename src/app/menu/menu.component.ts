import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {SessionService} from "../service/session.service";
import {Router} from "@angular/router";
import {SandwichCompany} from "../models/menu-api/sandwich-company.model";
import {MenuService} from "../service/menu.service";
import {OrderService} from "../service/order.service";
import {Menu} from "../models/menu-api/menu.model";
import {Sandwich} from "../models/menu-api/sandwich.model";
import {PersonService} from "../service/person.service";
import {Student} from "../models/session-api/student.model";
import {OrderOptions} from "../models/order-api/order-options.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent {

  selectedRestaurant: string;
  entityForm: FormGroup;

  dayMenu: Menu;
  categories = [];
  panelOpen = false;
  currentPerson: Student;
  breadOption = "";
  veggieOption = ""
  comment=""
  orderOptions: OrderOptions;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private personService: PersonService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {

    if (this.menuService.dayMenu) {
      this.dayMenu = this.menuService.dayMenu
      this.selectedRestaurant = this.dayMenu.sandwichCompany.companyName;
      this.setSandwichCategories()
    }
    this.currentPerson = this.personService.person;
  }



  setBread(bread: string){
    this.breadOption = bread;
    console.log("bread is set")
  }

  setVeggies(veg: string){
    this.veggieOption = veg
    console.log("veg is set")
  }

  setComment(comm: string){
    if (comm) { this.comment = comm;}
  }



  order(sandwichName: string){
    this.orderOptions = new OrderOptions();

    this.orderOptions.orderedSandwichName = sandwichName.trim();
    this.orderOptions.breadOption = this.breadOption;
    this.orderOptions.vegetableOption = this.veggieOption;
    this.orderOptions.comment = this.comment;

    this.orderService.update(this.orderOptions, this.personService.person.id).subscribe();
    console.log(this.orderOptions)


  }

  setSandwichCategories(){
    let sandInCat = [];
    let cat = this.dayMenu.sandwichList[0].category;
    let hash = {};
    for( let sandwich of this.dayMenu.sandwichList){
      if( sandwich.category === cat) {
        sandInCat.push(sandwich)
      } else {
        hash["name"] = cat;
        hash["sandwiches"] = sandInCat;
        console.log(hash)
        this.categories.push(hash)
        cat = sandwich.category;
        sandInCat=[];
        hash = {};
        sandInCat.push(sandwich)
      }
    }
  }

  panelOpenToggle() {
    this.panelOpen = !this.panelOpen;
  }

}
