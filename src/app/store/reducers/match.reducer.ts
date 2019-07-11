import { Match } from '../../interfaces/match.interface';
import { createReducer, on } from '@ngrx/store';
import * as MatchActions from '../actions/match.actions';
const initialState: Match[] = [];

export const matchesReducer = createReducer(
  initialState,
  on(MatchActions.addMatches, (state, action) => ([ ...state, ...action.payload ]))
);

