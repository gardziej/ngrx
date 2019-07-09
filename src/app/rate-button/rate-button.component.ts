import { Component, OnInit, Input } from '@angular/core';

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
