import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './score/score.component';
import { SportgroupsComponent } from './sportgroups/sportgroups.component';
import { ParticipantsComponent } from './participants/participants.component';
import { MarketComponent } from './market/market.component';
import { RateButtonComponent } from './rate-button/rate-button.component';
import { MatchesService } from './services/matches.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
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
    EffectsModule.forRoot([AppEffects])
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
