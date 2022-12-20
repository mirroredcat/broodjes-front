import {SandwichCompany} from "./sandwich-company.model";
import {Sandwich} from "./sandwich.model";
import {Entity} from "../entity";

export class Menu extends Entity{

  sandwichCompany: SandwichCompany;
  sandwichList: Array<Sandwich>;
}
