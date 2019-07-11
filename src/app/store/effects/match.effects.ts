import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MatchActions from '../actions/match.actions';
import { MatchesService } from '../../services/matches.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Match } from '../../interfaces/match.interface';

@Injectable()
export class MatchEffects {

  addLiveMatches = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.getLiveMatches),
    switchMap(() => this.matchesService.getLiveMatches().pipe(
      map((matches: Match[]) => MatchActions.addMatches({ payload: matches}))
    ))
  ));

  constructor(
    private actions$: Actions,
    private matchesService: MatchesService) {}
}
