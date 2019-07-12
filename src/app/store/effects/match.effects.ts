import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MatchActions from '../actions/match.actions';
import * as StatsActions from '../actions/stats.actions';
import * as PrimaryMarketsActions from '../actions/primaryMarkets.actions';
import * as SelectionsActions from '../actions/selection.action';

import { MatchesService } from '../../services/matches.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Match } from '../../interfaces/match.interface';
import { Market } from 'src/app/interfaces/market.interface';
import { Selection } from 'src/app/interfaces/selection.interface';

@Injectable()
export class MatchEffects {

  addLiveMatches = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.getLiveMatches),
    switchMap(() => this.matchesService.getLiveMatches()),
    switchMap((matches: Match[]) => {

      const [primaryMarkets, selections]: [Market[], Selection[]] = matches.reduce((accumulator: [Market[], Selection[]], match: Match) => {
        accumulator[0].push(
          ...match.primaryMarkets.map(
            (market: Market) => (
              {
                id: market.id,
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
    })
  ));

  constructor(
    private actions$: Actions,
    private matchesService: MatchesService) {}
}
