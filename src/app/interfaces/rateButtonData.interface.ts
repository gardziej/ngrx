import { Selection } from './selection.interface';

export interface RateButtonData {
  selection: Selection;
  isSuspended?: boolean;
  isIncreased?: boolean;
  isDecreased?: boolean;
}