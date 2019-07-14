import { Selection } from './selection.interface';

export interface Market {
  id: number;
  isVisible: boolean;
  isSuspended: boolean;

  selections?: Selection[];

  selectionsIds: number[];
}
