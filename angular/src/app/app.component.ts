import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { MOCK_CHARACTERS } from './mock-data/mock-characters';
import { Socket } from 'ngx-socket-io';
import { CellState, Room } from './interfaces/cell-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'battlefield';

  constructor(
    private stateService: StateService,
    private socket: Socket
    ) {}

  ngOnInit() {
    this.socket.on('newUser', (userList: CellState[]) => {
      this.stateService.characters$.next(userList);
    });
    this.socket.on('room', (room: Room) => {
      this.stateService.room$.next(room);
    });
    this.socket.on('updateBattlefield', (battlefield: Array<CellState[]>) => {
      this.stateService.battlefieldState$.next(battlefield);
    });
    this.socket.on('updateCurrentTurn', (turn: number) => {
      this.stateService.currentTurnIndex$.next(turn);
    });
  }
}
