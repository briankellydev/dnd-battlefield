import { Component, Input, OnInit } from '@angular/core';
import { CellState } from 'src/app/interfaces/cell-state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() character: CellState;
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
