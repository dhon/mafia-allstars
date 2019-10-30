import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-stats-year',
  templateUrl: './stats-year.component.html',
  styleUrls: ['./stats-year.component.scss']
})
export class StatsYearComponent implements OnInit {
  public lowPlayers: Schemas.PlayerStats[];
  public highPlayers: Schemas.PlayerStats[];
  private readonly minimumGames = 20;

  constructor(private statsService: StatsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const year = this.activatedRoute.snapshot.params.year;
    if (['2017', '2018', '2019', 'all'].includes(year)) {
      this.lowPlayers = Array.from(this.statsService.getPlayerStats(year).values()).filter(player => player.games < this.minimumGames);
      this.highPlayers = Array.from(this.statsService.getPlayerStats(year).values()).filter(player => player.games >= this.minimumGames);
    } else {
      console.log('Warning: Attempting to retrieve stats of invalid year.');
    }
  }

}
