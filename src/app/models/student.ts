export class Student {
     public id: string;
     public name: string;
     public surname: string;
     bornDate: string;
     absences: number;
     observation: string;
     course: string;
     idNumber:number;

     constructor(id: string,
          name: string,
          surname: string,
          bornDate: string,
          absences: number,
          observation: string, course: string,idNumber:number) {
          this.id = id;
          this.name = name;
          this.surname = surname;
          this.bornDate = bornDate;
          this.absences = absences;
          this.observation = observation;
          this.course = course;
          this.idNumber=idNumber;
     }
}
