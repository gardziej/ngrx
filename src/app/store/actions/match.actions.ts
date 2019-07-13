import { createAction, props } from '@ngrx/store';
import { Match } from '../../interfaces/match.interface';
import { Update } from '@ngrx/entity';

export const addMatches = createAction(
  '[Match] Add Matches',
  (props<{ matches: Match[] }>())
);

export const getLiveMatches = createAction(
  '[Match] Get Live Matches'
);

export const updateMatch = createAction(
  '[Match] Update Match',
  props<{ match: Update<Match> }>()
);
