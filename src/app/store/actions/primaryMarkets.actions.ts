import { createAction, props } from '@ngrx/store';
import { Market } from 'src/app/interfaces/market.interface';

export const addPrimaryMarkets = createAction(
  '[PrimaryMarkets] Add PrimaryMarkets',
  (props<{ primaryMarkets: Market[] }>())
);

export const upsertPrimaryMarkets = createAction(
  '[PrimaryMarkets] Upsert PrimaryMarkets',
  (props<{ primaryMarkets: Market[] }>())
);
