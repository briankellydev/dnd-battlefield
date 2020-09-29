import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Socket } from 'ngx-socket-io';
import { CellState, Room } from 'src/app/interfaces/cell-state';

enum LandingStates {
  LANDED,
  NEW_GAME,
  EXISTING_GAME
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  LANDING_STATES = LandingStates;
  state: LandingStates = LandingStates.LANDED;
  newGameForm = this.fb.group({
    roomName: ['', Validators.required],
    playerName: ['', Validators.required],
    sizeX: [0, Validators.required],
    sizeY: [0, Validators.required]
  });
  existingGameForm = this.fb.group({
    playerName: ['', Validators.required],
    color: ['#000000', Validators.required],
    characterName: ['', Validators.required],
    movementSpeed: [0, Validators.required],
    initiativeScore: [0, Validators.required],
    roomId: ['', Validators.required]
  });

  error = '';

  private availableRooms: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public stateService: StateService,
    private socket: Socket
    ) { }

  ngOnInit(): void {
    this.socket.on('availableRooms', (rooms: string[]) => {
      this.availableRooms = rooms;
    });
  }

  setState(state: LandingStates) {
    this.state = state;
  }

  startGame() {
    const formVal = this.newGameForm.value;
    const room: Room = {
      name: formVal.roomName,
      sizeX: formVal.sizeX,
      sizeY: formVal.sizeY,
      id: this.generateRoomCode()
    };
    this.stateService.room$.next(room);
    this.socket.emit('addRoom', room);
    const battlefield = this.stateService.buildEmptyBattlefield();
    this.socket.emit('battlefieldChange', battlefield);
    this.stateService.isGM$.next(true);
    this.stateService.myId$.next(Math.random());
    this.stateService.myName$.next(formVal.playerName);
    this.router.navigate(['play']);
  }

  enterGame() {
    this.error = '';
    const formVal = this.existingGameForm.value;
    if (this.availableRooms.includes(formVal.roomId.toUpperCase())) {
      const myInfo: CellState = {
        character: {
          name: formVal.characterName,
          player: formVal.playerName,
          baseMovement: formVal.movementSpeed,
          initiativeScore: formVal.initiativeScore,
          currentPosition: [-1, -1],
        },
        color: formVal.color,
        id: Math.random(),
        roomId: formVal.roomId.toUpperCase()
      };
      this.stateService.myId$.next(myInfo.id);
      this.stateService.myName$.next(formVal.playerName);
      this.socket.emit('add', myInfo);
      this.router.navigate(['play']);
    } else {
      this.error = 'Room does not exist. Please check code.'
    }
    
  }

  generateRoomCode() {
    const availChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += availChars[Math.floor(Math.random() * 26)];
    }
    return result.toUpperCase();
  }

}
