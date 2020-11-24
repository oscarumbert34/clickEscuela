import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Student } from '../models/student';
import { Subject } from 'rxjs/internal/Subject';
import { DecimalPipe } from '@angular/common';
import { tap } from 'rxjs/internal/operators/tap';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';
import { SortColumn, SortDirection } from '../components/directives/sortable.directive';
import { Observable } from 'rxjs/internal/Observable';
import { PipeTransform, Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
interface SearchResult {
    students: Student[];
    total: number;
  }
  
  interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
  }
  
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(students: Student[], column: SortColumn, direction: string): Student[] {
  if (direction === '' || column === '') {
    return students;
  } else {
    return [...students].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


function matches(student: Student, term: string, pipe: PipeTransform) {
  return student.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(student.absences).includes(term)
    || student.surname.includes(term);
}

@Injectable({providedIn: 'root'})
export class studentService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _students$ = new BehaviorSubject<Student[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  studentsArray: Student[] = []

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      console.log(result);

     //this._students$.next(result.students);
     //this._total$.next(result.total);
    });

    this._search$.next();
  }

  get students$() { return this._students$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    
    this.studentsArray[0] = new Student('1', 'OSCAR', 'UMBERT', new Date().toString(), 12, '');
    this.studentsArray[1] = new Student('2', 'CLAUDIO', 'GOMEZ', new Date().toString(), 5, '');
    this.studentsArray[2] = new Student('3', 'FELIPE', 'ROMERO', new Date().toString(), 0, '');
    this.studentsArray[3] = new Student('4', 'OMAR', 'GOMEZ', new Date().toString(), 18, '');
    this.studentsArray[4] = new Student('5', 'MARTA', 'GIMENEZ', new Date().toString(), 15, '');
    this.studentsArray[5] = new Student('6', 'MARIANA', 'FERREIRA', new Date().toString(), 11, '');
    let students = sort(this.studentsArray, sortColumn, sortDirection);

    // 2. filter
    students = students.filter(student => matches(student, searchTerm, this.pipe));
    const total = students.length;

    // 3. paginate
    students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({students, total});
  }

  get studentsList(){
    return this.studentsArray;
  }


}