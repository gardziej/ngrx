import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Match } from '../../interfaces/match.interface';
import * as MatchActions from '../actions/match.actions';

export interface State extends EntityState<Match> {
}

const sortByRank = (matchA: Match, matchB: Match) => {
  return matchB.rank - matchA.rank;
};

export const adapter: EntityAdapter<Match> = createEntityAdapter<Match>({
  sortComparer: sortByRank
});

export const initialState: State = adapter.getInitialState();

export const matchesReducer = createReducer(
  initialState,
  on(MatchActions.addMatches, (state, { matches }) => {
    return adapter.addMany(matches, state);
  })
);

export const getMatchState = createFeatureSelector<State>('matches');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getMatchState);
