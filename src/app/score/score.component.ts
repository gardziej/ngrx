import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  public score: string[];

  @Input() data: string = '0:0';

  ngOnInit() {
    this.score = this.data.split(':');
  }

}
