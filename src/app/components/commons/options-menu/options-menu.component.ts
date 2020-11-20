import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit 
{

  @Input() currentOption: string;
  constructor() {
    this.currentOption=""
   }

  ngOnInit() 
  {
  }


}
