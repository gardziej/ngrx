import { createAction, props } from '@ngrx/store';
import { Match } from 'src/app/interfaces/match.interface';

export const recivedWebSocketMatchData = createAction(
  '[WS] match data recived',
  (props<{ payload: Match }>())
);

export const recivedIrrelevantWebSocketMatchData = createAction(
  '[WS] irrelevant data recived'
);

