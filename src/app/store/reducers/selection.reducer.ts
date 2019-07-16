import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SelectionsActions from '../actions/selection.action';
import { Selection } from 'src/app/interfaces/selection.interface';

export interface State extends EntityState<Selection> {
}

export const adapter: EntityAdapter<Selection> = createEntityAdapter<Selection>();

export const initialState: State = adapter.getInitialState();

export const selectionsReducer = createReducer(
  initialState,
  on(SelectionsActions.addSelections, (state, { selections }) => {
    return adapter.addMany(selections, state);
  }),
  on(SelectionsActions.updateSelection, (state, { selection }) => {
    return adapter.updateOne(selection, state);
  }),
  on(SelectionsActions.clearChange, (state, { selection }) => {
    return adapter.updateOne(selection, state);
  })
);

export const getSelectionsState = createFeatureSelector<State>('selections');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getSelectionsState);

export const selectSelection = createSelector(
  getSelectionsState,
  (state: State, props: { id: number }) => {
    return state.entities[props.id];
  }
);
