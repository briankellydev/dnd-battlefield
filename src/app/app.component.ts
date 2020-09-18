import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { MOCK_CHARACTERS } from './mock-data/mock-characters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'battlefield';

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.stateService.characters$.next(MOCK_CHARACTERS);
  }
}
