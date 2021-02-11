import { Injectable } from '@angular/core';
import { Asistance } from '../models/Asistance';

@Injectable({
  providedIn: 'root'
})
export class AsistanceService {

  private asistances: Asistance[];

  constructor() {
    this.asistances = [];
    this.asistances.push(new Asistance("Daniel", "Rodrigues", new Date(2020, 11, 8), true))
    this.asistances.push(new Asistance("Jazmin", "Perez", new Date(2020, 11, 8), false))
    this.asistances.push(new Asistance("Juan", "Alvarez", new Date(2020, 11, 8), true))
    this.asistances.push(new Asistance("Amir", "Salazar", new Date(2020, 11, 8), true))
    this.asistances.push(new Asistance("Juan", "Rodrigues", new Date(2020, 11, 8), false))
    this.asistances.push(new Asistance("Ismael", "Sanchez", new Date(2020, 11, 8), true))
    this.asistances.push(new Asistance("Oscar", "Perez", new Date(2020, 11, 8), true))


  }

  get asistancesList() {
    return this.asistances
  }

  changeStatus(index: number, status: boolean) {
    this.asistances[index].status = status;
  }

  addAsistance(asistance: Asistance) {

    this.asistancesList.push(asistance)
  }
}
