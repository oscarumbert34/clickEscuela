import { GradesService } from './../../../services/grades.service';
import { Grade } from 'src/app/models/Grade';
import { Component, OnInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    
  }

  ngOnInit() 
  {
  }

}
