import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CellState } from 'src/app/interfaces/cell-state';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(
    public stateService: StateService,
    private socket: Socket
    ) { }

  ngOnInit(): void {
  }

  moveCharacter(character: CellState) {
    this.stateService.activeCharacter$.next(character);
  }

  deleteCharacter(character: CellState) {
    const characters = this.stateService.characters$.getValue();
    const charIdx = characters.findIndex((item) => item.character.name === character.character.name &&
      item.character.player === character.character.player);
    characters.splice(charIdx, 1);
    this.socket.emit('updateUserList', characters);
    const battlefield = this.stateService.battlefieldState$.getValue();
    battlefield.forEach((row: CellState[], rowIndex: number) => {
      row.forEach((column: CellState, colIndex: number) => {
        if (column && column.character && column.character.name === character.character.name &&
            column.character.player === character.character.player
        ) {
          battlefield[rowIndex][colIndex] = null;
        }
      });
    });
    this.socket.emit('battlefieldChange', battlefield);
  }

}
