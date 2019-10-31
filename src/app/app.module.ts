import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PlayersComponent } from './components/players/players.component';
import { StatsComponent } from './components/stats/stats.component';
import { StatsYearComponent } from './components/stats/stats-year/stats-year.component';
import { GameStatsTableComponent } from './components/stats/stats-year/game-stats-table/game-stats-table.component';
import { PlayerStatsTableComponent } from './components/stats/stats-year/player-stats-table/player-stats-table.component';
import { GamesComponent } from './components/games/games.component';
import { StatsService } from './services/stats.service';
import { GamesDisplayComponent } from './components/games/games-display/games-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PlayersComponent,
    StatsComponent,
    StatsYearComponent,
    GameStatsTableComponent,
    PlayerStatsTableComponent,
    GamesComponent,
    GamesDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
