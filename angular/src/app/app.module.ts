import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserComponent } from './components/user/user.component';
import { LandingComponent } from './components/landing/landing.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlayComponent } from './components/play/play.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEnemyModalComponent } from './components/add-enemy-modal/add-enemy-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ModifyBattlefieldModalComponent } from './components/modify-battlefield-modal/modify-battlefield-modal.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TokenComponent } from './components/token/token.component';
import { RollDiceModalComponent } from './components/roll-dice-modal/roll-dice-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const prod = true;
const config: SocketIoConfig = { url: prod ? window.location.hostname : 'http://localhost:4200', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BattlefieldComponent,
    UserlistComponent,
    UserComponent,
    LandingComponent,
    FooterComponent,
    PlayComponent,
    AddEnemyModalComponent,
    ModifyBattlefieldModalComponent,
    MapModalComponent,
    HeaderComponent,
    MapComponent,
    TokenComponent,
    RollDiceModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'play',
        component: PlayComponent
      }
    ]),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  entryComponents: [
    AddEnemyModalComponent,
    ModifyBattlefieldModalComponent,
    RollDiceModalComponent,
    MapModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
