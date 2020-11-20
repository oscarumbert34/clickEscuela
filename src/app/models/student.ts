export class Student{
     public id: string;
     name: string;
     surname: string;
     bornDate: string;
     absences: number;
     observation: string;

    constructor( id: string, name: string,
                 surname: string,
                 bornDate: string,
                 absences: number,
                 observation: string){
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.bornDate = bornDate;
            this.absences = absences;
            this.observation = observation;
    }
}
