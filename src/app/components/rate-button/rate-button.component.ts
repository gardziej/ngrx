import { Component, OnInit, Input } from '@angular/core';
import { RateButtonData } from 'src/app/interfaces/rateButtonData.interface';

@Component({
  selector: 'rate-button',
  templateUrl: './rate-button.component.html',
  styleUrls: ['./rate-button.component.css']
})
export class RateButtonComponent implements OnInit {

  @Input() data: RateButtonData;

  constructor() { }

  ngOnInit() {
  }

}
