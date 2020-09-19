import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CellState } from 'src/app/interfaces/cell-state';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(
    private socket: Socket,
    private stateService: StateService
    ) { }

  ngOnInit(): void {
  }

}
