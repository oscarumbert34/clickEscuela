export class Message 
{
    sender:string;
    content:string;
    type:string;
    date:Date;

    constructor
    (
     sender:string,
     content:string,
     type:string,
     date:Date
    )
    {
        this.sender=sender
        this.content=content
        this.type=type
        this.date=date;
    }

}
