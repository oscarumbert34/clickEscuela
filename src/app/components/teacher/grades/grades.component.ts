import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit 
{

  nameComponent="Notas"
  constructor() 
  { 
    //Mockeo de grados
    
  }

  ngOnInit() 
  {

  }

}
