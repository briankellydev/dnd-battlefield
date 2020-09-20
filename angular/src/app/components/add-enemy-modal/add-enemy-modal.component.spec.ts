import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEnemyModalComponent } from './add-enemy-modal.component';

describe('AddEnemyModalComponent', () => {
  let component: AddEnemyModalComponent;
  let fixture: ComponentFixture<AddEnemyModalComponent>;
  const stateService = {
    myName$: new BehaviorSubject('Me'),
    myId$: new BehaviorSubject(123)
  };
  const dialog = jasmine.createSpyObj('MatDialogRef', ['close']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnemyModalComponent ],
      providers: [
        {provide: StateService, useValue: stateService},
        {provide: MatDialogRef, useValue: dialog}
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnemyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    const endValue = {
      character: {
        name: 'Darth Vader',
        baseMovement: 20,
        initiativeScore: 3,
        currentPosition: [-1, -1],
        player: 'Me'
      },
      color: '#FFFFFF',
      id: 123
    };
    component.form.patchValue({
      name: 'Darth Vader',
      movementSpeed: 20,
      initiativeScore: 3,
      color: '#FFFFFF'
    });
    component.closeModal();
    expect(dialog.close).toHaveBeenCalledWith(endValue);
  });
});
