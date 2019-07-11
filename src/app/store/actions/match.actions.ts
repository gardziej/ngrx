import { createAction, props } from '@ngrx/store';
import { Match } from '../../interfaces/match.interface';

export const addMatches = createAction(
  '[Match] Add Matches',
  (props<{ payload: Match[] }>())
);

export const getLiveMatches = createAction(
  '[Match] Get Live Matches'
);

export const updateMatch = createAction(
  '[Match] Update Match',
  props<{ payload: Match }>()
);
