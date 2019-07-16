import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../interfaces/match.interface';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StoreState } from '../store/reducers';

import * as MatchActions from '../store/actions/match.actions';
import * as StatsActions from '../store/actions/stats.actions';
import * as PrimaryMarketsActions from '../store/actions/primaryMarkets.actions';
import * as SelectionsActions from '../store/actions/selection.action';
import { Market } from '../interfaces/market.interface';
import { Selection } from '../interfaces/selection.interface';


@Injectable()
export class MatchesService {

  constructor(
    private store: Store<StoreState>,
    private http: HttpClient) {
  }

  getLiveMatches() {
    return this.http.get<Match[]>('https://app.lvbet.pl/_api/v1/offer/matches/?is_live=true').pipe(
      // map((matches: Match[]) => matches.filter((match: Match) => match.id === 7662303))
      // map((matches: Match[]) => matches.filter((match: Match) => match.sportsGroups[0].id === 5))
    );
  }

  getMatch(id: number) {
    this.http.get<Match>('https://app.lvbet.pl/_api/v1/offer/matches/' + id).pipe(
      take(1)
    ).subscribe((newMatch: Match) => {
      const actions = this.getNewMatchesActions([newMatch]);
      actions.forEach(action => {
        this.store.dispatch(action);
      });
    });
  }

  getNewMatchesActions(matches: Match[]) {
    const [primaryMarkets, selections]: [Market[], Selection[]] = matches.reduce((accumulator: [Market[], Selection[]], match: Match) => {
      accumulator[0].push(
        ...match.primaryMarkets.map(
          (market: Market) => (
            {
              id: market.id,
              isVisible: market.isVisible,
              isSuspended: market.isSuspended,
              selectionsIds: market.selections.map((selection: Selection) => {
                accumulator[1].push(selection);
                return selection.id;
              })
            })).concat()
        );
      return accumulator;
    }, [[], []]);

    return [
      MatchActions.addMatches({ matches: matches.map((match: Match) => ({
        id: match.id,
        rank: match.rank,
        isLive: match.isLive,
        isVisible: match.isVisible,
        isSuspended: match.isSuspended,
        marketsCount: match.marketsCount,
        participants: match.participants,
        sportsGroups: match.sportsGroups,
        primaryMarketsIds: match.primaryMarkets.map((market: Market) => market.id)
      })) }),

      StatsActions.addStats({ stats: matches.map((match: Match) => ({
        eventId: match.stats.eventId,
        currentMinute: match.stats.currentMinute,
        score: match.stats.score
      })) }),

      PrimaryMarketsActions.addPrimaryMarkets({ primaryMarkets }),

      SelectionsActions.addSelections({ selections })
    ];

  }

}
