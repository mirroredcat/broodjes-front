import {SandwichCompany} from "./sandwich-company.model";
import {Entity} from "../entity";

export class Sandwich extends Entity {

  sandwichName: string;
  sandwichCompany: SandwichCompany;
  category: string;
  price: number;
  ingredients:string;
}
