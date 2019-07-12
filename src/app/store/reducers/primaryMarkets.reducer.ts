import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PrimaryMarketsActions from '../actions/primaryMarkets.actions';
import { Market } from 'src/app/interfaces/market.interface';

export interface State extends EntityState<Market> {
}

export const adapter: EntityAdapter<Market> = createEntityAdapter<Market>();

export const initialState: State = adapter.getInitialState();

export const primaryMarketsReducer = createReducer(
  initialState,
  on(PrimaryMarketsActions.addPrimaryMarkets, (state, { primaryMarkets }) => {
    return adapter.addMany(primaryMarkets, state);
  }),
  on(PrimaryMarketsActions.upsertPrimaryMarkets, (state, { primaryMarkets }) => {
    return adapter.upsertMany(primaryMarkets, state);
  })
);

export const getPrimaryMarketsState = createFeatureSelector<State>('primaryMarkets');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getPrimaryMarketsState);

export const selectSelectionsIds = createSelector(
  getPrimaryMarketsState,
  (state: State, props: { id: number }) => {
    return state.entities[props.id] ? state.entities[props.id].selectionsIds : 0;
  }
);
