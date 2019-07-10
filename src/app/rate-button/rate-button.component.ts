import { Component, OnInit, Input } from '@angular/core';

import { Selection } from '../interfaces/selection.interface';

@Component({
  selector: 'rate-button',
  templateUrl: './rate-button.component.html',
  styleUrls: ['./rate-button.component.css']
})
export class RateButtonComponent implements OnInit {

  @Input() data: Selection;

  constructor() { }

  ngOnInit() {
  }

}
