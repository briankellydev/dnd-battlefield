import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CellState } from 'src/app/interfaces/cell-state';
import { Character } from 'src/app/interfaces/character';
import { StateService } from 'src/app/services/state.service';
import { takeUntil } from 'rxjs/operators';
import { BATTLEFIELD_EMPTY_STATE } from '../../consts/battlefield-empty-state';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit, OnDestroy {

  battlefieldState: Array<CellState[]> = JSON.parse(JSON.stringify(BATTLEFIELD_EMPTY_STATE));
  private activeCharacter: CellState;
  private destroy$ = new Subject();

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.characters$.pipe(takeUntil(this.destroy$)).subscribe((characters: CellState[]) => {
      this.battlefieldState = JSON.parse(JSON.stringify(BATTLEFIELD_EMPTY_STATE));
      characters.forEach((char) => {
        this.battlefieldState[char.character.currentPosition[0]][char.character.currentPosition[1]] = char;
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  cellClicked(row: number, column: number) {
    // Cell isn't inactive
    if (this.battlefieldState[row][column]) {
      // We clicked a character
      if (this.battlefieldState[row][column].character && !this.activeCharacter) {
        this.activeCharacter = this.battlefieldState[row][column];
        const cellsCanBeMovedInto = this.calculateCellsCanBeMovedInto(this.activeCharacter.character.baseMovement, [row, column]);
        cellsCanBeMovedInto.forEach((cell: number[]) => {
          if (!this.battlefieldState[cell[0]][cell[1]] || !this.battlefieldState[cell[0]][cell[1]].character) {
            this.battlefieldState[cell[0]][cell[1]] = {color: 'green', isReadyToBeMovedInto: true}
          }
        });
      // We clicked a space we can move into
      } else if (this.battlefieldState[row][column].isReadyToBeMovedInto) {
        const activeChar = this.activeCharacter;
        this.battlefieldState[activeChar.character.currentPosition[0]][activeChar.character.currentPosition[1]] = null;
        activeChar.character.currentPosition = [row, column];
        this.battlefieldState[row][column] = activeChar;
        // Clean out moving cells, we're done here
        this.battlefieldState.forEach((row, rowIdx) => {
          row.forEach((column, columnIdx) => {
            if (column && column.isReadyToBeMovedInto) {
              this.battlefieldState[rowIdx][columnIdx] = null;
            }
          });
        });
        this.activeCharacter = null;
      }
    }
    
    
  }

  // currentPosition: [y, x] from top left
  private calculateCellsCanBeMovedInto(baseMovement: number, currentPosition: number[]) {
    const cellsTraversable = baseMovement / 5;
    const possibleChoices: Array<number[]> = [];
    // Just need two opposing corners in this - max/min x and y
    const boxBounds = {
      maxX: -1,
      maxY: -1,
      minX: -1,
      minY: -1
    }
    // Get diagonal maximums- these form the bounds of the traversible box
    for (let i = cellsTraversable; i > -1; i--) {
      if (this.battlefieldState[1].length > currentPosition[1] + i && boxBounds.maxX === -1) {
        boxBounds.maxX = currentPosition[1] + i;
      }
      if (currentPosition[1] - i > -1 && boxBounds.minX === -1) {
        boxBounds.minX = currentPosition[1] - i;
      }
      if (this.battlefieldState.length > currentPosition[0] + i && boxBounds.maxY === -1) {
        boxBounds.maxY = currentPosition[0] + i;
      }
      if (currentPosition[0] - i > -1 && boxBounds.minY === -1) {
        boxBounds.minY = currentPosition[0] - i;
      }
      if (boxBounds.maxX > -1 && boxBounds.maxY > -1 && boxBounds.minX > -1 && boxBounds.minY > -1) {
        break;
      }
    }

    for (let y = boxBounds.minY; y < boxBounds.maxY + 1; y++) {
      for (let x = boxBounds.minX; x < boxBounds.maxX + 1; x++) {
        possibleChoices.push([y, x]);
      }
    }
    return possibleChoices;
  }

}
