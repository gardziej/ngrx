import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { Match } from './interfaces/match.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreState } from './store/reducers';
import * as MatchActions from './store/actions/match.actions';
import * as fromMatch from './store/reducers/match.reducer';

import * as StatsActions from './store/actions/stats.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public matches$: Observable<Match[]>;

  constructor(
    private webSocketService: WebSocketService,
    private store: Store<StoreState>
    ) {
    this.store.dispatch(MatchActions.getLiveMatches());
  }

  ngOnInit(): void {
    this.matches$ = this.store.select(fromMatch.selectAll);
  }

  public matchTrackBy(index: number, item: Match): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
