import { createAction, props } from '@ngrx/store';
import { Selection } from 'src/app/interfaces/selection.interface';

export const addSelections = createAction(
  '[Selection] Add Selection',
  (props<{ selections: Selection[] }>())
);

export const upsertSelections = createAction(
  '[Selection] Upsert Stats',
  (props<{ selections: Selection[] }>())
);
