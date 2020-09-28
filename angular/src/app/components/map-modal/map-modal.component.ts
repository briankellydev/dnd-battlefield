import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {

  @ViewChild('fileUpload') fileEl: any;
  form = this.fb.group({
    name: ['', Validators.required],
  });
  file: any;

  constructor(
    private dialog: MatDialogRef<MapModalComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  close() {
    const val = {
      name: this.form.value.name,
      file: this.file
    };
    this.dialog.close(val);
  }

  changeFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.file = e.target.result;
    };
  }

}
