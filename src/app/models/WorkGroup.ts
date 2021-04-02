import { Comment } from './Comment';
export class WorkGroup 
{
   
    name: string;
    startDate: Date;
    endDate: Date;
    state: string;
    comments: Comment[]
    history: Comment[]

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


    addComment(comment)
    {
        this.comments.push(comment)
    }

    addHistory(history){
        this.history.push(history)

    } 
    
    deleteComment(commentNumber: number)
    {
    this.comments.splice(commentNumber,1)
    }

}
