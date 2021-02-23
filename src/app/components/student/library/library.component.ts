import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  @ViewChildren('test') imageslist: QueryList<ElementRef>
  images:ElementRef[];
  
  constructor() {
    this.images=[]
  }
  
  ngOnInit()
  { 
    //this.startImageTransition(); 
  }

  



}
