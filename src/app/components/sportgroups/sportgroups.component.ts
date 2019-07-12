import { Component, OnInit, Input } from '@angular/core';
import { SportsGroup } from 'src/app/interfaces/sportsGroup.interface';

@Component({
  selector: 'sportgroups',
  templateUrl: './sportgroups.component.html',
  styleUrls: ['./sportgroups.component.css']
})
export class SportgroupsComponent implements OnInit {

  @Input() data: SportsGroup[];

  ngOnInit() {
  }

}
