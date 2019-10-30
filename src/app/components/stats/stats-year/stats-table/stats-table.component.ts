import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import * as Schemas from 'src/app/interfaces/stats.interface';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit, OnChanges {
  @Input() public title: string;
  @Input() private players: Schemas.PlayerStats[];
  @ViewChild(MatSort, {static: true}) private sort: MatSort;
  public dataSource: MatTableDataSource<Schemas.PlayerStats>;
  public displayedColumns: string[];

  constructor() { }

  ngOnInit() {
    this.displayedColumns = Schemas.PlayerStatsArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    const players: SimpleChange = changes.players;
    this.players = players.currentValue;
    this.dataSource = new MatTableDataSource(this.players);
    this.dataSource.sort = this.sort;
  }

}
