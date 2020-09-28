import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CellState, Room } from '../interfaces/cell-state';
import { AppMap } from '../interfaces/map';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  characters$ = new BehaviorSubject<CellState[]>([]);
  currentTurnIndex$ = new BehaviorSubject<number>(-1);
  endTurn$ = new Subject();
  room$ = new BehaviorSubject<Room>(null);
  battlefieldState$ = new BehaviorSubject<Array<CellState[]>>([]);
  isGM$ = new BehaviorSubject<boolean>(false);
  myId$ = new BehaviorSubject<number>(0);
  myName$ = new BehaviorSubject<string>('');
  isMyTurn$ = new BehaviorSubject<boolean>(false);
  activeCharacter$ = new BehaviorSubject<CellState>(null);
  maps$ = new BehaviorSubject<AppMap[]>([]);
  activeScreenIndex$ = new BehaviorSubject<number>(0);
  placingToken$ = new BehaviorSubject<boolean>(false);
  tokenPosition$ = new BehaviorSubject<number[]>([-200, -200]);

  constructor() {
  }

  buildEmptyBattlefield() {
    const room = this.room$.getValue();
    const battlefield = [];
    for (let y = 0; y < room.sizeY; y++) {
      const row = [];
      for (let x = 0; x < room.sizeX; x++) {
        row.push(null);
      }
      battlefield.push(row);
    }
    return battlefield;
  }
}
