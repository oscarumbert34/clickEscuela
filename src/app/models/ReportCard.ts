import { Student } from 'src/app/models/student';
export class ReportCard 
{
    private name:string;
    private surname:string;
    matters: Map<string,number>;

    constructor
    (
        name:string,surname:string
    )
    {
        this.name=name
        this.surname=surname;
        this.matters=new Map();
    }

    loadMatter(matter:string, grade:number)
    {
        this.matters.set(matter,grade);
    }

    get load()
    {
        for (let value of this.matters.values())
        {
           if (value!=0){
               return true;
           }
        }
        return false;
    }

    cleanMatters()
    {
        console.log("holis")
        this.matters=new Map()
    }

}
