import { createAction, props } from '@ngrx/store';
import { Stats } from 'src/app/interfaces/stats.interface';
import { Update } from '@ngrx/entity';

export const addStats = createAction(
  '[Stats] Add Stats',
  (props<{ stats: Stats[] }>())
);

export const updateStats = createAction(
  '[Stats] Update Stats',
  (props<{ stats: Update<Stats> }>())
);
