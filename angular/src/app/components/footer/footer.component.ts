import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CellState } from 'src/app/interfaces/cell-state';
import { StateService } from 'src/app/services/state.service';
import { Socket } from 'ngx-socket-io';
import { MatDialog } from '@angular/material/dialog';
import { AddEnemyModalComponent } from '../add-enemy-modal/add-enemy-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private characters: CellState[] = [];

  constructor(
    public stateService: StateService,
    private socket: Socket,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.stateService.characters$.pipe(takeUntil(this.destroy$)).subscribe((characters) => {
      this.characters = characters;
    });
    this.stateService.currentTurnIndex$.pipe(takeUntil(this.destroy$)).subscribe((currentTurn) => {
      if (!this.stateService.isGM$.getValue() && currentTurn !== -1) {
        const isMyTurn = this.stateService.characters$.getValue()[currentTurn].id === this.stateService.myId$.getValue();
        this.stateService.isMyTurn$.next(isMyTurn);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  openAddEnemyModal() {
    const dialogRef = this.dialog.open(AddEnemyModalComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((newChar: CellState) => {
      this.characters.push(newChar);
      this.socket.emit('updateUserList', this.characters);
    });
  }

  rollInitiative() {
    this.characters.forEach((character) => {
      const roll = Math.round(Math.random() * 20) + parseInt(character.character.initiativeScore.toString(), 10);
      character.character.initiativeRoll = roll;
    });
    this.characters = this.characters.sort((a, b) => b.character.initiativeRoll - a.character.initiativeRoll);
    this.socket.emit('updateUserList', this.characters);
  }

  endTurn() {
    let currentTurn = this.stateService.currentTurnIndex$.getValue();
    if (currentTurn + 1 === this.characters.length) {
      currentTurn = 0;
    } else {
      currentTurn += 1;
    }
    this.socket.emit('turnChange', currentTurn);
  }

  beginBattle() {
    this.socket.emit('turnChange', 0);
  }

}
