export class Parent 
{
    public id: string;
    public name: string;
    public surname: string;
    bornDate: string;
    idNumber:number;
    

    constructor(id: string,
         name: string,
         surname: string,
         bornDate: string,
         idNumber:number) {
         this.id = id;
         this.name = name;
         this.surname = surname;
         this.bornDate = bornDate;
         this.idNumber=idNumber;
    }
}
