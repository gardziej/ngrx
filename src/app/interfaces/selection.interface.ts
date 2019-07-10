import { Rate } from './rate.interface';

export interface Selection {
  rate: Rate;
  isSuspended: boolean;
  isIncreased: boolean;
  isDecreased: boolean;
}
