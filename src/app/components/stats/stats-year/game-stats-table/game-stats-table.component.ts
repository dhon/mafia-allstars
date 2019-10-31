import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input } from '@angular/core';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-game-stats-table',
  templateUrl: './game-stats-table.component.html',
  styleUrls: ['./game-stats-table.component.scss']
})
export class GameStatsTableComponent implements OnInit, OnChanges {
  @Input() public gameStats: Schemas.GameStats;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const gameStats: SimpleChange = changes.gameStats;
    this.gameStats = gameStats.currentValue;
  }
}
