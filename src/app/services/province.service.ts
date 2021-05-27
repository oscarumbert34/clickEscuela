import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province } from '../models/Province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

constructor(private connector:HttpClient)
{

}

getProvinces():Observable<Province[]>
{
  const path="https://apis.datos.gob.ar/georef/api/provincias";
  return this.connector.get<Province[]>(path)
}

}
