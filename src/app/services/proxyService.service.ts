import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { getAllJSDocTags } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class ProxyService
{

constructor(private http: HttpClient) 
{
 

}
 getAll(): Observable<any>
 {
   return this.http.get<any>('https://drive.google.com/uc?id=1zF_zak_n9rMEVumOUfjKrYmym4UIUb3Q&export=download&authuser=0');
 }
}
