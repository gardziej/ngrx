import { Rate } from './rate.interface';

export interface Selection {
  id: number;
  isSuspended: boolean;
  rate: Rate;
}
