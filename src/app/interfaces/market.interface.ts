import { Selection } from './selection.interface';

export interface Market {
  id: number;
  selections?: Selection[];
  selectionsIds: number[];
}
