import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellState } from '../../interfaces/cell-state';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() contents: CellState;
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cellClicked() {
    this.clicked.emit();
  }

}
