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
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatchEffects } from './store/effects/match.effects';
import { TimeComponent } from './components/time/time.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    TimeComponent,
    SportgroupsComponent,
    ParticipantsComponent,
    MarketComponent,
    RateButtonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([MatchEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
