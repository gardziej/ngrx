import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './components/score/score.component';
import { SportgroupsComponent } from './components/sportgroups/sportgroups.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { MarketComponent } from './components/market/market.component';
import { RateButtonComponent } from './components/rate-button/rate-button.component';
import { MatchesService } from './services/matches.service';
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCERS } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatchEffects } from './store/effects/match.effects';
import { TimeComponent } from './components/time/time.component';
import { MatchComponent } from './components/match/match.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    TimeComponent,
    SportgroupsComponent,
    ParticipantsComponent,
    MarketComponent,
    MatchComponent,
    RateButtonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([MatchEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 250, logOnly: environment.production })
  ],
  exports: [
    ScoreComponent
  ],
  providers: [
    WebSocketService,
    MatchesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
