import { Component, Input, OnInit } from '@angular/core';
import { Dashboardproperties } from 'src/app/models/dashboard-properties';

@Component({
  selector: 'app-load-dashboard',
  templateUrl: './load-dashboard.component.html',
  styleUrls: ['./load-dashboard.component.scss']
})
export class LoadDashboardComponent implements OnInit {

  constructor() { }
  @Input()
  dashBoardsProperties: Dashboardproperties[];
  ngOnInit() {
  }

}
