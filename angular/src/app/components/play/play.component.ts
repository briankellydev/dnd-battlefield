import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  @ViewChild('map') mapEl;

  tokenLocation: number[] = [-200, -200];

  private destroy$ = new Subject();

  constructor(
    public stateService: StateService,
    private socket: Socket
    ) { }

  ngOnInit(): void {
    this.stateService.tokenPosition$.pipe(takeUntil(this.destroy$)).subscribe((location) => {
      this.tokenLocation = location;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  placeToken(event) {
    if (this.stateService.placingToken$.getValue()) {
      const x = this.mapEl.nativeElement.scrollLeft + event.clientX;
      const y = this.mapEl.nativeElement.scrollTop + event.clientY;
      this.socket.emit('tokenPlaced', [x - 15, y - 15]);
      this.stateService.placingToken$.next(false);
    }
  }

}
