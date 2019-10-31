import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatsService } from 'src/app/services/stats.service';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-games-display',
  templateUrl: './games-display.component.html',
  styleUrls: ['./games-display.component.scss']
})
export class GamesDisplayComponent implements OnInit {
  public gameData$: Observable<Schemas.MafiaGame>;

  constructor(private activatedRoute: ActivatedRoute, private statsService: StatsService) { }

  ngOnInit() {
    const year$ = this.activatedRoute.params.pipe(map(params => params.year));
    const game$ = this.activatedRoute.params.pipe(map(params => params.game));
    this.gameData$ = combineLatest(year$, game$)
      .pipe(map(([year, game]: ['2017' | '2018' | '2019' | 'all', string]) => {
        const gameNumber = Number(game) - 1;
        return this.statsService.getMafiaGames(year)[gameNumber];
      }));
  }
}
