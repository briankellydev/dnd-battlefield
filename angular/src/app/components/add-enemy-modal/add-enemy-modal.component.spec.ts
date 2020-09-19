import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnemyModalComponent } from './add-enemy-modal.component';

describe('AddEnemyModalComponent', () => {
  let component: AddEnemyModalComponent;
  let fixture: ComponentFixture<AddEnemyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnemyModalComponent ]
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
});
