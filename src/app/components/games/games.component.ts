import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public games2017: Schemas.MafiaGame[];
  public games2018: Schemas.MafiaGame[];
  public games2019: Schemas.MafiaGame[];

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.games2017 = this.statsService.getMafiaGames('2017');
    this.games2018 = this.statsService.getMafiaGames('2018');
    this.games2019 = this.statsService.getMafiaGames('2019');
  }
}
