import { Component, OnInit } from '@angular/core';
import * as one from 'src/assets/2019/01.json';
import * as Schemas from 'src/app/stats/stats.interface';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const hello: Schemas.MafiaGame = one;
    console.log(hello);
  }

}
