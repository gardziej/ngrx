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
    AppRoutingModule
  ],
  exports: [
    ScoreComponent
  ],
  providers: [
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
