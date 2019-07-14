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
      return this.matchesService.getNewMatchesActions(matches);
    })
  ));

  constructor(
    private actions$: Actions,
    private matchesService: MatchesService) {}

}
