import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CellState } from '../interfaces/cell-state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  characters$ = new BehaviorSubject<CellState[]>([]);
  currentTurnIndex$ = new BehaviorSubject<number>(0);
  endTurn$ = new Subject();
  rollInitiative$ = new Subject();
  begin$ = new Subject();

  constructor() { }
}
