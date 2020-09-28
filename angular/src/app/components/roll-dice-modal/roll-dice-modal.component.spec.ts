import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDiceModalComponent } from './roll-dice-modal.component';

describe('RollDiceModalComponent', () => {
  let component: RollDiceModalComponent;
  let fixture: ComponentFixture<RollDiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollDiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
