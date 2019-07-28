import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as SelectionsActions from '../actions/selection.action';

import { MatchesService } from '../../services/matches.service';
import { switchMap, map, tap, delay } from 'rxjs/operators';
import { Match } from '../../interfaces/match.interface';

import { Selection } from 'src/app/interfaces/selection.interface';
import { Update } from '@ngrx/entity';

@Injectable()
export class SelectionEffects {

  clearChange = createEffect(() => this.actions$.pipe(
    ofType(SelectionsActions.updateSelection),
    delay(3000),
    switchMap(data => {
      const actionData: Update<Selection> = {
        id: +data.selection.id,
        changes: {}
      };
      if (data.selection.changes.isIncreased) {
        actionData.changes.isIncreased = false;
      }
      if (data.selection.changes.isDecreased) {
        actionData.changes.isDecreased = false;
      }
      return actionData.changes ? [SelectionsActions.clearChange({ selection: actionData })] : [];
    })
  ));

  constructor(
    private actions$: Actions) {}

}
