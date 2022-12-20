import {Staff} from "./staff.model";
import {Entity} from "../entity";

export class Course extends Entity{

  courseName: string;
  staff: Staff;
  courseDuration: number;

}
