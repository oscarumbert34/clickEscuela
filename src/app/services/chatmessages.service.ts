import { ChatMessage } from './../models/ChatMessage';
import { ChatModule } from './../models/ChatModule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatmessagesService 
{

  chatmodules:ChatModule[];

constructor() 
{ 
  this.chatmodules=[];

  let chatSender=new ChatModule('autor');

  chatSender.addChatMessage(new ChatMessage("Hola como estas buenas tardes",new Date(),true))
  chatSender.addChatMessage(new ChatMessage("Queria hacerle una consulta sobre el acto del 25 de mayo",new Date(),true))
  chatSender.addChatMessage(new ChatMessage("Puede llevar ropa que ya tengo para que se disfrace",new Date(),true))

  this.chatmodules.push(chatSender);

  let chatReceiver=new ChatModule('receiver');

  chatReceiver.addChatMessage(new ChatMessage("Nosotros ya contamos con la vestimenta, pero no creo que haya algun problema",new Date(),true))
  chatReceiver.addChatMessage(new ChatMessage("Dejame que lo consulto con la profesora MArgarita de teatro",new Date(),true))
  chatReceiver.addChatMessage(new ChatMessage("Yo no creo que haya problema alguno",new Date(),true))

  this.chatmodules.push(chatReceiver)

  let chatSender2=new ChatModule('autor');

  chatSender2.addChatMessage(new ChatMessage("Dale muchisimas gracias entonces espero su pronta respuesta",new Date(),true))
  chatSender2.addChatMessage(new ChatMessage("En caso que se necesite ayuda yo me sumo ",new Date(),false))


  this.chatmodules.push(chatSender2)






}

addChatModule(autor)
{
  this.chatmodules.push(new ChatModule(autor))
}

addChatMessage(message)
{
  this.chatmodules[this.chatmodules.length-1].addChatMessage(new ChatMessage(message,new Date(),true))
  console.log(this.chatmodules)

}

get modulesList(){
  return this.chatmodules
}

get lastChatModule(){
 return this.chatmodules[this.chatmodules.length-1]
}

}
