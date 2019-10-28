import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { StatsService } from 'src/app/services/stats.service';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) private sort: MatSort;
  public displayedColumns: string[] = Schemas.PlayerStatsArray;
  public dataSource = new MatTableDataSource(Array.from(this.statsService.playerStats.values()));

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
