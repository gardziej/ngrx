import { Rate } from './rate.interface';

export interface Selection {
  id: number;
  isSuspended: boolean;
  isIncreased: boolean;
  isDecreased: boolean;
  rate: Rate;
}
