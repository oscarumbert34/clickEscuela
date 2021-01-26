import { ChatMessage } from './ChatMessage';
export class ChatModule 
{
    autor:string;
    messages:ChatMessage[];

 constructor(autor:string)
 {
    this.autor=autor;
    this.messages=[]
 }

 addChatMessage(message)
 {
    this.messages.push(message)
 }
}
