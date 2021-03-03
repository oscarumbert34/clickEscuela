export class WorkGroup 
{
    name: string;
    startDate: Date;
    endDate: Date;
    state: string;
    comments: Comment[]
    history: History[]

    constructor(
        name: string,
        startDate: Date,
        endDate: Date,
        state: string
    )

    
    {
    this.name=name;
    this.startDate=startDate;
    this.endDate=endDate;
    this.state=state;
    this.comments=[];
    this.history=[];
    }


    addComment(comment: Comment)
    {
        this.comments.push(comment)
    }

    addHistory(history: History){
        this.history.push(history)

    }

}
