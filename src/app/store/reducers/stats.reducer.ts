import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';

import { Stats } from 'src/app/interfaces/stats.interface';
import * as StatsActions from '../actions/stats.actions';

export interface State extends EntityState<Stats> {
}

export const adapter: EntityAdapter<Stats> = createEntityAdapter<Stats>({
  selectId: (stats: Stats) => stats.eventId
});

export const initialState: State = adapter.getInitialState();

export const statsReducer = createReducer(
  initialState,
  on(StatsActions.addStats, (state, { stats }) => {
    return adapter.addMany(stats, state);
  }),
  on(StatsActions.updateStats, (state, { stats }) => {
    return adapter.updateOne(stats, state);
  })
);

export const getStatsState = createFeatureSelector<State>('stats');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getStatsState);

export const selectStats = createSelector(
  getStatsState,
  (state: State, props: { id: number }) => {
    return state.entities[props.id] ? state.entities[props.id] : null;
  }
);

export const selectScore = createSelector(
  getStatsState,
  (state: State, props: { id: number }) => {
    return state.entities[props.id] ? state.entities[props.id].score : null;
  }
);

export const selectCurrentMinute = createSelector(
  getStatsState,
  (state: State, props: { id: number }) => {
    return state.entities[props.id] ? state.entities[props.id].currentMinute : 0;
  }
);
