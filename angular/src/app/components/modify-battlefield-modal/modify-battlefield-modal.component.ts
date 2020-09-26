import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-modify-battlefield-modal',
  templateUrl: './modify-battlefield-modal.component.html',
  styleUrls: ['./modify-battlefield-modal.component.scss']
})
export class ModifyBattlefieldModalComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    sizeX: [0, Validators.required],
    sizeY: [0, Validators.required]
  });

  constructor(
    private dialog: MatDialogRef<ModifyBattlefieldModalComponent>,
    private stateService: StateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.stateService.room$.getValue());
  }

  close() {
    this.dialog.close(this.form.value);
  }

}
