import { Parent } from "./Parent";

export class Student {
     public id: string;
     public name: string;
     public surname: string;
     bornDate: Date;
     absences: number;
     observation: string;
     course: string;
     idNumber: number;
     adress: string;
     telephone: string;
     email: string;

     parent_1: Parent;
     parent_2: Parent;

     constructor(id: string,
          name: string,
          surname: string,
          bornDate: Date,
          absences: number,
          observation: string,
          course: string,
          idNumber: number,
          adress: string,
          telephone: string,
          email: string) {
          this.id = id;
          this.name = name;
          this.surname = surname;
          this.bornDate = bornDate;
          this.absences = absences;
          this.observation = observation;
          this.course = course;
          this.idNumber = idNumber;
          this.adress = adress;
          this.telephone = telephone
          this.email = email;
     }



}
