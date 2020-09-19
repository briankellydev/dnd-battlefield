import { Component, OnInit } from '@angular/core';
import { CellState } from 'src/app/interfaces/cell-state';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(public stateService: StateService) { }

  ngOnInit(): void {
  }

  moveCharacter(character: CellState) {
    this.stateService.activeCharacter$.next(character);
  }

}
