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

  





  root;

  
  constructor(private messageService: MessagesService,private chatmoduleService: ChatmessagesService)
  {
    this.messageList=this.messageService.messageList
    this.colors=['#049dd975','#14a6479c','#f2c84b7c','#f24e2975','#f2b9b37e'];
    this.selectedColor=this.randomColor()

    this.root=document.documentElement;
    this.color='9acd8dc5'
    this.openSearch=false;
    this.chatModules=chatmoduleService.chatmodules
  }

  

  viewInputSearch()
  {
    if (!this.openSearch)
    {
      this.search.nativeElement.style.width='230px';
      this.openSearch=true;
      this.search.nativeElement.childNodes[1].focus()

    }else{
      this.search.nativeElement.style.width='35px';
      this.openSearch=false;
      this.search.nativeElement.childNodes[1].value=""

    }


 
  }

  addChatMessage(input)
  {
    console.log(input.value)
    if (input.value!="")
    {
    this.chatmoduleService.addChatMessage(input.value)
    input.value=""
    setTimeout(()=>{
      this.goBottom()
    },500)
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
  }
  
  openChat()
  {
    this.chat.nativeElement.style.transform="translateX(0)"
    this.chatContent.nativeElement.scrollTop=this.chatContent.nativeElement.scrollHeight;
    
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
