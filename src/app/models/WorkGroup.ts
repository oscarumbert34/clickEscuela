import { Comment } from './Comment';
export class WorkGroup 
{
   
   
    name: string;
    startDate: Date;
    endDate: Date;
    state: string;
    comments: Comment[];
    history: Comment[];
    consigns:string[];
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
    this.consigns=[];
    }


    addComment(comment)
    {
        this.comments.push(comment)
    }

    addConsign(consign:string){
        this.consigns.push(consign)
    }

    addHistory(history){
        this.history.push(history)

    } 
    
    deleteComment(commentNumber: number)
    {
    this.comments.splice(commentNumber,1)
    }

    editComment(commentNumber: number, newComment: string) {
        this.comments[commentNumber].content=newComment
      }

}
