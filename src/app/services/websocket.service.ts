import { Injectable } from '@angular/core';
import { StoreState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { take, filter, tap, map } from 'rxjs/operators';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Match } from '../interfaces/match.interface';
import { Stats } from '../interfaces/stats.interface';
import { Market } from '../interfaces/market.interface';
import { Selection } from '../interfaces/selection.interface';

import * as fromStats from '../store/reducers/stats.reducer';
import * as fromSelections from '../store/reducers/selection.reducer';
import * as fromMatches from '../store/reducers/match.reducer';

import * as StatsActions from '../store/actions/stats.actions';
import * as SelectionsActions from '../store/actions/selection.action';
import * as MatchActions from '../store/actions/match.actions';

import compare from '../helpers/compare';
import { MatchesService } from './matches.service';

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

@Injectable()
export class WebSocketService {

  private socket: WebSocketSubject<any>;
  private wsUrl = 'wss://ws.lvbet.pl/_v3/ws/update/?language=pl';

  constructor(
    private matchesService: MatchesService,
    private store: Store<StoreState>
    ) {
      this.socket = webSocket(this.wsUrl);
      this.socket.next({
        action: 'subscribe',
        channel: 'matches',
        params: {
          filter: {
            _sports_group: '1'
          }
        }
      });
      this.socket.subscribe(message => {
        this.processNewData(message);
      });
  }

  getNewMatch(match: Match) {
    if (match.id) {
      this.matchesService.getMatch(match.id);
    }
  }

  processNewData(data: Match) {
    if (!data.id) {
      return;
    }
    this.processNewDataMatch(data, ['isLive', 'isSuspended', 'isVisible', 'marketsCount']);
    this.processNewDataStats(data.stats, ['currentMinute', 'score']);
    this.processNewDataSelections(data.primaryMarkets, ['rate', 'isSuspended']);
  }

  processNewDataMatch(match: Match, props: string[]) {
    this.store
      .pipe(
        select(fromMatches.selectMatch, { id: match.id }),
        map(storedMatch => {
          if (!storedMatch) {
            this.getNewMatch(match);
          }
          return storedMatch;
        }),
        take(1),
        filter(storedMatch => !!storedMatch)
      )
      .subscribe(storedMatch => {
        const changes = this.createChanges(storedMatch, match, props);
        if (!isEmpty(changes)) {
          this.store.dispatch(MatchActions.updateMatch({ match:
            {
              id: match.id,
              changes
            }
          }));
        }
      });
  }

  processNewDataStats(stats: Stats, props: string[]) {
    this.store
      .pipe(
        select(fromStats.selectStats, { id: stats.eventId }),
        take(1),
        filter(storedStats => !!storedStats)
      )
      .subscribe(storedStats => {
        const changes = this.createChanges(storedStats, stats, props);
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

  processNewDataSelections(markets: Market[], props: string[]): void {
    markets.forEach((market: Market) => {
      market.selections.forEach((selection: Selection) => {
        this.processNewDataSelection(selection, props);
      });
    });
  }

  processNewDataSelection(selection: Selection, props: string[]): void {
    this.store
      .pipe(
        select(fromSelections.selectSelection, { id: selection.id }),
        take(1),
        filter(storedSelection => !!storedSelection)
      )
      .subscribe(storedSelection => {
        const changes = this.createChanges(storedSelection, selection, props);
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

  createChanges(storedData: any, newData: any, props: string[]): any {
    const changes = {};
    props.forEach(prop => {
      if (!compare(storedData[prop], newData[prop])) {
        changes[prop] = newData[prop];
      }
    });
    return changes;
  }

  close() {
    this.socket.complete();
  }

}
