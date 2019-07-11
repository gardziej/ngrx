import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { matchesReducer } from './match.reducer';
import { Match } from '../../interfaces/match.interface';

export interface State {
  matches: Match[];
}

export const reducers: ActionReducerMap<State> = {
  matches: matchesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
