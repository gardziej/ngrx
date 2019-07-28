import { Rate } from './rate.interface';

export interface Selection {
  id: number;
  rate: Rate;
  isSuspended?: boolean;
  isIncreased?: boolean;
  isDecreased?: boolean;
}
