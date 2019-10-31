import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayersComponent } from './components/players/players.component';
import { StatsComponent } from './components/stats/stats.component';
import { StatsYearComponent } from './components/stats/stats-year/stats-year.component';
import { GamesComponent } from './components/games/games.component';
import { GamesDisplayComponent } from './components/games/games-display/games-display.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'players',
    component: PlayersComponent,
    pathMatch: 'full'
  },
  {
    path: 'stats',
    component: StatsComponent,
    pathMatch: 'full',
  },
  {
    path: 'stats/:year',
    component: StatsYearComponent,
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GamesComponent,
    pathMatch: 'full',
  },
  {
    path: 'games/:year/:game',
    component: GamesDisplayComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
