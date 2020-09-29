import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { MOCK_CHARACTERS } from './mock-data/mock-characters';
import { Socket } from 'ngx-socket-io';
import { CellState, Room } from './interfaces/cell-state';
import { AppMap } from './interfaces/map';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'battlefield';

  constructor(
    private stateService: StateService,
    private socket: Socket,
    private snackbar: MatSnackBar
    ) {}

  ngOnInit() {
    this.socket.on('newUser', (userList: CellState[]) => {
      console.log(userList)
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
    this.socket.on('screenIndexChanged', (idx: number) => {
      this.stateService.activeScreenIndex$.next(idx);
    });
    this.socket.on('mapListChanged', (maps: AppMap[]) => {
      this.stateService.maps$.next(maps);
    });
    this.socket.on('updateToken', (location: number[]) => {
      this.stateService.tokenPosition$.next(location);
    });
    this.socket.on('message', (message: string) => {
      this.snackbar.open(message, 'X', {duration: 3000, horizontalPosition: 'start'});
    });
  }
}
