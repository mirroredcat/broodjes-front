import {Course} from "./course.model";
import {Student} from "./student.model";
import {Entity} from "../entity";

export class Session extends Entity{

  course: Course;

  studentList: Array<Student>;

}
