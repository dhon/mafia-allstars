import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatsService } from 'src/app/services/stats.service';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-stats-year',
  templateUrl: './stats-year.component.html',
  styleUrls: ['./stats-year.component.scss']
})
export class StatsYearComponent implements OnInit {
  public gameStats$: Observable<Schemas.GameStats>;
  public highPlayers$: Observable<Schemas.PlayerStats[]>;
  public lowPlayers$: Observable<Schemas.PlayerStats[]>;
  private readonly minimumGames = 20;

  constructor(private activatedRoute: ActivatedRoute, private statsService: StatsService) { }

  ngOnInit() {
    this.gameStats$ = this.activatedRoute.params.pipe(map(params => this.getGameStats(params.year)));
    this.highPlayers$ = this.activatedRoute.params.pipe(map(params => this.getPlayerStats(params.year, 'high')));
    this.lowPlayers$ = this.activatedRoute.params.pipe(map(params => this.getPlayerStats(params.year, 'low')));
  }

  private getGameStats(year: '2017' | '2018' | '2019' | 'all'): Schemas.GameStats {
    if (['2017', '2018', '2019', 'all'].includes(year)) {
      return this.statsService.getGameStats(year);
    }
  }

  private getPlayerStats(year: '2017' | '2018' | '2019' | 'all', amount: 'high' | 'low'): Schemas.PlayerStats[] {
    if (['2017', '2018', '2019', 'all'].includes(year)) {
      const playerStats = Array.from(this.statsService.getPlayerStats(year).values());
      if (amount === 'high') {
        return playerStats.filter(player => player.games >= this.minimumGames);
      } else if (amount === 'low') {
        return playerStats.filter(player => player.games < this.minimumGames);
      } else {
        console.log('Warning: Amount has an invalid value.');
      }
    } else {
      console.log('Warning: Year has an invalid value.');
    }
  }
}
