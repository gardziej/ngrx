import { createAction, props } from '@ngrx/store';
import { Stats } from 'src/app/interfaces/stats.interface';

export const addStats = createAction(
  '[Stats] Add Stats',
  (props<{ stats: Stats[] }>())
);

export const upsertStats = createAction(
  '[Stats] Upsert Stats',
  (props<{ stats: Stats[] }>())
);
