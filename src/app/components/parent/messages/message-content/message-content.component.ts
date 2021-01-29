import { ChatMessage } from './../../../../models/ChatMessage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatmessagesService } from './../../../../services/chatmessages.service';
import { ChatModule } from './../../../../models/ChatModule';
import { element } from 'protractor';
import { style } from '@angular/animations';
import { MessagesService } from './../../../../services/messages.service';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, Input } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit 
{
  colors: string[]
  selectedColor:string;
  messageList:Message[];
  displayedColumns: string[];
  dataSource: any;
  color:string;

  openSearch:boolean;

  chatModules:ChatModule[]



  
  @Input() currentTab;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('userAvatar') avatars: QueryList<HTMLDivElement>;
  @ViewChild('chatContainer') chat: ElementRef;
  @ViewChild('chatContent') chatContent: ElementRef;
  @ViewChild('buttonBottom') bottomButton: ElementRef;
  @ViewChild('buttonSearch') search: ElementRef;
  @ViewChild('chatInputContent') inputContent: ElementRef;
  @ViewChildren('chatItem') chatItems: QueryList<ElementRef>;


  finalizetest:boolean;

  chatOpen:boolean;

  position: TooltipPosition = 'left';

  shake:boolean = false;

  lastSearchWord:string

  currentSearch:boolean;

  foundWords:ChatMessage[];
  scollDistances:number[];

  currentWord:number

  messagesLenght:number;
  





  root;

  
  constructor(private messageService: MessagesService,private chatmoduleService: ChatmessagesService, private snackbar: MatSnackBar)
  {
    this.messageList=this.messageService.messageList
    this.colors=['#049dd975','#14a6479c','#f2c84b7c','#f24e2975','#f2b9b37e'];
    this.selectedColor=this.randomColor()

    this.root=document.documentElement;
    this.color='9acd8dc5'
    this.openSearch=false;
    this.chatModules=chatmoduleService.chatmodules

    this.finalizetest=true;

    this.chatOpen=false;

    this.lastSearchWord=""

    this.currentSearch=false;

    this.foundWords=[]
    this.scollDistances=[]
   this.currentWord=0

   this.messagesLenght=chatmoduleService.messagesLenght
  
    

  }

  trueShake()
  {
    this.shake=true
  }
  noShake(){
    this.shake=false;
  }

  openSnackbar(message:string)
  {
    this.snackbar.open(message, '', {
      duration: 3000
    });

  }

  nextWord()
  {
    if(this.foundWords.length-1==this.currentWord)
    {
      this.currentWord=0;
    }
    else
    {
      this.currentWord++;
    }

    console.log(this.currentWord)


    this.clearMarks()
    this.chatContent.nativeElement.scrollTop=this.scollDistances[this.currentWord]
    this.foundWords[this.currentWord].content=this.foundWords[this.currentWord].content.replace(this.lastSearchWord,'<mark>'+this.lastSearchWord+'</mark>')

    console.log(this.scollDistances)
    console.log(this.foundWords)


  }

  previousWord()
  {
    if(this.currentWord==0)
    {
      this.currentWord=this.foundWords.length-1;
    }
    else
    {
      this.currentWord--;
    }
    console.log(this.currentWord)
    this.clearMarks()
    this.chatContent.nativeElement.scrollTop=this.scollDistances[this.currentWord]
    this.foundWords[this.currentWord].content=this.foundWords[this.currentWord].content.replace(this.lastSearchWord,'<mark>'+this.lastSearchWord+'</mark>')

    console.log(this.scollDistances)
    console.log(this.foundWords)
  }


  

  viewInputSearch()
  {
    if (!this.openSearch)
    {
      this.search.nativeElement.style.width='230px';
      this.openSearch=true;
      this.search.nativeElement.childNodes[3].focus()

    }else{
      this.search.nativeElement.style.width='35px';
      this.openSearch=false;
      this.search.nativeElement.childNodes[3].value=""

    }


 
  }

  addChatMessage(input,autor)
  {    
    if (input.value!="")
    {

      if (this.chatmoduleService.lastChatModule.autor!=autor)
      {
        this.chatmoduleService.addChatModule(autor)

      }


    this.chatmoduleService.addChatMessage(input.value)
    input.value=""
    setTimeout(()=>{
      this.goBottom()
    },500)

    }
    
  }

  addChatMessageSting(input,autor)
  {    
    

      if (this.chatmoduleService.lastChatModule.autor!=autor)
      {
        this.chatmoduleService.addChatModule(autor)

      }


    this.chatmoduleService.addChatMessage(input)
    setTimeout(()=>{
      this.goBottom()
    },500)

    
    
  }

  searchWord(input)
  { 
    this.foundWords=[]
    this.scollDistances=[]
    this.messagesLenght=this.chatmoduleService.messagesLenght
    

    let word=input.value;

    if(word=='')
    {
      this.currentSearch=false;
      this.clearMarks()
    }

    else
    {
    if(word.charAt(0)=="-" && word.charAt(1)=="-")
    {
      this.testChat(input)
    }
    else
    {

   

    this.currentSearch=true;

    let i=0;
    
    let numbermessage=0;
    let indexmessage=0;
    let currentMessage=null;

    for(let module of this.chatModules)
    {
      for(let messages of module.messages)
      {
        if (messages.content.toLocaleLowerCase().search(word.toLocaleLowerCase())!=-1){
          numbermessage=i
          indexmessage=messages.content.toLocaleLowerCase().search(word.toLocaleLowerCase());
          currentMessage=messages;

          this.foundWords.push(currentMessage)
         //this.scollDistances.push(this.scrollVariation(numbermessage,this.messagesLenght))
         this.scollDistances.push(this.calculateVariation(numbermessage))
          
        }
        i++;
      }
    }

    console.log(this.scollDistances)
    console.log(this.foundWords)


   // this.chatContent.nativeElement.scrollTop=this.scrollVariation(numbermessage,i)

    this.chatContent.nativeElement.scrollTop=this.scollDistances[0]

    

    // if (currentMessage!=null){
    //   currentMessage.content=currentMessage.content.replace(word,'<mark>'+word+'</mark>')
    //   this.currentSearch=true;

    // }
       if (this.foundWords[0]!=undefined)
       {
        console.log(word)
        console.log(this.lastSearchWord)

      
        if(word!==this.lastSearchWord)
        {
          this.clearMarks()
          this.foundWords[0].content=this.foundWords[0].content.replace(word,'<mark>'+word+'</mark>')
          this.lastSearchWord=word;
          
         }
       this.currentSearch=true;

     }
    else{
      this.openSnackbar("No se enontraron resultados para: "+word)
    }
    }
    }

    
    


  }

  resetMark(word)
  {
    
    let currentMessage=null;

    for(let module of this.chatModules)
    {
      for(let messages of module.messages)
      {
        if (messages.content.toLocaleLowerCase().search(word.toLocaleLowerCase())!=-1)
        {
          currentMessage=messages;

          currentMessage.content=currentMessage.content.replace(word,'')

          
        }
        
      }
    }
  }

  clearMarks(){
    this.resetMark('<mark>')
    this.resetMark('</mark>')
    
  }




  

  scrollVariation(numberMessage,cantMessages)
  {
    console.log(numberMessage+'   '+cantMessages)
    
    let scrollTop=this.chatContent.nativeElement.scrollTop
    let scrollHeight=this.chatContent.nativeElement.scrollHeight
    let clientHeight=this.chatContent.nativeElement.clientHeight

    let variation=(scrollHeight-clientHeight)/(cantMessages)*(numberMessage+2)
    console.log(variation)
    return variation
  }
  
  viewScroll(){
    console.log(this.chatContent.nativeElement.scrollTop)
    console.log(this.chatContent.nativeElement.scrollHeight)
    console.log(this.chatContent.nativeElement.clientHeight)
  }

  testChat(input)
  {
    let regExp=/^([0-9])*$/

    let inputContent=input.value.split(" -")
   

    if (inputContent[0]=="--start-test")
    {
      this.viewInputSearch()

      this.finalizetest=false;

      let miliseconds=5000;

      if (regExp.test(inputContent[1]))
        {
          let num=parseInt(inputContent[1])
          console.log(num)

          if (num>5000)
          {
            miliseconds=num;
          }
      
      
        }
      
   



      if (!this.finalizetest)
      {
      this.openSnackbar("Se inicio el modo testing del chat. ms:"+miliseconds)
  
    

      const inter= setInterval(()=>
      {
        this.addChatMessageSting("Este es un mensaje de prueba autogenerado. Solo para test interno",'receiver')
        
        if (this.finalizetest)
        {
  
          clearInterval(inter)
          this.openSnackbar("Se finalizo el modo de testing con exito...")
  
          
        }
      },miliseconds)
      }
    }
    else if(inputContent[0]=="--stop-test")
    {
      this.viewInputSearch()

      this.finalizetest=true;

    }

    else {
      this.openSnackbar("No ingreso un comando valido revise la sintaxis")
    }
  

    
  }

hideInputSearch()
  {
  
    if (!this.openSearch)
    {
        this.search.nativeElement.style.width='35px';

    }

 
  }

  ngOnInit() 
  {

    this.displayedColumns = ['message'];

 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.messageList
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;



    
  }

  

  randomColor()
  {
    let num= Math.floor(Math.random() * (4 - 0)) + 0;
    return this.colors[num]

  }


  closeChat()
  {
    this.chat.nativeElement.style.transform="translateX(100%)"
    this.chatOpen=false
  }
  
  openChat()
  {
    this.chat.nativeElement.style.transform="translateX(0)"
    this.chatContent.nativeElement.scrollTop=this.chatContent.nativeElement.scrollHeight;
    this.chatOpen=true;

    this.chatItems.forEach(function(element)
    {
      
      console.log(element.nativeElement.clientHeight)
    })
    
  }

  calculateVariation(index) :number
  {
    let retorno=0;
    let i=0;

    this.chatItems.forEach(function(element)
    {
      if (i<index)
      {
        retorno+=(element.nativeElement.clientHeight)
        i++
      }
    })
    return retorno;
  }

  goBottom()
  {
    this.chatContent.nativeElement.scrollTop=this.chatContent.nativeElement.scrollHeight;

  }
  goNewMessage(){
    this.chatContent.nativeElement.scrollTop=this.chatContent.nativeElement.scrollHeight-this.chatContent.nativeElement.clientHeight


  }
  showScroll()
  {
    console.log("holis")
    if (Math.round(this.chatContent.nativeElement.scrollTop+1) <(this.chatContent.nativeElement.scrollHeight-this.chatContent.nativeElement.clientHeight)){
      this.bottomButton.nativeElement.style.opacity="1"

    }
    else{
      this.bottomButton.nativeElement.style.opacity="0"

    }
   
  }




  

  showChildrens()
  {
    this.avatars.forEach((element,index) =>
     console.log(element ) 

    // element.nativeElement
    


     )

  }

  setColor(i)
  {
    let num=i-this.indexation(i)
    this.root.style.setProperty('--background-header',this.colors[num])
    
    
  }

  indexation(index)
  {
    let large=this.colors.length
    return Math.floor(index/large)*large
  }

  getColor(i)
  {
    let num=i-this.indexation(i)

    return(this.colors[num])

  }


  

}
