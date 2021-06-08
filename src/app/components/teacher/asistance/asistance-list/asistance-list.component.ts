import { AsistanceService } from '../../../../services/asistance.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Asistance } from 'src/app/models/asistance';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';


@Component({
  selector: 'app-asistance-list',
  templateUrl: './asistance-list.component.html',
  styleUrls: ['./asistance-list.component.scss']
})
export class AsistanceListComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  currentDate = new Date()
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('picker') picker: MatDatepicker<Date>;


  asistanceList: Asistance[];
  asistanceListAux: Asistance[];
  presentsList: boolean[];

  takeAsistance: boolean;

  constructor(private asistanceService: AsistanceService, private snackbar: MatSnackBar) {
    this.takeAsistance = false;

    this.asistanceList = []
    this.asistanceListAux = [];

    this.asistanceList = asistanceService.asistancesList
    for (let asistance of this.asistanceList)
      this.asistanceListAux.push(asistance)

    this.presentsList = new Array(this.asistanceListAux.length);

    for (let i = 0; i < this.asistanceListAux.length; i++) {
      this.presentsList[i] = false;
    }

    this.currentDate.setHours(0)
    this.currentDate.setMinutes(0)
    this.currentDate.setSeconds(0)
    this.currentDate.setMilliseconds(0)



  }

  ngOnInit() {

    this.displayedColumns = ['name', 'surname', 'date', 'status'];


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.asistanceList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  filterByDate() {
    if (this.picker.startAt != null) {
      let asis = this.asistanceService.asistancesList.filter(a => a.date.getTime() === this.picker.startAt.getTime())

      if (asis.length == 0) {
        this.openSnackbar("No se encontraron entradas para la fecha seleccionada")

        this.refreshTable()
      }
      else {
        this.dataSource.data = asis;
        this.openSnackbar("Se encontraron los siguientes resultados para la fecha seleccionada")


      }
    }
    else {
      this.openSnackbar("No selecciono una fecha")
    }



  }



  openSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 3000
    });

  }

  changeTakeAsistance() {
    console.log(this.asistanceListAux)
    if (!this.takeAsistance) {
      this.takeAsistance = !this.takeAsistance;
      this.paginator.pageSize = this.asistanceListAux.length;
      this.dataSource.data = this.asistanceListAux;
      console.log(this.paginator)
     

    }
    else {
      this.takeAsistance = !this.takeAsistance;
      this.paginator.pageSize = 5;
      this.refreshTable()



    }



  }



  changeStatus(index: number, status: boolean) {
    this.asistanceService.changeStatus(index, status);
    this.refreshTable()
  }

  refreshTable() {
    console.log("Refresh exitoso")
    
    this.dataSource.data = this.asistanceList
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setPresent($event: Event, index: number) {
    console.log($event)
    let check = ($event.target as HTMLInputElement).checked
    this.presentsList[index] = check;
  }

  savePresents() {

    for (let i = 0; i < this.presentsList.length; i++) {
      let newasistance = new Asistance(this.asistanceList[i].name, this.asistanceList[i].surname, this.currentDate, this.presentsList[i])

      this.asistanceService.addAsistance(newasistance)

    }


    this.takeAsistance = false;
    this.paginator.pageSize = 5;

    this.refreshTable()
  }

}
