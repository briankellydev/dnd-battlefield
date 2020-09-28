import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-roll-dice-modal',
  templateUrl: './roll-dice-modal.component.html',
  styleUrls: ['./roll-dice-modal.component.scss']
})
export class RollDiceModalComponent implements OnInit {
  sides = 0;
  number = 0;
  plus = 0;

  DICE = [20, 12, 10, 8, 6, 4];

  constructor(
    private dialog: MatDialogRef<RollDiceModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  close() {
    const roll = this.rollDice(this.number, this.sides, this.plus);
    this.dialog.close(roll);
  }

  selectSides(sides: number) {
    this.sides = sides;
  }

  rollDice(num: number, sides: number, plus?: number): number {
    // Number = number of dice, sides = sides of dice, plus = number to add after roll
    let total = 0;
    for (let i = 0; i < num; i++){
      // Random function based on number of sides
      const roll = Math.floor(Math.random() * sides) + 1;
      total += roll;
     }
    if (plus) {
      total += plus;
    }
    return total;
  }

}
