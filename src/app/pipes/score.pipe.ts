import { Pipe, PipeTransform } from '@angular/core';
import { eParticipant } from '../enums/eparticipant.enum';

@Pipe({name: 'score'})
export class ScorePipe implements PipeTransform {
  transform(score: string, participant: eParticipant): number {
    if (!score) {
      return;
    }
    const side = participant === eParticipant.Home ? 0 : 1;
    return Number(score.split(':')[side]);
  }
}
