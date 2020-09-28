import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppMap } from 'src/app/interfaces/map';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  currentMap: any;
  maps: AppMap[] = [];

  private destroy$ = new Subject();

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.stateService.maps$.pipe(takeUntil(this.destroy$)).subscribe((maps: AppMap[]) => {
      this.maps = maps;
    });
    this.stateService.activeScreenIndex$.pipe(takeUntil(this.destroy$)).subscribe((idx: number) => {
      if (this.maps && this.maps[idx - 1]) {
        this.currentMap = this.maps[idx - 1].file;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
