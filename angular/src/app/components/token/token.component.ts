import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
  }

  placeToken() {
    this.stateService.placingToken$.next(true);
  }

}
