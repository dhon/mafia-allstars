import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
