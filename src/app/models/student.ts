export class Student {
     public id: string;
     public name: string;
     public surname: string;
     bornDate: string;
     absences: number;
     observation: string;
     course: string;
     idNumber:number;
     adress:string;

     constructor(id: string,
          name: string,
          surname: string,
          bornDate: string,
          absences: number,
          observation: string, course: string,idNumber:number,adress:string ) {
          this.id = id;
          this.name = name;
          this.surname = surname;
          this.bornDate = bornDate;
          this.absences = absences;
          this.observation = observation;
          this.course = course;
          this.idNumber=idNumber;
          this.adress=adress;
     }
}
