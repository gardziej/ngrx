import { ActionReducerMap, MetaReducer, Action } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { matchesReducer } from './match.reducer';
import { Match } from '../../interfaces/match.interface';
import { EntityState } from '@ngrx/entity';
import { statsReducer } from './stats.reducer';
import { Stats } from 'src/app/interfaces/stats.interface';
import { primaryMarketsReducer } from './primaryMarkets.reducer';
import { Market } from 'src/app/interfaces/market.interface';
import { Selection } from 'src/app/interfaces/selection.interface';
import { selectionsReducer } from './selection.reducer';
import { InjectionToken } from '@angular/core';

export interface StoreState {
  matches: EntityState<Match>;
  stats: EntityState<Stats>;
  primaryMarkets: EntityState<Market>;
  selections: EntityState<Selection>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<StoreState, Action>
  >('Root reducers token', {
    factory: () => ({
    matches: matchesReducer,
    stats: statsReducer,
    primaryMarkets: primaryMarketsReducer,
    selections: selectionsReducer
    })
});

export const metaReducers: MetaReducer<StoreState>[] = !environment.production ? [] : [];
