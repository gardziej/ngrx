import { Participants } from './participants.interface';
import { SportsGroup } from './sportsGroup.interface';
import { Market } from './market.interface';
import { Stats } from './stats.interface';

export interface Match {
  id: number;
  rank: number;
  participants: Participants;
  sportsGroups: SportsGroup;
  isLive: boolean;
  isVisible: boolean;
  isSuspended: boolean;
  marketsCount: number;

  primaryMarketsIds: number[];

  primaryMarkets?: Market[];
  stats?: Stats;
}
