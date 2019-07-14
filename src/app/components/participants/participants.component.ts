import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Participants } from '../../interfaces/participants.interface';

@Component({
  selector: 'participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantsComponent implements OnInit {

  @Input() data: Participants;

  constructor() { }

  ngOnInit() {
  }

}
