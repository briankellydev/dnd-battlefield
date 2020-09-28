import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public stateService: StateService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
  }

  selectMap(idx: number) {
    this.socket.emit('changeScreenIndex', idx);
    this.socket.emit('tokenPlaced', [-200, -200]);
  }

}
