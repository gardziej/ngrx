import { Participants } from './participants.interface';

export interface Match {
  id: number;
  participants: Participants;
  sportsGroups: any;
}
