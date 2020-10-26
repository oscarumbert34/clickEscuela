import { Component, Input, OnInit } from '@angular/core';
import { Dashboardproperties } from 'src/app/models/dashboard-properties';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }
  @Input()
  dashBoardProperties: Dashboardproperties;
  
  ngOnInit() {
    console.log(this.dashBoardProperties.getTitle());
    console.log(this.dashBoardProperties.getClassIcon());

    
    
  }

}
