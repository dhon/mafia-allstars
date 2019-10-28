import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public lowPlayers: Schemas.PlayerStats[];
  public highPlayers: Schemas.PlayerStats[];
  private readonly minimumGames = 10;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.lowPlayers = Array.from(this.statsService.playerStats.values()).filter(player => player.games < this.minimumGames);
    this.highPlayers = Array.from(this.statsService.playerStats.values()).filter(player => player.games >= this.minimumGames);
  }

}
