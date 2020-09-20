import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StateService } from 'src/app/services/state.service';

import { BattlefieldComponent } from './battlefield.component';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

describe('BattlefieldComponent', () => {
  let component: BattlefieldComponent;
  let fixture: ComponentFixture<BattlefieldComponent>;

  let mockBattlefield = [
    [null, null],
    [null, null]
  ];

  const stateService = {
    battlefieldState$: new BehaviorSubject(mockBattlefield),
    activeCharacter$: new BehaviorSubject(null),
    isGM$: new BehaviorSubject(true),
    isMyTurn$: new BehaviorSubject(true),
    myId$: new BehaviorSubject(123),
    characters$: new BehaviorSubject([{character: {name: 'John', player: 'me', baseMovement: 5, currentPosition: [0, 0]}}])
  };
  const socket = jasmine.createSpyObj('Socket', ['emit']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlefieldComponent ],
      providers: [
        {provide: StateService, useValue: stateService},
        {provide: Socket, useValue: socket}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    tick();
    expect(component).toBeTruthy();
  }));

  it('should click into a cell with a character in it', fakeAsync(() => {
    mockBattlefield[0][0] = {
      character: {
        baseMovement: 5
      }
    };
    stateService.battlefieldState$.next(mockBattlefield);
    stateService.activeCharacter$.next(null);
    component.cellClicked(0, 0);
    tick();
    expect(component.battlefieldState).toEqual([
      [{character: {baseMovement: 5}}, {isReadyToBeMovedInto: true, color: 'green'}],
      [{isReadyToBeMovedInto: true, color: 'green'}, {isReadyToBeMovedInto: true, color: 'green'}],
    ] as any);
  }));

  it('should click into a cell without a character in it', fakeAsync(() => {
    stateService.battlefieldState$.next([
      [{character: {name: 'John', player: 'me', baseMovement: 5, currentPosition: [0, 0]}}, {isReadyToBeMovedInto: true}],
      [{isReadyToBeMovedInto: true}, {isReadyToBeMovedInto: true}],
    ] as any);
    stateService.activeCharacter$.next({character: {name: 'John', player: 'me', baseMovement: 5, currentPosition: [0, 0]}} as any);
    tick();
    component.cellClicked(0, 1);
    tick();
    expect(component.battlefieldState).toEqual(
      [[null, {character: {name: 'John', player: 'me', baseMovement: 5, currentPosition: [0, 1]}}],
      [null, null]] as any
    );
    expect(socket.emit).toHaveBeenCalledTimes(2);
  }));
});
