import { ActionReducerMap, MetaReducer } from '@ngrx/store';
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

export interface StoreState {
  matches: EntityState<Match>;
  stats: EntityState<Stats>;
  primaryMarkets: EntityState<Market>;
  selections: EntityState<Selection>;
}

export const reducers: ActionReducerMap<StoreState> = {
  matches: matchesReducer,
  stats: statsReducer,
  primaryMarkets: primaryMarketsReducer,
  selections: selectionsReducer
};

export const metaReducers: MetaReducer<StoreState>[] = !environment.production ? [] : [];
