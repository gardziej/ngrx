import { createAction, props } from '@ngrx/store';
import { Selection } from 'src/app/interfaces/selection.interface';
import { Update } from '@ngrx/entity';

export const addSelections = createAction(
  '[Selection] Add Selection',
  (props<{ selections: Selection[] }>())
);

export const updateSelection = createAction(
  '[Selection] Update Selection',
  (props<{ selection: Update<Selection> }>())
);

export const clearChange = createAction(
  '[Selection] Clear Changes in Selection',
  (props<{ selection: Update<Selection> }>())
);
