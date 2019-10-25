import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    console.log('mafiaGames: ', this.statsService.mafiaGames);
    console.log('playerNames: ', this.statsService.playerNames);
    console.log('playerStats: ', this.statsService.playerStats);
  }

}
