import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellState } from 'src/app/interfaces/cell-state';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() character: CellState;
  @Input() active: boolean;
  @Output() moveCharacter = new EventEmitter();


  constructor(public stateService: StateService) { }

  ngOnInit(): void {
  }

  emitMoveCharacter() {
    this.moveCharacter.emit();
  }

}
