import { Component, OnInit, Input } from '@angular/core';
import { Participants } from '../interfaces/participants.interface';

@Component({
  selector: 'participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  @Input() data: Participants;

  constructor() { }

  ngOnInit() {
  }

}
