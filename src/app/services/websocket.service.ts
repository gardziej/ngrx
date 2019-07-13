import { Injectable } from '@angular/core';
import { StoreState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { take, filter } from 'rxjs/operators';

import { Match } from '../interfaces/match.interface';
import { Stats } from '../interfaces/stats.interface';
import { Market } from '../interfaces/market.interface';
import { Selection } from '../interfaces/selection.interface';

import * as fromStats from '../store/reducers/stats.reducer';
import * as fromSelections from '../store/reducers/selection.reducer';

import * as StatsActions from '../store/actions/stats.actions';
import * as SelectionsActions from '../store/actions/selection.action';

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

@Injectable()
export class WebSocketService {

  private socket: WebSocket;
  private wsUrl = 'wss://ws.lvbet.pl/_v3/ws/update/?language=pl';

  constructor(
    private store: Store<StoreState>
    ) {
    this.socket = new WebSocket(this.wsUrl);
    this.socket.onopen = () => {
      this.socket.send('{"action":"subscribe","channel":"matches","params":{"filter":{"_sports_group":"1"}}}');
    };
    this.socket.onmessage = (event: MessageEvent) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        this.processNewData(data);
      }
    };
  }

  processNewData(data: Match) {
    if (!data.id) {
      return;
    }
    this.processNewStats(data.stats);
    this.processNewSelections(data.primaryMarkets);
  }

  processNewStats(stats: Stats) {
    const changes = {};
    this.store
      .pipe(
        select(fromStats.selectStats, { id: stats.eventId }),
        take(1),
        filter(storedStats => !!storedStats)
      )
      .subscribe(storedStats => {
        if (storedStats.currentMinute !== stats.currentMinute) {
          changes['currentMinute'] = stats.currentMinute;
        }
        if (storedStats.score !== stats.score) {
          changes['score'] = stats.score;
        }
        if (!isEmpty(changes)) {
          this.store.dispatch(StatsActions.updateStats({ stats:
            {
              id: stats.eventId,
              changes
            }
          }));
        }
      });
  }

  processNewSelections(markets: Market[]): void {
    markets.forEach((market: Market) => {
      market.selections.forEach((selection: Selection) => {
        this.processNewSelection(selection);
      });
    });
  }

  processNewSelection(selection: Selection): void {
    const changes = {};
    this.store
      .pipe(
        select(fromSelections.selectSelection, { id: selection.id }),
        take(1),
        filter(storedSelection => !!storedSelection)
      )
      .subscribe(storedSelection => {
        if (storedSelection.rate.decimal !== selection.rate.decimal) {
          changes['rate'] = selection.rate;
        }
        if (!isEmpty(changes)) {
          this.store.dispatch(SelectionsActions.updateSelection({ selection:
            {
              id: selection.id,
              changes
            }
          }));
        }
      });
  }

  close() {
    this.socket.close();
  }

}
