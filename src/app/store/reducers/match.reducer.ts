import { Match } from '../../interfaces/match.interface';
import { createReducer, on, Action } from '@ngrx/store';
import * as MatchActions from '../actions/match.actions';
import * as WebSocketActions from '../actions/ws.actions';
import { Participants } from 'src/app/interfaces/participants.interface';
const initialState: Match[] = [];

const updateMatch = (state, action) => {
  return state.map((match: Match) => {
    if (match.id === action.payload.id) {
      const newMatch = { ...match, stats: action.payload.stats, primaryMarkets: action.payload.primaryMarkets };
      return newMatch;
    }
    return match;
  });
};

const reducer = createReducer(
  initialState,
  on(MatchActions.addMatches, (state, action) => ([ ...state, ...action.payload ])),
  on(WebSocketActions.recivedWebSocketMatchData, updateMatch)
);


export function matchesReducer(state, action: Action) {
  return reducer(state, action);
}
