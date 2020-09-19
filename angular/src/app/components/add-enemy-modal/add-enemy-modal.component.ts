import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CellState } from 'src/app/interfaces/cell-state';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-enemy-modal',
  templateUrl: './add-enemy-modal.component.html',
  styleUrls: ['./add-enemy-modal.component.scss']
})
export class AddEnemyModalComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    color: ['#000000', Validators.required],
    movementSpeed: ['', Validators.required],
    initiativeScore: ['', Validators.required]
  });

  constructor(
    private dialog: MatDialogRef<AddEnemyModalComponent>,
    private stateService: StateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    const formVal = this.form.value;
    const charToAdd: CellState = {
      character: {
        name: formVal.name,
        baseMovement: formVal.movementSpeed,
        initiativeScore: formVal.initiativeScore,
        currentPosition: [-1, -1],
        player: this.stateService.myName$.getValue()
      },
      color: formVal.color,
      id: this.stateService.myId$.getValue()
    };
    this.dialog.close(charToAdd);
  }

}
